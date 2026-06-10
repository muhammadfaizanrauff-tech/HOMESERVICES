import type { Lead } from "./schema";

export function scoreLead(l: Partial<Lead>): number {
  let s = 0;

  // +1  has a website
  if (l.website) s += 1;

  // +1  under 30 Google reviews
  if (typeof l.googleReviewCount === "number" && l.googleReviewCount < 30) s += 1;

  // +1  no review in 6+ months
  if (l.lastReviewDate && monthsSince(l.lastReviewDate) >= 6) s += 1;

  // +1  low Google rating (≤ 3.5)
  if (typeof l.googleRating === "number" && l.googleRating <= 3.5) s += 1;

  // +2  confirmed Jobber or HouseCall Pro
  if (l.fsmPlatform === "jobber" || l.fsmPlatform === "housecall_pro") s += 2;

  // +2  confirmed ServiceTitan
  if (l.fsmPlatform === "servicetitan") s += 2;

  // +1  warm channel (referral / partnership ≈ Angi/HomeAdvisor warm)
  if (l.source === "referral" || l.source === "partnership") s += 1;

  // +1  SMB crew size (1–15 employees → 1-2 / 3-4 / 5-10 bands)
  if (
    l.techCount === "1-2" ||
    l.techCount === "3-4" ||
    l.techCount === "5-10"
  ) s += 1;

  // +1  owner name visible (proxy: fullName provided)
  if (l.fullName) s += 1;

  return s;
}

export function temperature(
  score: number,
  track: Lead["salesTrack"],
): Lead["leadTemperature"] {
  // Hard rule: disqualify → skip regardless of score
  if (track === "disqualify") return "skip";

  // Floor: confirmed integrate lead (ST or large Jobber/HCP) → at least warm
  if (
    (track === "B_integrate") &&
    score < 4
  ) return "warm";

  if (score >= 7) return "hot";
  if (score >= 4) return "warm";
  if (score >= 2) return "cold";
  return "skip";
}

function monthsSince(iso: string): number {
  const d = new Date(iso);
  const now = new Date();
  return (
    (now.getFullYear() - d.getFullYear()) * 12 +
    (now.getMonth() - d.getMonth())
  );
}
