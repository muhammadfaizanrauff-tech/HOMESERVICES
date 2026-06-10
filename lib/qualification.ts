import type { LeadInput } from "./schema";

type QualInput = Pick<
  LeadInput,
  "fsmPlatform" | "techCount" | "platformDepth" | "wantsToReplaceServiceTitan" |
  "timelineToStart" | "primaryPain"
>;

type QualResult = {
  salesTrack: "A_full_build" | "B_integrate" | "B_migrate" | "disqualify";
  disqualifyReason?: string;
  needsHumanQualification?: boolean;
};

export function qualify(i: QualInput): QualResult {
  // Rule 1: ServiceTitan + wants-to-replace → disqualify
  if (i.fsmPlatform === "servicetitan" && i.wantsToReplaceServiceTitan)
    return { salesTrack: "disqualify", disqualifyReason: "st_replace_not_supported" };

  // Rule 2: ServiceTitan → always integrate
  if (i.fsmPlatform === "servicetitan")
    return { salesTrack: "B_integrate" };

  const small = i.techCount === "1-2" || i.techCount === "3-4";
  const light = i.platformDepth === "none" || i.platformDepth === "light";
  const deep  = i.platformDepth === "deep";
  const large = i.techCount === "5-10" || i.techCount === "11-20" || i.techCount === "20+";

  // Rules 3–4: Jobber / HouseCall Pro
  if (i.fsmPlatform === "jobber" || i.fsmPlatform === "housecall_pro") {
    if (small && light) return { salesTrack: "B_migrate" };
    if (!small || deep) return { salesTrack: "B_integrate" };
    if (large) return { salesTrack: "B_integrate" };
    // Ambiguous (e.g. 3-4 techs, moderate depth) → qualify on call
    return { salesTrack: "B_integrate", needsHumanQualification: true };
  }

  // Rule 5: Chiirp → migrate (GHL replaces Chiirp naturally)
  if (i.fsmPlatform === "chiirp") return { salesTrack: "B_migrate" };

  // Rule 6: No platform → full build
  if (i.fsmPlatform === "none") return { salesTrack: "A_full_build" };

  // Rule 8: Low intent → disqualify
  if (i.timelineToStart === "exploring" && (!i.primaryPain || i.primaryPain.length === 0))
    return { salesTrack: "disqualify", disqualifyReason: "low_intent" };

  // Fallback: other_fsm → integrate with human qual flag
  return { salesTrack: "B_integrate", needsHumanQualification: true };
}

export function recommendTier(
  techCount: LeadInput["techCount"],
  painCount: number,
): "core" | "growth" | "premium" {
  const large = techCount === "11-20" || techCount === "20+";
  const mid   = techCount === "5-10";
  if (large || painCount >= 4) return "premium";
  if (mid   || painCount >= 2) return "growth";
  return "core";
}

export function buildPitchAngle(
  salesTrack: string,
  fsmPlatform: string,
  primaryPain: string[],
): string {
  const fsmLabel: Record<string, string> = {
    servicetitan: "ServiceTitan",
    jobber: "Jobber",
    housecall_pro: "HouseCall Pro",
    chiirp: "Chiirp",
    none: "no existing platform",
    other_fsm: "your current platform",
  };
  const painLabel: Record<string, string> = {
    missed_calls: "missed calls",
    quotes_going_cold: "cold quotes",
    slow_lead_followup: "slow follow-up",
    no_reviews: "missing reviews",
    customers_going_quiet: "quiet customers",
    no_after_hours: "after-hours gaps",
    reputation: "reputation",
    disorganized: "disorganization",
    other: "operational gaps",
  };

  const fsm  = fsmLabel[fsmPlatform] ?? fsmPlatform;
  const pain = primaryPain.slice(0, 2).map((p) => painLabel[p] ?? p).join(" + ");

  if (salesTrack === "A_full_build")
    return `Full GHL build — capture every lead, ${pain || "grow revenue"}`;
  if (salesTrack === "B_migrate")
    return `${fsm} replace → AI follow-up for ${pain || "lead capture"}`;
  if (salesTrack === "B_integrate")
    return `${fsm} + AI layer — automate ${pain || "follow-up"}, zero disruption`;
  return "Exploratory — needs human qualification";
}
