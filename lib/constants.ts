export const SITE_NAME = "ChrisAlchemy Consulting";
export const TAGLINE = "The GHL layer built for the field, not just the funnel.";
export const CONTACT_EMAIL = "george@chrisalchemyconsulting.com";
export const PARENT_SITE_URL = "https://chrisalchemyconsulting.com";

export function parentSiteUrl(utmContent: string): string {
  return `${PARENT_SITE_URL}?utm_source=home-services-funnel&utm_medium=website&utm_content=${utmContent}`;
}
export const INDUSTRIES = [
  "HVAC",
  "Plumbing",
  "Electrical",
  "Roofing",
  "Landscaping",
  "Pest Control",
  "Other",
] as const;

export const SOFTWARE_OPTIONS = [
  "None / Spreadsheets",
  "ServiceTitan",
  "Jobber",
  "HouseCall Pro",
  "FieldEdge",
  "Other",
] as const;

export const TECH_COUNT_OPTIONS = [
  "1–4",
  "5–10",
  "10+",
] as const;

export type Industry = (typeof INDUSTRIES)[number];
export type SoftwareOption = (typeof SOFTWARE_OPTIONS)[number];
export type TechCount = (typeof TECH_COUNT_OPTIONS)[number];
