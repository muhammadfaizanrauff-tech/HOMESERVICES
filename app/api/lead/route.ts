import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { LeadInputSchema } from "@/lib/schema";
import { qualify, recommendTier, buildPitchAngle } from "@/lib/qualification";
import { scoreLead, temperature } from "@/lib/scoring";
import { upsertLeadToGHL } from "@/lib/ghl";
import { saveLead, getLeadByEmail, getLeadByPhone } from "@/lib/storage";
import type { Lead } from "@/lib/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // ── 1. Validate ────────────────────────────────────────────────────────
    const parsed = LeadInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.issues },
        { status: 400 },
      );
    }
    const input = parsed.data;

    // ── 2. Dedupe by email / phone ─────────────────────────────────────────
    let existing: Lead | null = null;
    if (input.email) existing = await getLeadByEmail(input.email).catch(() => null);
    if (!existing && input.phone)
      existing = await getLeadByPhone(input.phone).catch(() => null);

    const id = existing?.id ?? randomUUID();
    const now = new Date().toISOString();

    // ── 3. Qualify ─────────────────────────────────────────────────────────
    const { salesTrack, disqualifyReason, needsHumanQualification } = qualify({
      fsmPlatform: input.fsmPlatform,
      techCount: input.techCount,
      platformDepth: input.platformDepth,
      wantsToReplaceServiceTitan: input.wantsToReplaceServiceTitan,
      timelineToStart: input.timelineToStart,
      primaryPain: input.primaryPain,
    });

    // ── 4. Provisional score (without enrichment data) ────────────────────
    const provisionalScore = scoreLead({
      ...input,
      salesTrack,
    } as Partial<Lead>);

    const leadTemperature = temperature(provisionalScore, salesTrack);
    const recommendedTier = recommendTier(input.techCount, input.primaryPain.length);
    const pitchAngle = buildPitchAngle(salesTrack, input.fsmPlatform, input.primaryPain);

    // ── 5. Build full Lead record ──────────────────────────────────────────
    const lead: Lead = {
      ...(existing ?? {}),
      ...input,
      id,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
      salesTrack,
      recommendedTier,
      leadScore: provisionalScore,
      leadTemperature,
      disqualifyReason: disqualifyReason ?? null,
      pitchAngle,
      needsHumanQualification,
      syncStatus: "pending",
    };

    // ── 6. Persist ─────────────────────────────────────────────────────────
    await saveLead(lead).catch((e) =>
      console.error("Storage error (non-fatal):", e),
    );

    // ── 7. Push to GHL ─────────────────────────────────────────────────────
    const { ghlContactId, syncStatus } = await upsertLeadToGHL(lead).catch(() => ({
      ghlContactId: null,
      syncStatus: "failed" as const,
    }));

    if (ghlContactId) {
      await saveLead({ ...lead, ghlContactId, syncStatus, lastSyncedAt: now }).catch(() => {});
    }

    // ── 8. Build booking URL (HOT/WARM) ────────────────────────────────────
    const calUrl = process.env.NEXT_PUBLIC_GHL_CALENDAR_URL;
    const bookingUrl =
      (leadTemperature === "hot" || leadTemperature === "warm") && calUrl
        ? calUrl
        : undefined;

    // ── 9. Return branching info to client ────────────────────────────────
    return NextResponse.json(
      {
        leadId: id,
        salesTrack,
        leadTemperature,
        recommendedTier,
        pitchAngle,
        bookingUrl,
        needsHumanQualification: !!needsHumanQualification,
      },
      { status: 202 },
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    console.error("[/api/lead]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
