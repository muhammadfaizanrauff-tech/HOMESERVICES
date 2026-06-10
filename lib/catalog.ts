// Single source of truth for all display labels and catalog data.
// Components, forms, and analytics import from here — never hardcode strings.

export const TRADE_LABELS: Record<string, string> = {
  hvac:        "HVAC",
  plumbing:    "Plumbing",
  electrical:  "Electrical",
  roofing:     "Roofing",
  landscaping: "Landscaping",
  pest_control:"Pest Control",
  other:       "Other Trade",
};

export const FSM_LABELS: Record<string, string> = {
  servicetitan:  "ServiceTitan",
  jobber:        "Jobber",
  housecall_pro: "HouseCall Pro",
  chiirp:        "Chiirp",
  other_fsm:     "Other software",
  none:          "None / Spreadsheets",
};

export const FSM_DESCRIPTIONS: Record<string, string> = {
  servicetitan:  "We integrate on top. Nothing changes",
  jobber:        "We bolt AI follow-up on top, or migrate you off",
  housecall_pro: "We bolt AI follow-up on top, or migrate you off",
  chiirp:        "We consolidate into a more powerful GHL build",
  other_fsm:     "We'll map it out on the call",
  none:          "We build your whole system from scratch",
};

export const TECH_BAND_LABELS: Record<string, string> = {
  "1-2":  "1 to 2 techs",
  "3-4":  "3 to 4 techs",
  "5-10": "5 to 10 techs",
  "11-20":"11 to 20 techs",
  "20+":  "20+ techs",
};

export const DEPTH_LABELS: Record<string, string> = {
  none:     "Barely. Just set it up",
  light:    "Basic: invoices & scheduling",
  moderate: "Moderate: dispatch + some tracking",
  deep:     "Deep. Can't run a day without it",
};

export const PAIN_LABELS: Record<string, string> = {
  missed_calls:         "Missed calls",
  slow_lead_followup:   "Slow lead follow-up",
  quotes_going_cold:    "Quotes going cold",
  no_reviews:           "Not enough reviews",
  reputation:           "Online reputation",
  customers_going_quiet:"Customers going quiet",
  no_after_hours:       "No after-hours coverage",
  disorganized:         "Disorganized operations",
  other:                "Something else",
};

export const TIMELINE_LABELS: Record<string, string> = {
  now:           "Right now",
  this_month:    "This month",
  this_quarter:  "This quarter",
  exploring:     "Just exploring",
};

export const TRACK_LABELS: Record<string, string> = {
  A_full_build: "Full GHL Build",
  B_integrate:  "AI Layer on Top",
  B_migrate:    "Platform Migration",
  disqualify:   "Not a Fit",
};

export const TRACK_DESCRIPTIONS: Record<string, string> = {
  A_full_build:
    "No CRM yet? We build your complete all-in-one growth system from scratch.",
  B_integrate:
    "Already on ServiceTitan, Jobber, or HouseCall Pro? We bolt AI follow-up on top. Zero disruption to your team.",
  B_migrate:
    "Small shop with light platform use? We replace it with something more powerful and more affordable.",
  disqualify:
    "We may not be the right fit right now, but we'll point you in the right direction.",
};

export const TIER_LABELS: Record<string, string> = {
  core:    "Starter",
  growth:  "Pro",
  premium: "Elite",
};
