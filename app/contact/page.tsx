import type { Metadata } from "next";
import Section, { Eyebrow } from "@/components/Section";
import CTABanner from "@/components/CTABanner";
import ContactForm from "./ContactForm";
import { CONTACT_EMAIL } from "@/lib/constants";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach out to ChrisAlchemy Consulting. Book a free demo or ask a question about our AI automation system for home services businesses.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
            Let&apos;s talk about your business.
          </h1>
          <p className="text-gray-300 text-lg max-w-xl">
            Questions before you start? Want to see it in action? Reach out or book a demo.
          </p>
        </div>
      </section>

      {/* Two paths */}
      <Section gray>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-7 flex flex-col gap-4">
            <Calendar size={32} className="text-orange-brand" />
            <h3 className="text-xl font-bold text-navy">Book a free demo</h3>
            <p className="text-gray-muted leading-relaxed">
              See the system live and get a build plan for your business.
            </p>
            <Link
              href="/demo/calendar"
              className="inline-flex items-center gap-2 bg-orange-brand text-white font-semibold px-5 py-3 rounded-lg hover:bg-orange-brand-hover transition-colors self-start"
            >
              Schedule Demo <ArrowRight size={16} />
            </Link>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-7 flex flex-col gap-4">
            <ArrowRight size={32} className="text-navy" />
            <h3 className="text-xl font-bold text-navy">Pick a plan</h3>
            <p className="text-gray-muted leading-relaxed">
              Know what you want? Get started now.
            </p>
            <Link
              href="/services#pricing"
              className="inline-flex items-center gap-2 border-2 border-navy text-navy font-semibold px-5 py-3 rounded-lg hover:bg-navy hover:text-white transition-colors self-start"
            >
              View Plans <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </Section>

      {/* Contact form */}
      <Section>
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <Eyebrow>CONTACT FORM</Eyebrow>
            <h2 className="text-3xl font-bold text-navy">Send us a message.</h2>
          </div>
          <ContactForm />
        </div>
      </Section>

      {/* Direct contact */}
      <Section gray>
        <div className="text-center">
          <p className="text-gray-muted mb-2">Prefer to reach out directly?</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-orange-brand font-semibold text-lg hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          <p className="text-gray-muted text-sm mt-4 italic">
            The GHL layer built for the field, not just the funnel.
          </p>
        </div>
      </Section>

      <CTABanner />
    </>
  );
}
