import { z } from "zod";

// ── Enumerations (single source of truth) ──────────────────────────────────

export const Trade = z.enum([
  "hvac", "plumbing", "electrical", "roofing",
  "landscaping", "pest_control", "other",
]);

export const FsmPlatform = z.enum([
  "servicetitan", "jobber", "housecall_pro",
  "chiirp", "other_fsm", "none",
]);

export const TechBand = z.enum(["1-2", "3-4", "5-10", "11-20", "20+"]);

export const PlatformDepth = z.enum(["none", "light", "moderate", "deep"]);

export const PainPoint = z.enum([
  "missed_calls", "slow_lead_followup", "quotes_going_cold", "no_reviews",
  "reputation", "customers_going_quiet", "no_after_hours", "disorganized", "other",
]);

export const Timeline = z.enum(["now", "this_month", "this_quarter", "exploring"]);

export const SalesTrack = z.enum([
  "A_full_build", "B_integrate", "B_migrate", "disqualify",
]);

export const Tier = z.enum(["core", "growth", "premium"]);

export const Temperature = z.enum(["hot", "warm", "cold", "skip"]);

export const LeadSource = z.enum([
  "cold_email", "linkedin", "facebook_group", "short_form_video", "youtube",
  "partnership", "referral", "paid_fb", "paid_ig", "google_organic", "direct", "other",
]);

// ── Lead input schema (what the client may submit) ─────────────────────────

export const LeadInputSchema = z.object({
  // identity / contact
  fullName: z.string().min(1).optional(),
  email: z.string().email().transform((s) => s.toLowerCase().trim()).optional(),
  phone: z.string().optional(),
  businessName: z.string().optional(),
  website: z.string().url().optional(),
  city: z.string().optional(),
  state: z.string().optional(),

  // firmographics
  trade: Trade.optional(),
  fsmPlatform: FsmPlatform,
  techCount: TechBand,
  platformDepth: PlatformDepth.optional(),
  tenureMonths: z.number().int().nonnegative().optional(),

  // pain / intent
  primaryPain: z.array(PainPoint).default([]),
  painNotes: z.string().max(2000).optional(),
  avgJobTicket: z.number().positive().max(1_000_000).optional(),
  monthlyLeadVolume: z.number().int().positive().optional(),
  timelineToStart: Timeline.optional(),
  wantsToReplaceServiceTitan: z.boolean().optional(),

  // attribution
  source: LeadSource.default("direct"),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmContent: z.string().optional(),
  utmTerm: z.string().optional(),
  referrerUrl: z.string().optional(),
  landingPath: z.string().optional(),
  entryTrade: Trade.optional(),
  entryPlatform: FsmPlatform.optional(),
  gclid: z.string().optional(),
  fbclid: z.string().optional(),
  sessionId: z.string().optional(),

  // consent (TCPA/CAN-SPAM)
  consentSms: z.boolean().default(false),
  consentEmail: z.boolean().default(false),
  consentText: z.string().optional(),
});

export type LeadInput = z.infer<typeof LeadInputSchema>;

// ── Server-derived fields ──────────────────────────────────────────────────

export interface LeadDerived {
  salesTrack: z.infer<typeof SalesTrack>;
  recommendedTier: z.infer<typeof Tier>;
  leadScore: number;
  leadTemperature: z.infer<typeof Temperature>;
  disqualifyReason?: string | null;
  pitchAngle: string;
  needsHumanQualification?: boolean;
}

// ── Full Lead entity ───────────────────────────────────────────────────────

export interface Lead extends LeadInput, LeadDerived {
  id: string;
  createdAt: string;
  updatedAt: string;

  // enrichment (async, post-submit)
  enrichedCompanySize?: number;
  googleReviewCount?: number;
  googleRating?: number;
  lastReviewDate?: string;
  detectedFsmFromWeb?: z.infer<typeof FsmPlatform>;
  emailDeliverable?: boolean;

  // CRM sync state
  ghlContactId?: string | null;
  ghlPipelineStage?: string;
  ghlTags?: string[];
  syncStatus: "pending" | "synced" | "failed";
  syncError?: string | null;
  lastSyncedAt?: string | null;
}
