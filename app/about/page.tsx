import type { Metadata } from "next";
import Section, { Eyebrow } from "@/components/Section";
import CTABanner from "@/components/CTABanner";
import { TrendingUp, Zap, Bot } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "ChrisAlchemy builds the growth layer home services owners actually need — AI automation that connects to the field, not just the funnel.",
};

const industries = [
  "HVAC",
  "Plumbing",
  "Electrical",
  "Roofing",
  "Landscaping",
  "Pest Control",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight max-w-3xl mb-6">
            We build the growth layer home services owners actually need.
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
            ChrisAlchemy Consulting helps HVAC, plumbing, electrical, roofing, landscaping,
            and pest control companies capture every lead, book more jobs, and win back
            customers — with automation that runs itself.
          </p>
        </div>
      </section>

      {/* Why we exist */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <Eyebrow>OUR STORY</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">Why we exist.</h2>
          <p className="text-gray-body text-lg leading-relaxed">
            Most home services businesses lose revenue not because they&apos;re bad at the
            work — but because leads fall through the cracks. Calls go unanswered, quotes go
            cold, and past customers are forgotten. We productized the fix: a pre-built AI
            automation system that plugs into the way you already run your business.
          </p>
        </div>
      </Section>

      {/* How we're different */}
      <Section gray>
        <div className="text-center mb-10">
          <Eyebrow>HOW WE&apos;RE DIFFERENT</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-navy">
            The field, not just the funnel.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <TrendingUp size={32} className="text-orange-brand" />,
              title: "The bridge nobody built",
              body: "Everyone sells a marketing funnel. We connect the automations to your actual field software, so they fire on real jobs.",
            },
            {
              icon: <Zap size={32} className="text-orange-brand" />,
              title: "Done-for-you build",
              body: "Our build team (Rep Stack) handles every bit of setup, integration, and testing. You touch nothing.",
            },
            {
              icon: <Bot size={32} className="text-orange-brand" />,
              title: "Fits your reality",
              body: "We don't force one solution. We match the build to whether you want to integrate or start fresh.",
            },
          ].map((card) => (
            <div key={card.title} className="bg-white rounded-xl p-7 shadow-sm border border-gray-200 flex flex-col gap-4">
              {card.icon}
              <h3 className="font-bold text-navy text-lg">{card.title}</h3>
              <p className="text-gray-muted text-sm leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* The partnership */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <Eyebrow>THE PARTNERSHIP</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
            Strategy by ChrisAlchemy. Build by Rep Stack.
          </h2>
          <p className="text-gray-body text-lg leading-relaxed">
            ChrisAlchemy owns your strategy, onboarding, and relationship. Our fulfillment
            partner Rep Stack handles all technical buildout, integrations, and ongoing support
            — so everything is done for you, fast and right.
          </p>
        </div>
      </Section>

      {/* Who we serve */}
      <Section gray>
        <div className="text-center mb-8">
          <Eyebrow>WHO WE SERVE</Eyebrow>
          <h2 className="text-3xl font-bold text-navy mb-2">Built for the trades.</h2>
          <p className="text-gray-muted">
            Specialized automations built around how home services businesses actually operate.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          {industries.map((ind) => (
            <span
              key={ind}
              className="bg-white border border-gray-200 rounded-full px-5 py-2 text-navy font-semibold text-sm shadow-sm"
            >
              {ind}
            </span>
          ))}
        </div>
      </Section>

      <CTABanner />
    </>
  );
}
