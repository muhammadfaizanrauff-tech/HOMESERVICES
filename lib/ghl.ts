import type { Lead } from "./schema";

// ── GHL Webhook (simple, always available) ─────────────────────────────────

export type LeadPayload = {
  source: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  industry?: string;
  currentSoftware?: string;
  techCount?: string;
  notes?: string;
  painPoints?: string;
  planId?: string;
};

export async function sendLeadToGHL(payload: LeadPayload): Promise<void> {
  const webhookUrl = process.env.GHL_LEAD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("GHL_LEAD_WEBHOOK_URL not set — skipping webhook");
    return;
  }
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    console.error("GHL webhook error:", res.status, await res.text());
  }
}

// ── GHL API v2 client (requires GHL_API_KEY + GHL_LOCATION_ID) ─────────────

const GHL_BASE  = "https://services.leadconnectorhq.com";
const GHL_VER   = "2021-07-28";

function ghlHeaders() {
  return {
    Authorization: `Bearer ${process.env.GHL_API_KEY}`,
    "Content-Type": "application/json",
    Version: GHL_VER,
  };
}

// Map Lead fields → GHL custom field keys (set via env or fallback to key name)
const FIELD_MAP: Record<keyof Partial<Lead>, string> = {
  trade:                process.env.GHL_FIELD_TRADE            ?? "trade",
  fsmPlatform:          process.env.GHL_FIELD_FSM_PLATFORM     ?? "fsm_platform",
  techCount:            process.env.GHL_FIELD_TECH_COUNT        ?? "tech_count",
  platformDepth:        process.env.GHL_FIELD_PLATFORM_DEPTH    ?? "platform_depth",
  primaryPain:          process.env.GHL_FIELD_PRIMARY_PAIN      ?? "primary_pain",
  avgJobTicket:         process.env.GHL_FIELD_AVG_JOB_TICKET    ?? "avg_job_ticket",
  salesTrack:           process.env.GHL_FIELD_SALES_TRACK       ?? "sales_track",
  recommendedTier:      process.env.GHL_FIELD_REC_TIER          ?? "recommended_tier",
  leadScore:            process.env.GHL_FIELD_LEAD_SCORE        ?? "lead_score",
  leadTemperature:      process.env.GHL_FIELD_LEAD_TEMP         ?? "lead_temperature",
  pitchAngle:           process.env.GHL_FIELD_PITCH_ANGLE       ?? "pitch_angle",
  source:               process.env.GHL_FIELD_SOURCE            ?? "lead_source",
  utmSource:            process.env.GHL_FIELD_UTM_SOURCE        ?? "utm_source",
  utmMedium:            process.env.GHL_FIELD_UTM_MEDIUM        ?? "utm_medium",
  utmCampaign:          process.env.GHL_FIELD_UTM_CAMPAIGN      ?? "utm_campaign",
  disqualifyReason:     process.env.GHL_FIELD_DISQUALIFY_REASON ?? "disqualify_reason",
  needsHumanQualification: process.env.GHL_FIELD_NEEDS_HUMAN   ?? "needs_human_qual",
} as Record<string, string>;

// GHL pipeline stage IDs — set via env vars after creating the acquisition pipeline
const PIPELINE_STAGES: Record<string, string> = {
  A_full_build: process.env.GHL_STAGE_TRACK_A       ?? "",
  B_integrate:  process.env.GHL_STAGE_TRACK_B_INT   ?? "",
  B_migrate:    process.env.GHL_STAGE_TRACK_B_MIG   ?? "",
  disqualify:   process.env.GHL_STAGE_DISQUALIFIED  ?? "",
};

function buildCustomFields(lead: Partial<Lead>): Record<string, string> {
  const fields: Record<string, string> = {};
  for (const [key, ghlKey] of Object.entries(FIELD_MAP)) {
    const val = (lead as Record<string, unknown>)[key];
    if (val !== undefined && val !== null) {
      fields[ghlKey] = Array.isArray(val) ? val.join(",") : String(val);
    }
  }
  return fields;
}

function buildTags(lead: Partial<Lead>): string[] {
  const tags: string[] = [];
  if (lead.salesTrack) tags.push(`track:${lead.salesTrack.replace("_", "-").toLowerCase()}`);
  if (lead.fsmPlatform) tags.push(`fsm:${lead.fsmPlatform}`);
  if (lead.trade) tags.push(`trade:${lead.trade}`);
  if (lead.leadTemperature) tags.push(`temp:${lead.leadTemperature}`);
  if (lead.recommendedTier) tags.push(`tier:${lead.recommendedTier}`);
  if (lead.source) tags.push(`source:${lead.source}`);
  for (const pain of lead.primaryPain ?? []) tags.push(`pain:${pain}`);
  if (lead.needsHumanQualification) tags.push("needs-human-qual");
  return tags;
}

async function findContactByEmail(email: string): Promise<string | null> {
  const locationId = process.env.GHL_LOCATION_ID;
  if (!locationId) return null;
  const res = await fetch(
    `${GHL_BASE}/contacts/search?locationId=${locationId}&email=${encodeURIComponent(email)}`,
    { headers: ghlHeaders() },
  );
  if (!res.ok) return null;
  const data = (await res.json()) as { contacts?: { id: string }[] };
  return data.contacts?.[0]?.id ?? null;
}

async function createContact(lead: Partial<Lead>): Promise<string | null> {
  const locationId = process.env.GHL_LOCATION_ID;
  if (!locationId) return null;

  const [firstName, ...rest] = (lead.fullName ?? "").split(" ");
  const lastName = rest.join(" ") || undefined;
  const pipelineId   = process.env.GHL_PIPELINE_ID ?? undefined;
  const stageId      = lead.salesTrack ? PIPELINE_STAGES[lead.salesTrack] : undefined;

  const body: Record<string, unknown> = {
    locationId,
    email: lead.email,
    phone: lead.phone,
    firstName: firstName || lead.email?.split("@")[0] || "Unknown",
    lastName,
    name: lead.fullName,
    companyName: lead.businessName,
    customField: Object.entries(buildCustomFields(lead)).map(([key, value]) => ({
      key,
      field_value: value,
    })),
    tags: buildTags(lead),
  };

  if (pipelineId && stageId) {
    body.opportunityInfo = { pipelineId, stageId };
  }

  const res = await fetch(`${GHL_BASE}/contacts/`, {
    method: "POST",
    headers: ghlHeaders(),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    console.error("GHL create contact error:", res.status, await res.text());
    return null;
  }
  const data = (await res.json()) as { contact?: { id: string } };
  return data.contact?.id ?? null;
}

async function updateContact(
  contactId: string,
  lead: Partial<Lead>,
): Promise<void> {
  const body = {
    customField: Object.entries(buildCustomFields(lead)).map(([key, value]) => ({
      key,
      field_value: value,
    })),
    tags: buildTags(lead),
  };
  const res = await fetch(`${GHL_BASE}/contacts/${contactId}`, {
    method: "PUT",
    headers: ghlHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    console.error("GHL update contact error:", res.status, await res.text());
  }
}

// ── Public upsert function ─────────────────────────────────────────────────

export async function upsertLeadToGHL(
  lead: Partial<Lead>,
): Promise<{ ghlContactId: string | null; syncStatus: "synced" | "failed" }> {
  const apiKey     = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  // Fallback: if no API creds, use the simple webhook
  if (!apiKey || !locationId) {
    await sendLeadToGHL({
      source: lead.source ?? "direct",
      name: lead.fullName ?? "",
      businessName: lead.businessName ?? "",
      email: lead.email ?? "",
      phone: lead.phone ?? "",
      industry: lead.trade,
      currentSoftware: lead.fsmPlatform,
      techCount: lead.techCount,
      notes: lead.painNotes,
      painPoints: (lead.primaryPain ?? []).join(", "),
    }).catch(() => {});
    return { ghlContactId: null, syncStatus: "synced" };
  }

  try {
    // Upsert: find existing or create new
    let contactId = lead.email
      ? await findContactByEmail(lead.email)
      : null;

    if (contactId) {
      await updateContact(contactId, lead);
    } else {
      contactId = await createContact(lead);
    }

    return { ghlContactId: contactId, syncStatus: "synced" };
  } catch (err) {
    console.error("GHL upsert failed:", err);
    return { ghlContactId: null, syncStatus: "failed" };
  }
}
