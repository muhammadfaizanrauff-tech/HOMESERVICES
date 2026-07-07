import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { TRADE_LABELS } from "@/lib/catalog";
import { modules } from "@/content/modules";
import { integrations, TIER_META } from "@/content/integrations";
import { getCaseStudyByTrade } from "@/content/case-studies";
import CTABanner from "@/components/CTABanner";
import Section, { Eyebrow } from "@/components/Section";
import FAQItem from "@/components/FAQItem";

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

const TRADE_COPY: Record<
  string,
  {
    headline: string;
    sub: string;
    pains: string[];
    moduleNums: number[];
    integrationSlugs: string[];
    faqs: { q: string; a: string }[];
  }
> = {
  hvac: {
    headline: "HVAC companies stop losing 3 to 5 jobs a week to missed calls.",
    sub: "Speed-to-lead, missed-call text-back, and estimate follow-up, automated on top of ServiceTitan, Jobber, or HouseCall Pro. Your techs never touch anything new.",
    pains: ["After-hours calls that go to voicemail", "Quotes that go cold after 3 days", "Customers who book seasonally and then go quiet"],
    moduleNums: [1, 2, 3, 5],
    integrationSlugs: ["servicetitan", "housecall-pro", "fieldedge"],
    faqs: [
      { q: "We're already on ServiceTitan. Does this replace it?", a: "No. We connect to ServiceTitan and add the follow-up layer on top: missed-call texts, review requests, and reactivation, triggered by real job events. Nothing changes for your dispatchers or techs." },
      { q: "How fast does the AI voice agent answer?", a: "Immediately, 24/7. It handles FAQs, checks availability, and books the job directly into your calendar, even at 2am." },
    ],
  },
  plumbing: {
    headline: "Plumbing businesses: stop losing emergency calls to voicemail.",
    sub: "Every missed call is a job that calls your competitor. We fix that in under a week.",
    pains: ["Emergency calls after hours going unanswered", "Repeat customers who don't rebook", "Zero Google reviews despite great work"],
    moduleNums: [1, 2, 3, 8],
    integrationSlugs: ["servicetitan", "housecall-pro", "callrail"],
    faqs: [
      { q: "Can it handle a real plumbing emergency at 3am?", a: "Yes. The AI voice agent triages urgency, captures the details, and either books an emergency slot or texts your on-call tech, depending on how you want it routed." },
      { q: "Do my techs need to change how they close out a job?", a: "No. The automations fire off events your team already generates, closing a ticket, marking a job paid, so there's nothing new to learn." },
    ],
  },
  electrical: {
    headline: "Electrical contractors: every quote that goes cold is money left on the table.",
    sub: "Our estimate follow-up sequence keeps chasing the quote so you don't have to.",
    pains: ["Quotes sent but never followed up", "Slow response time to new leads", "No system to re-engage past customers"],
    moduleNums: [1, 5, 6, 11],
    integrationSlugs: ["fieldedge", "housecall-pro", "quickbooks"],
    faqs: [
      { q: "How many follow-up touches does an estimate get?", a: "A 6-touch sequence over roughly 3 weeks, until the quote is won, lost, or explicitly closed. Most owners recover 2 to 3 extra jobs a month just from this." },
      { q: "Can you target panel upgrade or seasonal work specifically?", a: "Yes, reactivation campaigns can be filtered by past service type, so panel upgrade candidates get a different message than routine service customers." },
    ],
  },
  roofing: {
    headline: "Roofing companies: win more jobs from the same lead volume.",
    sub: "Speed-to-lead and estimate follow-up: the two biggest revenue leaks in roofing, automated.",
    pains: ["Competitors respond faster and win the job", "Storm season leads that go cold", "Low review count hurting trust with homeowners"],
    moduleNums: [1, 5, 7, 12],
    integrationSlugs: ["jobnimbus", "acculynx", "salesrabbit"],
    faqs: [
      { q: "We canvass with SalesRabbit. Does that connect?", a: "Yes. Every door knock logged as \"Interested\" fires an instant speed-to-lead flow, so reps don't lose leads the moment they move to the next house." },
      { q: "What about AccuLynx? Zapier support is limited.", a: "AccuLynx gets a custom API/webhook build, included on Elite or as a custom quote, so job stage changes still sync into your pipeline." },
    ],
  },
  landscaping: {
    headline: "Landscaping businesses: turn one-time clients into recurring revenue.",
    sub: "Seasonal reactivation and membership renewal automation built specifically for landscape companies.",
    pains: ["Seasonal customers who don't rebook", "No system to upsell maintenance plans", "Word-of-mouth that never turns into reviews"],
    moduleNums: [9, 11, 7, 6],
    integrationSlugs: ["quickbooks", "callrail", "companycam"],
    faqs: [
      { q: "How does seasonal reactivation actually work?", a: "Customers are tagged by service type and last-service date, then re-engaged automatically as their season approaches, spring cleanup, mulching, fall cleanup, without you lifting a finger." },
      { q: "Can it push maintenance-plan upsells?", a: "Yes, the membership module handles enrollment offers, renewal reminders, and lapsed-member win-back on a schedule you set." },
    ],
  },
  pest_control: {
    headline: "Pest control companies: automate renewals and stop losing recurring customers.",
    sub: "Membership renewal flows, reactivation campaigns, and review generation, all running automatically.",
    pains: ["Annual contract customers who lapse", "No review system after every service", "Slow follow-up on new quote requests"],
    moduleNums: [9, 10, 7, 4],
    integrationSlugs: ["gorilladesk-pestpac", "quickbooks", "callrail"],
    faqs: [
      { q: "We run GorillaDesk. How does the renewal flow trigger?", a: "When a service is marked complete in GorillaDesk, the renewal-reminder clock starts automatically, and lapsed members get a win-back sequence if they don't renew on time." },
      { q: "Does it work with PestPac too?", a: "Yes, via a custom API build (included on Elite or as a custom quote), since PestPac doesn't expose a native Zapier connector." },
    ],
  },
  solar: {
    headline: "Solar installers: cut consultation no-shows and respond to leads in minutes, not hours.",
    sub: "Canvassing leads and ad-driven inquiries both get instant speed-to-lead follow-up and automated appointment reminders.",
    pains: ["Door-to-door leads that sit for days before a call", "High no-show rate on booked consultations", "After-hours ad inquiries going unanswered"],
    moduleNums: [1, 3, 4, 12],
    integrationSlugs: ["salesrabbit", "google-lsa", "callrail"],
    faqs: [
      { q: "We canvass door-to-door with SalesRabbit. Does that connect?", a: "Yes, every new lead logged in SalesRabbit fires an instant speed-to-lead SMS and call, before the rep even leaves the block." },
      { q: "How does it reduce no-shows?", a: "A 4-touch confirmation and reminder sequence runs automatically before every booked consultation, with automatic no-show recovery outreach after." },
    ],
  },
  garage_doors: {
    headline: "Garage door companies: turn missed calls into booked repairs automatically.",
    sub: "Same-day repair requests get an instant text-back, and every estimate gets chased until it closes.",
    pains: ["Missed calls during install jobs going unanswered", "Spring and cable repair quotes with no follow-up", "Low review volume for a high-repeat-business trade"],
    moduleNums: [2, 5, 7, 8],
    integrationSlugs: ["housecall-pro", "callrail", "google-lsa"],
    faqs: [
      { q: "Can it tell urgent same-day repairs apart from installs?", a: "Yes, the AI can triage based on what the caller says and route urgent repair requests differently from new install inquiries." },
      { q: "Does the review flow work for repeat customers?", a: "Yes, every completed job triggers a review request, with a referral incentive built in for a trade that runs heavily on word of mouth." },
    ],
  },
  junk_removal: {
    headline: "Junk removal companies: stop losing weekend leads to voicemail.",
    sub: "Same-day quote requests get instant follow-up, and repeat customers like movers and realtors get automatic re-engagement.",
    pains: ["Weekend and after-hours requests going unanswered", "No follow-up system for repeat commercial customers", "Same-day quotes that never get a response"],
    moduleNums: [1, 2, 4, 11],
    integrationSlugs: ["workiz", "google-lsa", "callrail"],
    faqs: [
      { q: "We run Workiz. How does the connection work?", a: "When a job is booked in Workiz, a confirmation and reminder sequence fires automatically in GHL, and after-hours requests get instant text-back so nothing sits until Monday." },
      { q: "Can it target realtors and property managers specifically?", a: "Yes, repeat commercial customers can be tagged and re-engaged on their own cadence, separate from one-time residential jobs." },
    ],
  },
};

export default async function TradeLandingPage({ params }: { params: Promise<Params> }) {
  const { trade } = await params;
  if (!VALID_TRADES.includes(trade)) notFound();

  const label = TRADE_LABELS[trade];
  const copy = TRADE_COPY[trade] ?? TRADE_COPY.hvac;
  const tradeModules = copy.moduleNums
    .map((n) => modules.find((m) => m.n === n))
    .filter((m): m is NonNullable<typeof m> => !!m);
  const tradeIntegrations = copy.integrationSlugs
    .map((slug) => integrations.find((i) => i.slug === slug))
    .filter((i): i is NonNullable<typeof i> => !!i);
  const caseStudy = getCaseStudyByTrade(trade);

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

      {/* Modules built for this trade */}
      <Section gray>
        <div className="text-center mb-8">
          <Eyebrow>BUILT FOR {label.toUpperCase()}</Eyebrow>
          <h2 className="text-3xl font-bold text-navy mb-2">
            The modules {label.toLowerCase()} companies use most.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tradeModules.map((m) => (
            <div key={m.n} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center font-bold text-navy text-sm">
                {m.n}
              </div>
              <div>
                <h3 className="font-semibold text-navy text-sm mb-1">{m.title}</h3>
                <p className="text-gray-muted text-sm leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/services" className="text-orange-brand font-semibold hover:underline">
            See all 12 modules →
          </Link>
        </div>
      </Section>

      {/* Trade-specific integrations */}
      <Section>
        <div className="text-center mb-8">
          <Eyebrow>CONNECTS TO YOUR SOFTWARE</Eyebrow>
          <h2 className="text-3xl font-bold text-navy mb-2">
            Works with the tools {label.toLowerCase()} companies already run.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tradeIntegrations.map((i) => {
            const tierMeta = TIER_META[i.tier];
            return (
              <div key={i.slug} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-navy text-sm">{i.name}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${tierMeta.bg} ${tierMeta.text}`}>
                    {tierMeta.label}
                  </span>
                </div>
                <p className="text-gray-muted text-xs leading-relaxed">{i.trigger}</p>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <Link href="/integrations" className="text-orange-brand font-semibold hover:underline">
            See all 24 integrations →
          </Link>
        </div>
      </Section>

      {/* Mini case study */}
      {caseStudy && (
        <Section gray>
          <div className="max-w-3xl mx-auto">
            <Eyebrow>RESULTS</Eyebrow>
            <h2 className="text-3xl font-bold text-navy mb-6">{caseStudy.companyLabel}</h2>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-7">
              <p className="text-gray-body leading-relaxed mb-6">{caseStudy.problem}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {caseStudy.stats.map((s) => (
                  <div key={s.label} className="text-center bg-gray-light rounded-xl p-4">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-gray-muted text-sm line-through">{s.before}</span>
                      <TrendingUp size={14} className="text-green-brand" />
                      <span className="text-xl font-extrabold text-orange-brand">{s.after}</span>
                    </div>
                    <div className="text-gray-muted text-xs">{s.label}</div>
                  </div>
                ))}
              </div>
              <blockquote className="border-l-4 border-orange-brand pl-4 text-navy italic">
                &ldquo;{caseStudy.quote.text}&rdquo;
                <footer className="text-gray-muted text-sm mt-2 not-italic">
                  — {caseStudy.quote.author}
                </footer>
              </blockquote>
            </div>
            <div className="text-center mt-6">
              <Link href="/results" className="text-orange-brand font-semibold hover:underline">
                See all case studies →
              </Link>
            </div>
          </div>
        </Section>
      )}

      {/* FAQ */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="text-3xl font-bold text-navy">
              Questions {label.toLowerCase()} owners ask.
            </h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-200 px-6">
            {copy.faqs.map((faq) => (
              <FAQItem key={faq.q} faq={faq} />
            ))}
          </div>
        </div>
      </Section>

      <CTABanner />
    </>
  );
}
