import type { Metadata } from "next";
import Section, { Eyebrow } from "@/components/Section";
import Button from "@/components/Button";
import CTABanner from "@/components/CTABanner";
import PricingCard from "@/components/PricingCard";
import ModuleCard from "@/components/ModuleCard";
import FAQItem from "@/components/FAQItem";
import { plans } from "@/content/plans";
import { modules } from "@/content/modules";
import { faqs } from "@/content/faqs";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description:
    "12 automation modules, 3 plans, one system that runs itself. AI follow-up, booking, and review automation for HVAC, plumbing, and home services.",
};

const integrations = [
  "ServiceTitan",
  "Jobber",
  "HouseCall Pro",
  "FieldEdge",
];

export default function ServicesPage() {
  const coreModules = modules.filter((m) => m.tier === "CORE");
  const growthModules = modules.filter((m) => m.tier === "GROWTH");
  const premiumModules = modules.filter((m) => m.tier === "PREMIUM");

  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Eyebrow>SERVICES &amp; PRICING</Eyebrow>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5">
            Everything you need to capture, book, and keep more customers.
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            12 automation modules. 3 plans. One system that runs itself — built and managed for you.
          </p>
          <Button href="/demo/calendar" size="lg">
            Book a Demo
          </Button>
        </div>
      </section>

      {/* The 12 Modules */}
      <Section>
        <div className="text-center mb-10">
          <Eyebrow>WHAT&apos;S INCLUDED</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-navy">
            The 12 automation modules.
          </h2>
        </div>

        <div className="space-y-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-brand text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                CORE
              </span>
              <span className="text-gray-muted text-sm">Included in all plans</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {coreModules.map((m) => (
                <ModuleCard key={m.n} module={m} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-brand text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                GROWTH
              </span>
              <span className="text-gray-muted text-sm">Pro plan and above</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {growthModules.map((m) => (
                <ModuleCard key={m.n} module={m} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-purple-brand text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                PREMIUM
              </span>
              <span className="text-gray-muted text-sm">Elite plan only</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {premiumModules.map((m) => (
                <ModuleCard key={m.n} module={m} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Pricing */}
      <Section gray id="pricing">
        <div className="text-center mb-10">
          <Eyebrow>PRICING</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3">
            Choose your plan.
          </h2>
          <p className="text-gray-muted max-w-2xl mx-auto">
            Every plan starts with the Core system and scales up. Designed to deliver
            enterprise-grade outcomes at a fraction of enterprise pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>

        <p className="text-center text-gray-muted text-sm">
          Not sure which fits?{" "}
          <Link href="/demo/calendar" className="text-orange-brand font-semibold hover:underline">
            Book a free demo →
          </Link>
        </p>
      </Section>

      {/* Two tracks */}
      <Section>
        <div className="text-center mb-10">
          <Eyebrow>TWO TRACKS</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-navy">
            Already have software? No problem.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-light rounded-xl border border-gray-200 p-7">
            <div className="text-xs font-bold uppercase tracking-widest text-green-brand mb-3">
              Track A — Start Fresh
            </div>
            <h3 className="text-xl font-bold text-navy mb-3">No CRM yet?</h3>
            <p className="text-gray-muted leading-relaxed">
              Running on spreadsheets, paper, or nothing? We build you a complete all-in-one
              growth system.
            </p>
          </div>
          <div className="bg-gray-light rounded-xl border border-gray-200 p-7">
            <div className="text-xs font-bold uppercase tracking-widest text-blue-brand mb-3">
              Track B — Add the AI Layer
            </div>
            <h3 className="text-xl font-bold text-navy mb-3">
              Already on a platform?
            </h3>
            <p className="text-gray-muted leading-relaxed">
              We bolt an AI follow-up layer on top — no switching, no disruption to your team.
            </p>
          </div>
        </div>
      </Section>

      {/* Integrations */}
      <Section gray>
        <div className="text-center mb-8">
          <Eyebrow>INTEGRATIONS</Eyebrow>
          <h2 className="text-3xl font-bold text-navy mb-2">
            Works with what you already run.
          </h2>
          <p className="text-gray-muted">
            We add the AI layer on top — or migrate you to a full system. Your call.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          {integrations.map((name) => (
            <div
              key={name}
              className="bg-white border border-gray-200 rounded-xl px-6 py-3 font-semibold text-navy shadow-sm text-sm"
            >
              {name}
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="text-3xl font-bold text-navy">Frequently asked questions.</h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-200 px-6">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} faq={faq} />
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section gray>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-navy mb-6">Ready to get started?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="#pricing" size="lg">
              Get Started
            </Button>
            <Button href="/demo/calendar" variant="secondary" size="lg">
              Book a Demo
            </Button>
          </div>
        </div>
      </Section>

      <CTABanner />
    </>
  );
}
