import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, Phone, FileText, Users, Zap, Clock, Star, TrendingUp, Bot,
  Wind, Droplets, Home as HomeIcon, Leaf, Bug,
} from "lucide-react";
import Section, { Eyebrow } from "@/components/Section";
import Button from "@/components/Button";
import CTABanner from "@/components/CTABanner";
import PricingCard from "@/components/PricingCard";
import FAQItem from "@/components/FAQItem";
import { plans } from "@/content/plans";
import { faqs } from "@/content/faqs";

const NICHES = [
  { label: "HVAC",         slug: "hvac",         icon: Wind },
  { label: "Plumbing",     slug: "plumbing",     icon: Droplets },
  { label: "Electrical",   slug: "electrical",   icon: Zap },
  { label: "Roofing",      slug: "roofing",      icon: HomeIcon },
  { label: "Landscaping",  slug: "landscaping",  icon: Leaf },
  { label: "Pest Control", slug: "pest_control", icon: Bug },
];

export const metadata: Metadata = {
  title: "ChrisAlchemy Consulting: Stop Losing Jobs to Missed Calls",
  description:
    "ChrisAlchemy adds an AI-powered follow-up, booking, and review system to your HVAC, plumbing, or home services business. Done for you. Live in 5 to 7 days.",
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight max-w-3xl mb-6">
            The AI follow-up layer for home-services companies that are done losing jobs to voicemail.
          </h1>
          <p className="text-gray-300 text-base md:text-xl max-w-2xl mb-8 leading-relaxed">
            Speed-to-lead, missed-call text-back, estimate follow-up, and customer
            reactivation, deployed on top of ServiceTitan, Jobber, HouseCall Pro, or built
            from scratch if you have nothing. Our team handles everything. Live in 5 to 7 days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button href="/qualify" size="lg">
              See if it&apos;s a fit in 2 minutes
            </Button>
            <Button
              href="/demo/calendar"
              variant="secondary"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-navy"
            >
              Book a Demo
            </Button>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Powered by Our Team · Live in 5 to 7 days ·{" "}
            <span className="italic block sm:inline">Built for the field, not just the funnel.</span>
          </p>
        </div>
      </section>

      {/* Who We Serve */}
      <Section>
        <Eyebrow className="text-center block">Who We Serve</Eyebrow>
        <h2 className="text-3xl md:text-4xl font-bold text-navy mb-10 text-center">
          Built for your trade
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {NICHES.map(({ label, slug, icon: Icon }) => (
            <Link
              key={slug}
              href={`/for/${slug}`}
              className="group flex flex-col items-center gap-3 bg-white rounded-xl border border-gray-200 p-6 text-center shadow-sm hover:border-orange-brand hover:shadow-md transition-all"
            >
              <span className="w-12 h-12 rounded-full bg-orange-brand/10 text-orange-brand flex items-center justify-center group-hover:bg-orange-brand group-hover:text-white transition-colors">
                <Icon size={22} />
              </span>
              <span className="font-bold text-navy text-sm">{label}</span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Pain Agitation */}
      <Section gray>
        <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3 text-center">
          Every week, jobs slip through the cracks.
        </h2>
        <p className="text-center text-gray-muted mb-10 max-w-xl mx-auto">
          Most owners we talk to lose 3 to 5 jobs a month to exactly these gaps.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Phone size={28} className="text-orange-brand" />,
              title: "Missed calls",
              body: "A call goes unanswered and the customer dials your competitor.",
            },
            {
              icon: <FileText size={28} className="text-orange-brand" />,
              title: "Cold quotes",
              body: "You send an estimate and never follow up. It goes silent.",
            },
            {
              icon: <Users size={28} className="text-orange-brand" />,
              title: "Forgotten customers",
              body: "Past customers go quiet for months and never rebook.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center"
            >
              <div className="flex justify-center mb-3">{item.icon}</div>
              <h3 className="font-bold text-navy text-lg mb-2">{item.title}</h3>
              <p className="text-gray-muted text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Solution overview */}
      <Section>
        <div className="max-w-3xl mx-auto text-center mb-10">
          <Eyebrow>WHAT WE DO</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            An AI follow-up engine that runs itself.
          </h2>
          <p className="text-gray-muted text-lg leading-relaxed">
            We deploy a pre-built GoHighLevel automation system: 12 modules covering
            speed-to-lead, missed-call text-back, 24/7 AI voice, review generation, estimate
            follow-up, reactivation and more. It connects to your existing field software so
            automations fire on real job data, not form fills.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-10">
          {[
            { icon: <Zap size={24} />, label: "Respond in 60 seconds" },
            { icon: <Clock size={24} />, label: "Book jobs 24/7" },
            { icon: <FileText size={24} />, label: "Recover lost estimates" },
            { icon: <Star size={24} />, label: "Generate more reviews" },
          ].map((tile) => (
            <div
              key={tile.label}
              className="bg-gray-light rounded-xl p-5 flex flex-col items-center text-center gap-3"
            >
              <div className="text-orange-brand">{tile.icon}</div>
              <span className="font-semibold text-navy text-sm">{tile.label}</span>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Button href="/services" size="md">
            See all 12 modules <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </Section>

      {/* Two Tracks */}
      <Section gray>
        <div className="text-center mb-10">
          <Eyebrow>TWO TRACKS</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3">
            Built for how you run today.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-7">
            <div className="text-xs font-bold uppercase tracking-widest text-green-brand mb-3">
              Track A: Start Fresh
            </div>
            <h3 className="text-xl font-bold text-navy mb-3">No CRM yet?</h3>
            <p className="text-gray-muted leading-relaxed">
              Running on spreadsheets, paper, or nothing? We build you a complete all-in-one
              growth system.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-7">
            <div className="text-xs font-bold uppercase tracking-widest text-blue-brand mb-3">
              Track B: Add the AI Layer
            </div>
            <h3 className="text-xl font-bold text-navy mb-3">
              Already on ServiceTitan, Jobber, or HouseCall Pro?
            </h3>
            <p className="text-gray-muted leading-relaxed">
              We bolt an AI follow-up layer on top. No switching, no disruption to your team.
            </p>
          </div>
        </div>
        <div className="text-center">
          <Button href="/services" size="md">
            Explore Services &amp; Pricing
          </Button>
        </div>
      </Section>

      {/* Results / proof bar */}
      <Section dark>
        <div className="text-center mb-10">
          <Eyebrow className="text-orange-brand">OUTCOMES</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Outcomes built into the system.
          </h2>
          <p className="text-gray-400 text-sm">
            What automation like this delivers. Benchmark outcomes from comparable deployments.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { from: "55%", to: "90%", label: "Booking rate" },
            { from: "5", to: "43", label: "Booked calls (same period)" },
            { from: "", to: "+20%", label: "YoY revenue growth" },
            { from: "", to: "70%", label: "Call volume handled by AI" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 rounded-xl p-5 text-center sm:text-center">
              {stat.from && (
                <div className="text-gray-400 text-sm mb-0.5 line-through">{stat.from}</div>
              )}
              <div className="text-4xl md:text-5xl font-extrabold text-orange-brand mb-1">
                {stat.to}
              </div>
              <div className="text-gray-300 text-sm leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-500 text-xs mt-8">
          Benchmark outcomes from comparable AI automation deployments. Individual results vary.
        </p>
      </Section>

      {/* Why ChrisAlchemy */}
      <Section>
        <div className="text-center mb-10">
          <Eyebrow>WHY US</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-navy">
            We connect to the field, not just the funnel.
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
              body: "Our build team (Our Team) handles every bit of setup, integration, and testing. You touch nothing.",
            },
            {
              icon: <Bot size={32} className="text-orange-brand" />,
              title: "Fits your reality",
              body: "We don't force one solution. We match the build to whether you want to integrate or start fresh.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-gray-light rounded-xl p-7 flex flex-col gap-4"
            >
              {card.icon}
              <h3 className="font-bold text-navy text-lg">{card.title}</h3>
              <p className="text-gray-muted text-sm leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Pricing teaser */}
      <Section gray>
        <div className="text-center mb-10">
          <Eyebrow>PRICING</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3">
            Plans that pay for themselves.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} compact />
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/services"
            className="text-orange-brand font-semibold hover:underline"
          >
            Compare full plan details →
          </Link>
        </div>
      </Section>

      {/* How it works */}
      <Section>
        <div className="text-center mb-10">
          <Eyebrow>HOW IT WORKS</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-navy">
            From call to live in under a week.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { n: "1", title: "Book a demo or pick a plan", body: "Choose your path: schedule a free demo or go straight to a plan." },
            { n: "2", title: "Quick 20-min onboarding call", body: "We confirm your integrations, preferences, and go-live checklist." },
            { n: "3", title: "Our team builds + connects everything", body: "Our Team handles every setup detail. You don't touch a thing." },
            { n: "4", title: "You start recovering jobs", body: "System goes live in 5 to 7 business days. Jobs that used to slip start coming back." },
          ].map((step) => (
            <div key={step.n} className="relative">
              <div className="w-12 h-12 rounded-full bg-orange-brand text-white font-extrabold text-xl flex items-center justify-center mb-4">
                {step.n}
              </div>
              <h3 className="font-bold text-navy mb-2">{step.title}</h3>
              <p className="text-gray-muted text-sm leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ teaser */}
      <Section gray>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="text-3xl font-bold text-navy">Common questions.</h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-200 px-6">
            {faqs.slice(0, 4).map((faq) => (
              <FAQItem key={faq.q} faq={faq} />
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              href="/services#faq"
              className="text-orange-brand font-semibold hover:underline"
            >
              See all FAQs →
            </Link>
          </div>
        </div>
      </Section>

      <CTABanner />
    </>
  );
}
