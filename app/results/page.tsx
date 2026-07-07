import type { Metadata } from "next";
import { TrendingUp } from "lucide-react";
import Section, { Eyebrow } from "@/components/Section";
import CTABanner from "@/components/CTABanner";
import { caseStudies } from "@/content/case-studies";
import { TRADE_LABELS } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Results",
  description:
    "Real, anonymized outcomes from HVAC, plumbing, roofing, and other home services companies running ChrisAlchemy's AI automation system.",
};

export default function ResultsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Eyebrow className="justify-center">RESULTS</Eyebrow>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 max-w-3xl mx-auto">
            Real businesses. Real numbers.
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Anonymized case studies from HVAC, plumbing, roofing, and other home
            services companies running the system live today.
          </p>
        </div>
      </section>

      {/* Case studies */}
      <Section>
        <div className="space-y-8">
          {caseStudies.map((cs) => (
            <div
              key={cs.slug}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8"
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-orange-brand/10 text-orange-brand text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {TRADE_LABELS[cs.trade] ?? cs.trade}
                </span>
                <span className="text-gray-muted text-sm">{cs.city}</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-navy mb-3">
                {cs.companyLabel}
              </h2>
              <p className="text-gray-body leading-relaxed mb-6">{cs.problem}</p>

              <p className="text-xs font-bold uppercase tracking-wider text-gray-muted mb-2">
                What we deployed
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {cs.deployed.map((d) => (
                  <li
                    key={d}
                    className="bg-gray-light rounded-lg p-3 text-sm text-gray-body leading-snug"
                  >
                    {d}
                  </li>
                ))}
              </ul>

              <p className="text-xs font-bold uppercase tracking-wider text-gray-muted mb-2">
                90-day numbers
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {cs.stats.map((s) => (
                  <div key={s.label} className="text-center bg-navy/5 rounded-xl p-4">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-gray-muted text-sm line-through">{s.before}</span>
                      <TrendingUp size={14} className="text-green-brand" />
                      <span className="text-2xl font-extrabold text-orange-brand">{s.after}</span>
                    </div>
                    <div className="text-gray-muted text-xs">{s.label}</div>
                  </div>
                ))}
              </div>

              <blockquote className="border-l-4 border-orange-brand pl-4 text-navy italic">
                &ldquo;{cs.quote.text}&rdquo;
                <footer className="text-gray-muted text-sm mt-2 not-italic">
                  — {cs.quote.author}
                </footer>
              </blockquote>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-muted text-xs mt-8">
          Company names anonymized at owner request. Individual results vary based on
          lead volume, trade, and platform depth.
        </p>
      </Section>

      <CTABanner />
    </>
  );
}
