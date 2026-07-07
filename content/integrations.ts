export type IntegrationCategory = "FSM" | "Roofing" | "Leads" | "Ops";
export type IntegrationTier = "one-click" | "standard" | "custom";

export type Integration = {
  slug: string;
  name: string;
  category: IntegrationCategory;
  tier: IntegrationTier;
  trades: string;
  trigger: string;
};

export const CATEGORY_LABELS: Record<IntegrationCategory, string> = {
  FSM: "Field Service Management / CRM",
  Roofing: "Roofing & Construction",
  Leads: "Canvassing & Lead Sources",
  Ops: "Ops, Money & Reviews",
};

export const TIER_META: Record<
  IntegrationTier,
  { label: string; bg: string; text: string }
> = {
  "one-click": { label: "One-Click", bg: "bg-green-brand/10", text: "text-green-brand" },
  standard: { label: "Standard", bg: "bg-blue-brand/10", text: "text-blue-brand" },
  custom: { label: "Custom", bg: "bg-purple-brand/10", text: "text-purple-brand" },
};

export const integrations: Integration[] = [
  // Field Service Management / CRM
  { slug: "servicetitan", name: "ServiceTitan", category: "FSM", tier: "standard", trades: "HVAC, plumbing, electrical", trigger: "Job marked complete in ServiceTitan → review request + reactivation timer starts in GHL." },
  { slug: "housecall-pro", name: "Housecall Pro", category: "FSM", tier: "one-click", trades: "All trades", trigger: "Estimate sent in Housecall Pro → GHL follow-up sequence starts." },
  { slug: "jobber", name: "Jobber", category: "FSM", tier: "one-click", trades: "All trades", trigger: "New Jobber quote request → speed-to-lead SMS fires in under 60 seconds." },
  { slug: "fieldedge", name: "FieldEdge", category: "FSM", tier: "standard", trades: "HVAC, plumbing", trigger: "Dispatch status changes in FieldEdge → customer gets an on-my-way text via GHL." },
  { slug: "service-fusion", name: "Service Fusion", category: "FSM", tier: "standard", trades: "HVAC, electrical", trigger: "Job closed in Service Fusion → review + referral flow triggers." },
  { slug: "workiz", name: "Workiz", category: "FSM", tier: "standard", trades: "Locksmith, junk removal, appliance", trigger: "Job booked in Workiz → confirmation + reminder sequence starts in GHL." },
  { slug: "servicem8", name: "ServiceM8", category: "FSM", tier: "one-click", trades: "Small trades", trigger: "Job status set to \"Completed\" in ServiceM8 → review ask fires automatically." },
  { slug: "fieldpulse", name: "FieldPulse", category: "FSM", tier: "one-click", trades: "Plumbing, electrical", trigger: "New FieldPulse estimate → multi-touch follow-up sequence begins." },
  { slug: "kickserv", name: "Kickserv", category: "FSM", tier: "one-click", trades: "General field service", trigger: "Job scheduled in Kickserv → confirmation text sent through GHL." },
  { slug: "mhelpdesk", name: "mHelpDesk", category: "FSM", tier: "one-click", trades: "General field service", trigger: "Invoice paid in mHelpDesk → thank-you + review request flow fires." },

  // Roofing & Construction
  { slug: "jobnimbus", name: "JobNimbus", category: "Roofing", tier: "one-click", trades: "Roofing", trigger: "Job status → \"Won\" in JobNimbus → onboarding sequence + review timer starts." },
  { slug: "acculynx", name: "AccuLynx", category: "Roofing", tier: "custom", trades: "Roofing", trigger: "Job stage change in AccuLynx (custom API build) → GHL pipeline stage syncs automatically." },
  { slug: "roofr", name: "Roofr", category: "Roofing", tier: "one-click", trades: "Roofing (quotes/measurements)", trigger: "Roofr proposal sent → estimate follow-up sequence starts in GHL." },
  { slug: "leap", name: "Leap (SalesPro / JobProgress)", category: "Roofing", tier: "one-click", trades: "Roofing, remodeling", trigger: "New Leap opportunity created → speed-to-lead SMS fires instantly." },
  { slug: "buildertrend", name: "Buildertrend", category: "Roofing", tier: "one-click", trades: "Construction, remodel", trigger: "Project milestone hit in Buildertrend → client update text sent via GHL." },
  { slug: "procore", name: "Procore", category: "Roofing", tier: "custom", trades: "Commercial construction", trigger: "Custom API build syncs Procore project stages into GHL pipelines and reporting." },
  { slug: "companycam", name: "CompanyCam", category: "Roofing", tier: "one-click", trades: "All trades (job photos)", trigger: "Job photos uploaded in CompanyCam → review request auto-fires with photo proof attached." },

  // Canvassing & Lead Sources
  { slug: "salesrabbit", name: "SalesRabbit", category: "Leads", tier: "one-click", trades: "Door-to-door canvassing (roofing, solar, pest)", trigger: "New door knock logged as \"Interested\" in SalesRabbit → instant GHL speed-to-lead flow." },
  { slug: "angi-leads", name: "Angi Leads (HomeAdvisor)", category: "Leads", tier: "one-click", trades: "Lead source", trigger: "New Angi lead email → parsed and dropped into GHL with instant follow-up." },
  { slug: "thumbtack", name: "Thumbtack", category: "Leads", tier: "one-click", trades: "Lead source", trigger: "New Thumbtack lead → GHL speed-to-lead sequence starts within 60 seconds." },
  { slug: "google-lsa", name: "Google Local Services Ads", category: "Leads", tier: "one-click", trades: "Lead source", trigger: "Missed call from a Local Services Ad → instant missed-call text-back flow." },

  // Ops, Money & Reviews
  { slug: "quickbooks", name: "QuickBooks Online", category: "Ops", tier: "one-click", trades: "Invoicing", trigger: "Invoice created in GHL syncs directly to QuickBooks Online — native integration." },
  { slug: "callrail", name: "CallRail", category: "Ops", tier: "standard", trades: "Call tracking", trigger: "Missed call detected by CallRail → GHL missed-call text-back fires immediately." },
  { slug: "gorilladesk-pestpac", name: "GorillaDesk / PestPac", category: "Ops", tier: "custom", trades: "Pest control FSM", trigger: "Service completed in GorillaDesk or PestPac → renewal reminder + review flow starts." },
];

export const BONUS_LOGOS = [
  "NiceJob", "Podium", "Hover", "EagleView", "Stripe", "Xero", "Aspire", "LMN",
];
