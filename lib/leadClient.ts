"use client";

// Client-side lead handling for static export (GitHub Pages has no server).
// Replaces the old /api/lead + /api/lead/score route handlers: qualification
// and scoring run in the browser, and the result is posted straight to the
// GHL webhook instead of through a private API-key upsert.

import type { Lead, LeadInput } from "./schema";
import { qualify, recommendTier, buildPitchAngle } from "./qualification";
import { scoreLead, temperature } from "./scoring";

export type LeadWebhookPayload = {
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
};

async function postToWebhook(url: string | undefined, envVarName: string, payload: LeadWebhookPayload): Promise<void> {
  if (!url) {
    console.warn(`${envVarName} not set — skipping webhook`);
    return;
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) console.error("GHL webhook error:", res.status, await res.text());
  } catch (e) {
    console.error("GHL webhook error:", e);
  }
}

// Contact form + demo request form share this webhook.
export async function postContactLeadToGHL(payload: LeadWebhookPayload): Promise<void> {
  return postToWebhook(
    process.env.NEXT_PUBLIC_GHL_CONTACT_WEBHOOK_URL,
    "NEXT_PUBLIC_GHL_CONTACT_WEBHOOK_URL",
    payload,
  );
}

// Qualifier flow (app/qualify) uses its own dedicated webhook.
export async function postQualifierLeadToGHL(payload: LeadWebhookPayload): Promise<void> {
  return postToWebhook(
    process.env.NEXT_PUBLIC_GHL_QUALIFY_WEBHOOK_URL,
    "NEXT_PUBLIC_GHL_QUALIFY_WEBHOOK_URL",
    payload,
  );
}

type FitInput = {
  fsmPlatform: string;
  techCount: string;
  platformDepth?: string;
  primaryPain: string[];
};

export function scoreFit(input: FitInput) {
  const qualInput = {
    fsmPlatform: input.fsmPlatform,
    techCount: input.techCount,
    platformDepth: input.platformDepth,
    wantsToReplaceServiceTitan: undefined,
    timelineToStart: undefined,
    primaryPain: input.primaryPain,
  } as Parameters<typeof qualify>[0];

  const { salesTrack, disqualifyReason, needsHumanQualification } = qualify(qualInput);
  const provisionalScore = scoreLead({ ...input, salesTrack } as Partial<Lead>);
  const leadTemperature = temperature(provisionalScore, salesTrack);
  const recommendedTier = recommendTier(
    input.techCount as LeadInput["techCount"],
    input.primaryPain.length,
  );
  const pitchAngle = buildPitchAngle(salesTrack, input.fsmPlatform, input.primaryPain);

  return {
    provisionalScore,
    salesTrack,
    leadTemperature,
    recommendedTier,
    pitchAngle,
    disqualifyReason,
    needsHumanQualification: !!needsHumanQualification,
  };
}

export type QualifierSubmission = {
  fullName: string;
  email: string;
  phone?: string;
  businessName: string;
  website?: string;
  city?: string;
  state?: string;
  trade?: string;
  fsmPlatform: string;
  techCount: string;
  platformDepth?: string;
  primaryPain: string[];
  painNotes?: string;
  avgJobTicket?: number;
  timelineToStart?: string;
  source?: string;
};

export async function submitQualifierLead(input: QualifierSubmission) {
  const { salesTrack, leadTemperature, recommendedTier, pitchAngle, needsHumanQualification } =
    scoreFit(input);

  const leadId = crypto.randomUUID();

  await postQualifierLeadToGHL({
    source: input.source ?? "direct",
    name: input.fullName,
    businessName: input.businessName,
    email: input.email,
    phone: input.phone ?? "",
    industry: input.trade,
    currentSoftware: input.fsmPlatform,
    techCount: input.techCount,
    notes: input.painNotes,
    painPoints: (input.primaryPain ?? []).join(", "),
  });

  const calUrl = process.env.NEXT_PUBLIC_GHL_CALENDAR_URL;
  const bookingUrl =
    (leadTemperature === "hot" || leadTemperature === "warm") && calUrl ? calUrl : undefined;

  return {
    leadId,
    salesTrack,
    leadTemperature,
    recommendedTier,
    pitchAngle,
    bookingUrl,
    needsHumanQualification,
  };
}
