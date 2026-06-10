import { NextRequest, NextResponse } from "next/server";
import { LeadInputSchema } from "@/lib/schema";
import { qualify, recommendTier, buildPitchAngle } from "@/lib/qualification";
import { scoreLead, temperature } from "@/lib/scoring";
import type { Lead } from "@/lib/schema";

// Stateless score preview — no persistence, no GHL push.
// Used by the qualifier UI for the live "provisional fit" message.

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = LeadInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.issues },
        { status: 400 },
      );
    }
    const input = parsed.data;

    const { salesTrack, disqualifyReason, needsHumanQualification } = qualify({
      fsmPlatform: input.fsmPlatform,
      techCount: input.techCount,
      platformDepth: input.platformDepth,
      wantsToReplaceServiceTitan: input.wantsToReplaceServiceTitan,
      timelineToStart: input.timelineToStart,
      primaryPain: input.primaryPain,
    });

    const provisionalScore = scoreLead({ ...input, salesTrack } as Partial<Lead>);
    const leadTemperature  = temperature(provisionalScore, salesTrack);
    const recommendedTierValue = recommendTier(input.techCount, input.primaryPain.length);
    const pitchAngle = buildPitchAngle(salesTrack, input.fsmPlatform, input.primaryPain);

    return NextResponse.json({
      provisionalScore,
      salesTrack,
      leadTemperature,
      recommendedTier: recommendedTierValue,
      pitchAngle,
      disqualifyReason,
      needsHumanQualification: !!needsHumanQualification,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
