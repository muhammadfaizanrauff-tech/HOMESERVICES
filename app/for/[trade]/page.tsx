import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TRADE_LABELS } from "@/lib/catalog";
import CTABanner from "@/components/CTABanner";
import Section, { Eyebrow } from "@/components/Section";

type Params = { trade: string };

const VALID_TRADES = Object.keys(TRADE_LABELS).filter((k) => k !== "other");

export async function generateStaticParams() {
  return VALID_TRADES.map((trade) => ({ trade }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { trade } = await params;
  const label = TRADE_LABELS[trade];
  if (!label) return {};
  return {
    title: `AI Automation for ${label} Companies: ChrisAlchemy`,
    description: `Stop losing jobs to missed calls and dead leads. ChrisAlchemy adds AI follow-up, review generation, and customer reactivation to your ${label.toLowerCase()} business.`,
  };
}

const TRADE_COPY: Record<string, { headline: string; sub: string; pains: string[] }> = {
  hvac: {
    headline: "HVAC companies stop losing 3 to 5 jobs a week to missed calls.",
    sub: "Speed-to-lead, missed-call text-back, and estimate follow-up, automated on top of ServiceTitan, Jobber, or HouseCall Pro. Your techs never touch anything new.",
    pains: ["After-hours calls that go to voicemail", "Quotes that go cold after 3 days", "Customers who book seasonally and then go quiet"],
  },
  plumbing: {
    headline: "Plumbing businesses: stop losing emergency calls to voicemail.",
    sub: "Every missed call is a job that calls your competitor. We fix that in under a week.",
    pains: ["Emergency calls after hours going unanswered", "Repeat customers who don't rebook", "Zero Google reviews despite great work"],
  },
  electrical: {
    headline: "Electrical contractors: every quote that goes cold is money left on the table.",
    sub: "Our estimate follow-up sequence keeps chasing the quote so you don't have to.",
    pains: ["Quotes sent but never followed up", "Slow response time to new leads", "No system to re-engage past customers"],
  },
  roofing: {
    headline: "Roofing companies: win more jobs from the same lead volume.",
    sub: "Speed-to-lead and estimate follow-up: the two biggest revenue leaks in roofing, automated.",
    pains: ["Competitors respond faster and win the job", "Storm season leads that go cold", "Low review count hurting trust with homeowners"],
  },
  landscaping: {
    headline: "Landscaping businesses: turn one-time clients into recurring revenue.",
    sub: "Seasonal reactivation and membership renewal automation built specifically for landscape companies.",
    pains: ["Seasonal customers who don't rebook", "No system to upsell maintenance plans", "Word-of-mouth that never turns into reviews"],
  },
  pest_control: {
    headline: "Pest control companies: automate renewals and stop losing recurring customers.",
    sub: "Membership renewal flows, reactivation campaigns, and review generation, all running automatically.",
    pains: ["Annual contract customers who lapse", "No review system after every service", "Slow follow-up on new quote requests"],
  },
};

export default async function TradeLandingPage({ params }: { params: Promise<Params> }) {
  const { trade } = await params;
  if (!VALID_TRADES.includes(trade)) notFound();

  const label  = TRADE_LABELS[trade];
  const copy   = TRADE_COPY[trade] ?? TRADE_COPY.hvac;

  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>{label.toUpperCase()} AUTOMATION</Eyebrow>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight max-w-3xl mb-5">
            {copy.headline}
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mb-8 leading-relaxed">
            {copy.sub}
          </p>
          <Link
            href={`/qualify?trade=${trade}`}
            className="inline-flex items-center gap-2 bg-orange-brand text-white font-bold px-8 py-4 rounded-xl hover:bg-orange-brand-hover transition-colors text-lg"
          >
            See if it&apos;s a fit in 2 minutes <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Pain points */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <Eyebrow>COMMON ISSUES</Eyebrow>
          <h2 className="text-3xl font-bold text-navy mb-8">
            Sound familiar?
          </h2>
          <div className="space-y-4">
            {copy.pains.map((pain) => (
              <div key={pain} className="flex items-start gap-4 bg-gray-light rounded-xl p-5">
                <span className="w-6 h-6 rounded-full bg-orange-brand/20 text-orange-brand flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  ✕
                </span>
                <p className="text-gray-body font-medium">{pain}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href={`/qualify?trade=${trade}`}
              className="inline-flex items-center gap-2 bg-orange-brand text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-orange-brand-hover transition-colors"
            >
              Fix these in under a week <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </Section>

      <CTABanner />
    </>
  );
}
