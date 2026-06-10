// Client-side attribution capture.
// Call initAttribution() once in layout (client component).
// Call getAttribution() before form submission to attach UTM data.

export type AttributionData = {
  source: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  gclid?: string;
  fbclid?: string;
  referrerUrl?: string;
  landingPath?: string;
  entryTrade?: string;
  entryPlatform?: string;
  sessionId?: string;
};

const SESSION_KEY = "ca_attribution";

export function initAttribution(): void {
  if (typeof window === "undefined") return;

  // Only capture on first visit (don't overwrite with direct nav later)
  const existing = sessionStorage.getItem(SESSION_KEY);
  if (existing) return;

  const params = new URLSearchParams(window.location.search);

  const utm_source   = params.get("utm_source")   ?? undefined;
  const utm_medium   = params.get("utm_medium")   ?? undefined;
  const utm_campaign = params.get("utm_campaign") ?? undefined;
  const utm_content  = params.get("utm_content")  ?? undefined;
  const utm_term     = params.get("utm_term")     ?? undefined;
  const gclid        = params.get("gclid")        ?? undefined;
  const fbclid       = params.get("fbclid")       ?? undefined;

  const referrer    = document.referrer || undefined;
  const landingPath = window.location.pathname;

  // Derive entryTrade/entryPlatform from path (e.g. /for/hvac, /platform/jobber)
  const tradeMatch    = landingPath.match(/\/for\/([^/]+)/);
  const platformMatch = landingPath.match(/\/platform\/([^/]+)/);

  const sessionId = crypto.randomUUID();

  const data: AttributionData = {
    source: resolveSource(utm_source, utm_medium, referrer),
    utmSource:    utm_source,
    utmMedium:    utm_medium,
    utmCampaign:  utm_campaign,
    utmContent:   utm_content,
    utmTerm:      utm_term,
    gclid,
    fbclid,
    referrerUrl:  referrer,
    landingPath,
    entryTrade:    tradeMatch?.[1],
    entryPlatform: platformMatch?.[1],
    sessionId,
  };

  sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
}

export function getAttribution(): AttributionData {
  if (typeof window === "undefined") return { source: "direct" };
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return { source: "direct" };
  try {
    return JSON.parse(raw) as AttributionData;
  } catch {
    return { source: "direct" };
  }
}

function resolveSource(
  utmSource?: string,
  utmMedium?: string,
  referrer?: string,
): string {
  if (utmSource) {
    const s = utmSource.toLowerCase();
    if (s.includes("instantly") || s.includes("lemlist") || s.includes("smartlead"))
      return "cold_email";
    if (s.includes("linkedin"))   return "linkedin";
    if (s.includes("fb") || s.includes("facebook")) return "paid_fb";
    if (s.includes("ig") || s.includes("instagram")) return "paid_ig";
    if (s.includes("google"))     return "google_organic";
    if (s.includes("partner"))    return "partnership";
    if (s.includes("referral"))   return "referral";
    if (s.includes("youtube") || s.includes("yt")) return "youtube";
  }
  if (utmMedium) {
    const m = utmMedium.toLowerCase();
    if (m.includes("video") || m.includes("reels") || m.includes("tiktok"))
      return "short_form_video";
    if (m.includes("email"))   return "cold_email";
    if (m.includes("social"))  return "facebook_group";
    if (m.includes("cpc") || m.includes("paid")) return "paid_fb";
  }
  if (referrer) {
    const r = referrer.toLowerCase();
    if (r.includes("linkedin"))  return "linkedin";
    if (r.includes("facebook") || r.includes("fb.com")) return "facebook_group";
    if (r.includes("youtube"))   return "youtube";
    if (r.includes("google"))    return "google_organic";
  }
  return "direct";
}
