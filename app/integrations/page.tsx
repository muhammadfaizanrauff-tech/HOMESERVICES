import type { Metadata } from "next";
import Link from "next/link";
import { Zap, Cable, Workflow } from "lucide-react";
import Section, { Eyebrow } from "@/components/Section";
import CTABanner from "@/components/CTABanner";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import IntegrationsGrid from "./IntegrationsGrid";
import { BONUS_LOGOS } from "@/content/integrations";

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "24+ integrations with the field service, roofing, canvassing, and ops tools you already run, built, tested, and maintained for you.",
};

export default function IntegrationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Eyebrow className="justify-center">INTEGRATIONS</Eyebrow>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 max-w-3xl mx-auto">
            We connect your field software to your growth engine.
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            24+ integrations with the tools you already run. Built, tested, and maintained
            for you.
          </p>
          <div className="max-w-3xl mx-auto">
            <ImagePlaceholder
              label='GRAPHIC: hub-and-spoke diagram — GHL logo center, 24 tool logos orbiting, animated connection lines'
              ratio="16/7"
            />
          </div>
        </div>
      </section>

      {/* Filterable grid */}
      <Section>
        <div className="text-center mb-8">
          <Eyebrow>ALL INTEGRATIONS</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-2">
            Filter by category.
          </h2>
          <p className="text-gray-muted max-w-xl mx-auto">
            Every integration is tiered by how it connects: One-Click (Zapier-simple),
            Standard (webhook/API, included in Pro), or Custom (Elite / custom quote).
          </p>
        </div>
        <IntegrationsGrid />
      </Section>

      {/* How an integration works */}
      <Section gray>
        <div className="text-center mb-10">
          <Eyebrow>HOW IT WORKS</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-navy">
            From your software to your growth engine, in three steps.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <Zap size={28} className="text-orange-brand" />, title: "1. Your software fires an event", body: "A job is completed, a quote is sent, a lead comes in, whatever your field software already tracks." },
            { icon: <Cable size={28} className="text-orange-brand" />, title: "2. We pipe it into your GHL sub-account", body: "Via native integration, Zapier, Make, direct API/webhooks, or custom middleware, depending on the tier." },
            { icon: <Workflow size={28} className="text-orange-brand" />, title: "3. Automation runs", body: "SMS, email, an AI call, whatever the moment calls for, fires automatically. No manual steps, no missed jobs." },
          ].map((step) => (
            <div key={step.title} className="bg-white rounded-xl border border-gray-200 shadow-sm p-7 flex flex-col gap-4">
              {step.icon}
              <h3 className="font-bold text-navy text-lg">{step.title}</h3>
              <p className="text-gray-muted text-sm leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Bonus logo wall */}
      <Section>
        <div className="text-center mb-8">
          <Eyebrow>ALSO SUPPORTED</Eyebrow>
          <h2 className="text-2xl font-bold text-navy">And more we work with.</h2>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          {BONUS_LOGOS.map((name) => (
            <div
              key={name}
              className="bg-gray-light border border-gray-200 rounded-xl px-5 py-2.5 font-semibold text-navy text-sm"
            >
              {name}
            </div>
          ))}
        </div>
      </Section>

      {/* Custom CTA */}
      <Section gray>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
            Don&apos;t see your software?
          </h2>
          <p className="text-gray-muted mb-6">
            We build custom integrations for anything with an API or webhook. Tell us
            what you run and we&apos;ll map it out on the call.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-orange-brand text-white font-bold px-7 py-3.5 rounded-xl hover:bg-orange-brand-hover transition-colors"
          >
            Talk to us about a custom build
          </Link>
        </div>
      </Section>

      <CTABanner />
    </>
  );
}
