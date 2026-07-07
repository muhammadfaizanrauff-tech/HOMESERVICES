import type { Metadata } from "next";
import Link from "next/link";
import {
  Inbox, Mail, MessageSquare, KanbanSquare, Star, Smartphone, Bot, PhoneCall,
} from "lucide-react";
import Section, { Eyebrow } from "@/components/Section";
import CTABanner from "@/components/CTABanner";
import Button from "@/components/Button";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { parentSiteUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "The Platform",
  description:
    "Your entire front office in one login: unified inbox, campaigns, pipeline, reputation, and AI voice, powered by ChrisAlchemy's GoHighLevel sub-account.",
};

const FEATURES = [
  { icon: <Inbox size={24} />, title: "Unified inbox", body: "SMS, email, Google Business, and Facebook messages, all in one thread per customer." },
  { icon: <Mail size={24} />, title: "Email & SMS campaigns", body: "Build and send campaigns without touching a separate tool." },
  { icon: <MessageSquare size={24} />, title: "2-way texting", body: "Text customers directly from the same number your automations use." },
  { icon: <KanbanSquare size={24} />, title: "Pipeline board", body: "Track every lead and job from first contact to booked and closed." },
  { icon: <Star size={24} />, title: "Reputation dashboard", body: "See every review across Google and Facebook, and respond from one place." },
  { icon: <Smartphone size={24} />, title: "Mobile app for the field", body: "Your team can check leads, jobs, and messages from a phone, no desktop required." },
];

export default function SaasPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Eyebrow className="justify-center">THE PLATFORM</Eyebrow>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 max-w-3xl mx-auto">
            Your entire front office, in one login. Powered by ChrisAlchemy.
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Every plan includes a fully provisioned GoHighLevel sub-account: the same
            system running the automations you already see on this site.
          </p>
          <div className="max-w-4xl mx-auto">
            <ImagePlaceholder
              label="SCREENSHOT: GHL sub-account dashboard (mobile + desktop mockup side by side)"
              ratio="16/8"
            />
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <Section>
        <div className="text-center mb-10">
          <Eyebrow>WHAT&apos;S INSIDE</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-navy">
            Everything you need to run the front office.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-gray-light rounded-xl p-6 flex flex-col gap-3">
              <div className="text-orange-brand">{f.icon}</div>
              <h3 className="font-bold text-navy text-base">{f.title}</h3>
              <p className="text-gray-muted text-sm leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* AI layer */}
      <Section dark>
        <div className="max-w-3xl mx-auto text-center">
          <Eyebrow className="text-orange-brand">CONVERSATION AI + VOICE AI</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            A website chat widget that books jobs. A receptionist that never sleeps.
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            Conversation AI answers website chats and qualifies leads instantly. The
            Voice AI receptionist answers every inbound call, 24/7, handles FAQs, and
            books directly into your calendar.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            <div className="bg-white/5 rounded-xl p-6 flex flex-col items-center gap-3 text-center">
              <Bot size={28} className="text-orange-brand" />
              <h3 className="font-bold text-white text-sm">Conversation AI</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Website chat widget that qualifies and books.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 flex flex-col items-center gap-3 text-center">
              <PhoneCall size={28} className="text-orange-brand" />
              <h3 className="font-bold text-white text-sm">Voice AI receptionist</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                24/7 AI phone coverage that books jobs, not just takes messages.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section gray>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
            Sub-accounts are provisioned from ChrisAlchemy Consulting.
          </h2>
          <p className="text-gray-muted mb-6">
            Every plan on this site includes one, set up and configured by our build
            team. Get yours or see it live on a demo call.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={parentSiteUrl("saas-page-cta")} size="lg">
              Get Your Sub-Account
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
