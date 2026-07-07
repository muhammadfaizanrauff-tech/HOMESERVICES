import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Phone, FileText, Users, Zap, Clock, Star, TrendingUp, Bot,
  Wind, Droplets, Home as HomeIcon, Leaf, Bug, Sun, DoorClosed, Trash2,
  CalendarCheck, Headphones, Cable, PhoneCall,
} from "lucide-react";
import Section, { Eyebrow } from "@/components/Section";
import Button from "@/components/Button";
import CTABanner from "@/components/CTABanner";
import PricingCard from "@/components/PricingCard";
import FAQItem from "@/components/FAQItem";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import AudioPlaceholder from "@/components/AudioPlaceholder";
import { plans } from "@/content/plans";
import { faqs } from "@/content/faqs";
import { integrations } from "@/content/integrations";
import { caseStudies } from "@/content/case-studies";
import { TRADE_LABELS } from "@/lib/catalog";

const NICHES = [
  { label: "HVAC",         slug: "hvac",         icon: Wind },
  { label: "Plumbing",     slug: "plumbing",     icon: Droplets },
  { label: "Electrical",   slug: "electrical",   icon: Zap },
  { label: "Roofing",      slug: "roofing",      icon: HomeIcon },
  { label: "Landscaping",  slug: "landscaping",  icon: Leaf },
  { label: "Pest Control", slug: "pest_control", icon: Bug },
  { label: "Solar",        slug: "solar",        icon: Sun },
  { label: "Garage Doors", slug: "garage_doors", icon: DoorClosed },
  { label: "Junk Removal", slug: "junk_removal", icon: Trash2 },
];

const HOW_IT_WORKS_STEPS = [
  { n: "1", icon: CalendarCheck, title: "Book a demo or pick a plan", body: "Choose your path: schedule a free demo or go straight to a plan." },
  { n: "2", icon: Headphones,    title: "Quick 20-min onboarding call", body: "We confirm your integrations, preferences, and go-live checklist." },
  { n: "3", icon: Cable,         title: "Our team builds + connects everything", body: "Our Team handles every setup detail. You don't touch a thing." },
  { n: "4", icon: PhoneCall,     title: "You start recovering jobs", body: "System goes live in 5 to 7 business days. Jobs that used to slip start coming back." },
];

const TESTIMONIALS = caseStudies
  .filter((c) => ["hvac-texas", "plumbing-arizona", "roofing-oklahoma"].includes(c.slug))
  .map((c) => ({
    quote: c.quote.text,
    author: c.quote.author,
    trade: TRADE_LABELS[c.trade] ?? c.trade,
    city: c.city,
  }));

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              The AI follow-up layer for home-services companies that are done losing jobs to voicemail.
            </h1>
            <p className="text-gray-300 text-base md:text-xl mb-8 leading-relaxed">
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
          <div className="relative w-full rounded-xl overflow-hidden border border-white/20" style={{ aspectRatio: "4/3" }}>
            <Image
              src="/images/hero-tech.jpg"
              alt="Field technician servicing an HVAC unit on site"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Integration marquee */}
      <section className="bg-white py-8 border-b border-gray-200 overflow-hidden">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-muted mb-5">
          Connects with the tools you already run
        </p>
        <div className="flex overflow-hidden">
          <div className="flex gap-4 animate-marquee shrink-0">
            {[...integrations, ...integrations].map((i, idx) => (
              <div
                key={`${i.slug}-${idx}`}
                className="shrink-0 bg-gray-light border border-gray-200 rounded-xl px-5 py-2.5 font-semibold text-navy text-sm whitespace-nowrap"
              >
                {i.name}
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-5">
          <Link href="/integrations" className="text-orange-brand font-semibold text-sm hover:underline">
            See all 24 integrations →
          </Link>
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
              image: "/images/pain-missed-calls.jpg",
              alt: "Out-of-order emergency call box, a missed connection",
            },
            {
              icon: <FileText size={28} className="text-orange-brand" />,
              title: "Cold quotes",
              body: "You send an estimate and never follow up. It goes silent.",
              image: "/images/pain-cold-quotes.jpg",
              alt: "Sticky notes reading invoice and pay invoices",
            },
            {
              icon: <Users size={28} className="text-orange-brand" />,
              title: "Forgotten customers",
              body: "Past customers go quiet for months and never rebook.",
              image: "/images/pain-forgotten-customers.jpg",
              alt: "Outdoor AC unit overdue for service",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center flex flex-col"
            >
              <div className="relative w-full rounded-xl overflow-hidden mb-4" style={{ aspectRatio: "4/3" }}>
                <Image src={item.image} alt={item.alt} fill className="object-cover" />
              </div>
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
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-7 flex flex-col">
            <div className="text-xs font-bold uppercase tracking-widest text-green-brand mb-3">
              Track A: Start Fresh
            </div>
            <h3 className="text-xl font-bold text-navy mb-3">No CRM yet?</h3>
            <p className="text-gray-muted leading-relaxed mb-5">
              Running on spreadsheets, paper, or nothing? We build you a complete all-in-one
              growth system.
            </p>
            <div className="relative w-full rounded-xl overflow-hidden mt-auto" style={{ aspectRatio: "16/9" }}>
              <Image
                src="/images/track-a-messy-desk.jpg"
                alt="Desk covered in sticky notes and paperwork"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-7 flex flex-col">
            <div className="text-xs font-bold uppercase tracking-widest text-blue-brand mb-3">
              Track B: Add the AI Layer
            </div>
            <h3 className="text-xl font-bold text-navy mb-3">
              Already on ServiceTitan, Jobber, or HouseCall Pro?
            </h3>
            <p className="text-gray-muted leading-relaxed mb-5">
              We bolt an AI follow-up layer on top. No switching, no disruption to your team.
            </p>
            <div className="relative w-full rounded-xl overflow-hidden mt-auto" style={{ aspectRatio: "16/9" }}>
              <Image
                src="/images/track-b-dashboard.jpg"
                alt="Laptop displaying a business dashboard"
                fill
                className="object-cover"
              />
            </div>
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
            <div key={stat.label} className="bg-white/5 rounded-xl p-5 text-center flex flex-col items-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                {stat.from && (
                  <span className="text-gray-400 text-sm line-through">{stat.from}</span>
                )}
                {stat.from && <TrendingUp size={14} className="text-green-brand" />}
                <span className="text-4xl md:text-5xl font-extrabold text-orange-brand">
                  {stat.to}
                </span>
              </div>
              <div className="text-gray-300 text-sm leading-snug">
                {stat.label}
                {stat.from && (
                  <span className="block text-gray-500 text-xs mt-0.5">
                    Before {stat.from} → After {stat.to}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-500 text-xs mt-8">
          Benchmark outcomes from comparable AI automation deployments. Individual results vary.
        </p>
      </Section>

      {/* Testimonials */}
      <Section>
        <div className="text-center mb-10">
          <Eyebrow>WHAT OWNERS SAY</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-navy">
            Real trades. Real outcomes.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.author} className="bg-gray-light rounded-xl p-6 flex flex-col items-center text-center">
              <div className="w-20 h-20 mb-4">
                <ImagePlaceholder label={`headshot — ${t.trade}, ${t.city}`} ratio="1/1" />
              </div>
              <p className="text-gray-body text-sm leading-relaxed italic mb-4">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="text-navy font-bold text-sm">{t.author}</p>
              <p className="text-gray-muted text-xs">{t.trade} · {t.city}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/results" className="text-orange-brand font-semibold hover:underline">
            See all case studies →
          </Link>
        </div>
      </Section>

      {/* Meet the AI Voice Agent */}
      <Section dark>
        <div className="max-w-3xl mx-auto text-center">
          <Eyebrow className="text-orange-brand">MEET THE AI VOICE AGENT</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Hear it answer a real call.
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            The AI voice agent answers every inbound call, handles FAQs, and books
            directly into your calendar, 24/7. Here&apos;s a sample from a live deployment.
          </p>
          <AudioPlaceholder label="Sample AI call recording — inbound HVAC lead, booked in under 90 seconds" />
        </div>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 items-stretch">
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

        {/* Mobile: vertical timeline */}
        <div className="md:hidden">
          {HOW_IT_WORKS_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.n} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-orange-brand text-white font-extrabold text-xl flex items-center justify-center shrink-0">
                    {step.n}
                  </div>
                  {idx < HOW_IT_WORKS_STEPS.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gray-200 my-1" />
                  )}
                </div>
                <div className="pb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={16} className="text-orange-brand" />
                    <h3 className="font-bold text-navy">{step.title}</h3>
                  </div>
                  <p className="text-gray-muted text-sm leading-relaxed">{step.body}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block relative">
          <div className="absolute top-6 h-0.5 bg-gray-200" style={{ left: "12.5%", right: "12.5%" }} />
          <div className="grid grid-cols-4 gap-6 relative">
            {HOW_IT_WORKS_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.n} className="relative z-10 bg-white">
                  <div className="w-12 h-12 rounded-full bg-orange-brand text-white font-extrabold text-xl flex items-center justify-center mb-4 ring-4 ring-white">
                    {step.n}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={16} className="text-orange-brand" />
                    <h3 className="font-bold text-navy">{step.title}</h3>
                  </div>
                  <p className="text-gray-muted text-sm leading-relaxed">{step.body}</p>
                </div>
              );
            })}
          </div>
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
