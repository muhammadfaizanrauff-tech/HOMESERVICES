import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FSM_LABELS, FSM_DESCRIPTIONS, TRACK_DESCRIPTIONS } from "@/lib/catalog";
import { BRIDGE_PLATFORMS, NO_REPLACE_PLATFORMS } from "@/lib/fsm";
import CTABanner from "@/components/CTABanner";
import Section, { Eyebrow } from "@/components/Section";

type Params = { fsm: string };

const VALID_PLATFORMS = ["servicetitan", "jobber", "housecall_pro", "chiirp", "none"];

export async function generateStaticParams() {
  return VALID_PLATFORMS.map((fsm) => ({ fsm }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { fsm } = await params;
  const label = FSM_LABELS[fsm];
  if (!label) return {};
  return {
    title: `${label} + AI Automation — ChrisAlchemy`,
    description: FSM_DESCRIPTIONS[fsm] ?? `AI follow-up and automation on top of ${label}.`,
  };
}

const PLATFORM_COPY: Record<string, { headline: string; sub: string; bullets: string[]; track: string }> = {
  servicetitan: {
    headline: "Still on ServiceTitan? Here's the AI layer it was never built to include.",
    sub: "ServiceTitan handles your operations. We add automated follow-up, review collection, and customer reactivation on top — triggered by real ST job events, not form fills. Your team changes nothing.",
    bullets: [
      "Speed-to-lead SMS fires when a new ST lead comes in",
      "Review requests trigger when a job is marked complete in ST",
      "Estimate follow-up fires when an opportunity goes to 'quote sent'",
      "After-hours AI answers calls your ST dispatcher can't",
    ],
    track: "B_integrate",
  },
  jobber: {
    headline: "Already on Jobber? We either bolt AI on top — or replace it with something more powerful.",
    sub: "Small crew with light Jobber usage? We migrate you to a full GHL system that does more for less. Bigger operation? We add the AI follow-up layer on top without disrupting a thing.",
    bullets: [
      "Missed-call text-back: respond in 30 seconds, every time",
      "Estimate follow-up: chase every quote automatically until won or closed",
      "Review generation: asks every completed customer, routes 1-stars away from Google",
      "Reactivation: brings quiet customers back seasonally",
    ],
    track: "B_integrate or B_migrate depending on your situation",
  },
  housecall_pro: {
    headline: "HouseCall Pro + AI follow-up — the combination that grows revenue without adding headcount.",
    sub: "We add automated lead follow-up, review collection, and customer reactivation on top of HouseCall Pro — or migrate small shops into a single, more powerful platform.",
    bullets: [
      "Speed-to-lead SMS fires on new HCP leads",
      "Missed calls get an instant text-back",
      "Quotes follow up automatically — 6 touches until won or closed",
      "Past customers get seasonal re-engagement sequences",
    ],
    track: "B_integrate or B_migrate",
  },
  chiirp: {
    headline: "Already automation-minded? You're halfway there. Let's finish the build.",
    sub: "Chiirp users get it. You know automation is the play — we just build it properly inside GoHighLevel with the full stack of follow-up, booking, and review modules.",
    bullets: [
      "Full GHL migration — more features, same monthly budget or less",
      "12 automation modules vs. basic sequences",
      "Native FSM bridge for ServiceTitan, Jobber, or HCP",
      "Done-for-you build by Our Team — live in 5–7 days",
    ],
    track: "B_migrate",
  },
  none: {
    headline: "No CRM yet? We build your whole growth system from scratch.",
    sub: "Most of the home-services businesses we talk to are still running on spreadsheets or nothing. We set up GoHighLevel as your all-in-one platform — lead capture, booking, follow-up, reviews, everything.",
    bullets: [
      "Speed-to-lead: respond to every new lead in under 60 seconds",
      "Missed-call text-back: never lose a job to voicemail again",
      "Estimate follow-up: multi-touch sequence on every quote",
      "Review generation: build your Google rating automatically",
    ],
    track: "A_full_build",
  },
};

export default async function PlatformLandingPage({ params }: { params: Promise<Params> }) {
  const { fsm } = await params;
  if (!VALID_PLATFORMS.includes(fsm)) notFound();

  const label  = FSM_LABELS[fsm] ?? fsm;
  const copy   = PLATFORM_COPY[fsm] ?? PLATFORM_COPY.none;
  const hasBridge   = BRIDGE_PLATFORMS.includes(fsm as typeof BRIDGE_PLATFORMS[number]);
  const noReplace   = NO_REPLACE_PLATFORMS.includes(fsm as typeof NO_REPLACE_PLATFORMS[number]);

  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>{label.toUpperCase()} INTEGRATION</Eyebrow>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight max-w-3xl mb-5">
            {copy.headline}
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mb-8 leading-relaxed">
            {copy.sub}
          </p>
          {noReplace && (
            <p className="inline-block bg-orange-brand/10 border border-orange-brand/30 text-orange-brand text-sm px-4 py-2 rounded-lg mb-6">
              Your techs never touch anything new. We add on top — zero disruption.
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/qualify?platform=${fsm}`}
              className="inline-flex items-center gap-2 bg-orange-brand text-white font-bold px-8 py-4 rounded-xl hover:bg-orange-brand-hover transition-colors text-lg"
            >
              See if it&apos;s a fit — 2 minutes <ArrowRight size={18} />
            </Link>
            <Link
              href="/demo/calendar"
              className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-semibold px-7 py-4 rounded-xl hover:bg-white/10 transition-colors"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* What we add */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <Eyebrow>WHAT WE ADD</Eyebrow>
          <h2 className="text-3xl font-bold text-navy mb-8">
            The follow-up layer {label} was never built to do.
          </h2>
          <div className="space-y-3">
            {copy.bullets.map((b) => (
              <div key={b} className="flex items-start gap-4 bg-gray-light rounded-xl p-4">
                <span className="text-green-brand font-bold text-lg shrink-0 mt-0.5">✓</span>
                <p className="text-gray-body">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Bridge callout for platforms that support it */}
      {hasBridge && (
        <Section dark>
          <div className="max-w-3xl mx-auto text-center">
            <Eyebrow className="text-orange-brand">THE BRIDGE NOBODY ELSE BUILT</Eyebrow>
            <h2 className="text-3xl font-bold text-white mb-4">
              Automations that fire on real job data — not form fills.
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              When a job is completed in {label}, our Zapier bridge fires a review request.
              When a quote is sent, the follow-up sequence starts automatically. Your team
              changes nothing — the bridge reads the events they&apos;re already creating.
            </p>
          </div>
        </Section>
      )}

      <CTABanner />
    </>
  );
}
