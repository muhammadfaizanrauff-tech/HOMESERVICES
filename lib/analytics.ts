// Event taxonomy — fire at every meaningful funnel step.
// Dispatches to window.dataLayer (GA4/GTM) and Meta Pixel if present.

export type FunnelEvent =
  | { event: "funnel_view";            landingPath: string; trade?: string; platform?: string; source?: string }
  | { event: "qualifier_start" }
  | { event: "qualifier_step_complete"; step: number; field: string; value?: string }
  | { event: "qualifier_abandon";       lastStep: number }
  | { event: "fit_result_shown";        track: string; temperature: string }
  | { event: "contact_submitted" }
  | { event: "lead_created";            leadId: string; track: string; temperature: string; score: number }
  | { event: "booking_shown";           track: string }
  | { event: "booking_completed" }
  | { event: "disqualified";            reason: string }
  | { event: "ghl_sync";               status: "success" | "failed" };

export function track(payload: FunnelEvent): void {
  if (typeof window === "undefined") return;

  // GA4 / GTM
  if ("dataLayer" in window) {
    (window as { dataLayer: unknown[] }).dataLayer.push(payload);
  }

  // Meta Pixel
  if ("fbq" in window) {
    const fbq = (window as { fbq: (...args: unknown[]) => void }).fbq;
    if (payload.event === "lead_created") {
      fbq("track", "Lead", { track: (payload as { track: string }).track });
    }
    if (payload.event === "booking_completed") {
      fbq("track", "Schedule");
    }
  }

  // Dev console (non-prod only)
  if (process.env.NODE_ENV === "development") {
    console.log("[analytics]", payload);
  }
}
