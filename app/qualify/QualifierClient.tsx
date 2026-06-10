"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, Check, Loader2 } from "lucide-react";
import { TRADE_LABELS, FSM_LABELS, FSM_DESCRIPTIONS, TECH_BAND_LABELS,
         DEPTH_LABELS, PAIN_LABELS, TIMELINE_LABELS, TRACK_DESCRIPTIONS } from "@/lib/catalog";
import { NO_REPLACE_PLATFORMS } from "@/lib/fsm";
import { getAttribution } from "@/lib/attribution";
import { track } from "@/lib/analytics";

// ── Types ──────────────────────────────────────────────────────────────────

type StepId = "trade" | "platform" | "techcount" | "depth" | "pain" |
              "details" | "business" | "contact";

interface Answers {
  trade: string;
  fsmPlatform: string;
  techCount: string;
  platformDepth: string;
  primaryPain: string[];
  painNotes: string;
  avgJobTicket: string;
  timelineToStart: string;
  businessName: string;
  city: string;
  usState: string;
  fullName: string;
  email: string;
  phone: string;
  website: string;
  consentSms: boolean;
  consentEmail: boolean;
}

interface ProvisionalFit {
  salesTrack: string;
  leadTemperature: string;
  pitchAngle: string;
  recommendedTier: string;
}

const SESSION_KEY = "ca_qualifier";

const defaultAnswers: Answers = {
  trade: "", fsmPlatform: "", techCount: "", platformDepth: "",
  primaryPain: [], painNotes: "", avgJobTicket: "",
  timelineToStart: "", businessName: "", city: "", usState: "",
  fullName: "", email: "", phone: "", website: "",
  consentSms: false, consentEmail: false,
};

// ── Step sequence (depth skipped for no-platform) ─────────────────────────

function getSteps(fsmPlatform: string): StepId[] {
  const base: StepId[] = ["trade", "platform", "techcount"];
  if (fsmPlatform && fsmPlatform !== "none") base.push("depth");
  base.push("pain", "details", "business", "contact");
  return base;
}

// ── Chip component ─────────────────────────────────────────────────────────

function Chip({
  label, sublabel, selected, multi, onClick,
}: {
  label: string; sublabel?: string; selected: boolean; multi?: boolean; onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full text-left rounded-xl border-2 px-4 py-3 transition-all focus-visible:outline-2 focus-visible:outline-orange-brand ${
        selected
          ? "border-orange-brand bg-orange-brand/10 text-white"
          : "border-white/20 bg-white/5 text-gray-300 hover:border-white/50 hover:bg-white/10"
      }`}
      aria-pressed={selected}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            selected ? "border-orange-brand bg-orange-brand" : "border-white/30"
          }`}
          aria-hidden
        >
          {selected && <Check size={10} className="text-white" strokeWidth={3} />}
        </span>
        <span>
          <span className="font-semibold text-sm block">{label}</span>
          {sublabel && <span className="text-xs text-gray-400 block mt-0.5">{sublabel}</span>}
        </span>
      </div>
      {multi && <span className="sr-only">Multi-select</span>}
    </button>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export default function QualifierClient() {
  const params    = useSearchParams();
  const router    = useRouter();

  // Pre-fill from URL (e.g. /qualify?trade=hvac&platform=jobber)
  const initTrade    = params.get("trade")    ?? "";
  const initPlatform = params.get("platform") ?? "";

  const [answers, setAnswers] = useState<Answers>(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) {
        try { return JSON.parse(saved) as Answers; } catch { /* ignore */ }
      }
    }
    return { ...defaultAnswers, trade: initTrade, fsmPlatform: initPlatform };
  });

  const [stepIndex, setStepIndex] = useState(0);
  const [fit, setFit]             = useState<ProvisionalFit | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]         = useState("");

  const steps = getSteps(answers.fsmPlatform);
  const currentStep = steps[stepIndex];
  const totalSteps  = steps.length;
  const progress    = Math.round(((stepIndex + 1) / totalSteps) * 100);

  // Persist to sessionStorage on every change
  useEffect(() => {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    track({ event: "qualifier_start" });
  }, []);

  // Fetch provisional fit after pain step
  const fetchFit = useCallback(async (a: Answers) => {
    try {
      const res = await fetch("/api/lead/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fsmPlatform: a.fsmPlatform,
          techCount: a.techCount,
          platformDepth: a.platformDepth || undefined,
          primaryPain: a.primaryPain,
          source: "direct",
        }),
      });
      if (res.ok) {
        const data = await res.json() as ProvisionalFit;
        setFit(data);
      }
    } catch { /* non-fatal */ }
  }, []);

  function set<K extends keyof Answers>(key: K, value: Answers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function togglePain(pain: string) {
    setAnswers((prev) => {
      const next = prev.primaryPain.includes(pain)
        ? prev.primaryPain.filter((p) => p !== pain)
        : [...prev.primaryPain, pain];
      return { ...prev, primaryPain: next };
    });
  }

  function canAdvance(): boolean {
    switch (currentStep) {
      case "trade":     return !!answers.trade;
      case "platform":  return !!answers.fsmPlatform;
      case "techcount": return !!answers.techCount;
      case "depth":     return !!answers.platformDepth;
      case "pain":      return answers.primaryPain.length > 0;
      case "details":   return true; // optional
      case "business":  return !!answers.businessName;
      case "contact":   return !!(answers.fullName && answers.email && answers.consentSms);
      default:          return false;
    }
  }

  async function advance() {
    track({ event: "qualifier_step_complete", step: stepIndex, field: currentStep });

    if (currentStep === "pain") {
      await fetchFit(answers);
    }

    if (stepIndex < totalSteps - 1) {
      setStepIndex((i) => i + 1);
    } else {
      await submit();
    }
  }

  function back() {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  }

  async function submit() {
    setSubmitting(true);
    setError("");
    const attribution = getAttribution();
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName:        answers.fullName,
          email:           answers.email,
          phone:           answers.phone || undefined,
          businessName:    answers.businessName,
          website:         answers.website || undefined,
          city:            answers.city || undefined,
          state:           answers.usState || undefined,
          trade:           answers.trade || undefined,
          fsmPlatform:     answers.fsmPlatform,
          techCount:       answers.techCount,
          platformDepth:   answers.platformDepth || undefined,
          primaryPain:     answers.primaryPain,
          painNotes:       answers.painNotes || undefined,
          avgJobTicket:    answers.avgJobTicket ? Number(answers.avgJobTicket) : undefined,
          timelineToStart: answers.timelineToStart || undefined,
          consentSms:      answers.consentSms,
          consentEmail:    answers.consentEmail,
          consentText:     "I agree to receive calls/texts/emails from ChrisAlchemy about my request.",
          ...attribution,
        }),
      });

      if (!res.ok) throw new Error("Submission failed");

      const data = await res.json() as {
        leadId: string; salesTrack: string; leadTemperature: string;
        pitchAngle: string; bookingUrl?: string;
      };

      track({ event: "lead_created", leadId: data.leadId, track: data.salesTrack,
              temperature: data.leadTemperature, score: 0 });

      sessionStorage.removeItem(SESSION_KEY);

      const query = new URLSearchParams({
        track: data.salesTrack,
        temp:  data.leadTemperature,
        pitch: data.pitchAngle,
        platform: answers.fsmPlatform,
        name: answers.fullName.split(" ")[0],
      });
      if (data.bookingUrl) query.set("bookingUrl", data.bookingUrl);

      router.push(`/qualify/thank-you?${query.toString()}`);
    } catch {
      setError("Something went wrong — please try again.");
      setSubmitting(false);
    }
  }

  // ── Render helpers ────────────────────────────────────────────────────────

  const noReplacePlatform = NO_REPLACE_PLATFORMS.includes(
    answers.fsmPlatform as typeof NO_REPLACE_PLATFORMS[number],
  );

  return (
    <div className="max-w-lg mx-auto px-4 py-10 min-h-screen flex flex-col">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400">
            Step {stepIndex + 1} of {totalSteps}
          </span>
          <span className="text-xs text-gray-400">
            ~{Math.max(1, Math.round(((totalSteps - stepIndex) * 15) / 60))} min left
          </span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-brand rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1">
        {currentStep === "trade" && (
          <Step
            heading="What type of home-services business do you run?"
            sub="We'll tailor everything to your trade."
          >
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(TRADE_LABELS).map(([k, v]) => (
                <Chip key={k} label={v} selected={answers.trade === k}
                      onClick={() => set("trade", k)} />
              ))}
            </div>
          </Step>
        )}

        {currentStep === "platform" && (
          <Step
            heading="What software are you running the business on today?"
            sub="This decides the whole approach."
          >
            <div className="space-y-3">
              {Object.entries(FSM_LABELS).map(([k, v]) => (
                <Chip key={k} label={v}
                      sublabel={FSM_DESCRIPTIONS[k]}
                      selected={answers.fsmPlatform === k}
                      onClick={() => set("fsmPlatform", k)} />
              ))}
            </div>
            {/* Pre-handle top objection for ST users */}
            {answers.fsmPlatform === "servicetitan" && (
              <p className="mt-4 text-xs text-orange-brand/80 bg-orange-brand/10 rounded-lg px-4 py-2">
                Your techs never touch anything new — we add on top of ServiceTitan, nothing changes for them.
              </p>
            )}
          </Step>
        )}

        {currentStep === "techcount" && (
          <Step heading="How many techs do you have on the road?" sub="">
            <div className="space-y-3">
              {Object.entries(TECH_BAND_LABELS).map(([k, v]) => (
                <Chip key={k} label={v} selected={answers.techCount === k}
                      onClick={() => set("techCount", k)} />
              ))}
            </div>
          </Step>
        )}

        {currentStep === "depth" && (
          <Step
            heading={`How deeply are you using ${FSM_LABELS[answers.fsmPlatform] ?? "it"}?`}
            sub="Honest answer helps us map the right build."
          >
            <div className="space-y-3">
              {Object.entries(DEPTH_LABELS).map(([k, v]) => (
                <Chip key={k} label={v} selected={answers.platformDepth === k}
                      onClick={() => set("platformDepth", k)} />
              ))}
            </div>
            {noReplacePlatform && (
              <p className="mt-4 text-xs text-orange-brand/80 bg-orange-brand/10 rounded-lg px-4 py-2">
                Your techs keep working exactly as they do — we add the AI layer on top.
              </p>
            )}
          </Step>
        )}

        {currentStep === "pain" && (
          <Step
            heading="What's falling through the cracks right now?"
            sub="Select everything that applies. The more you pick, the more we can fix."
            multi
          >
            <div className="space-y-2.5">
              {Object.entries(PAIN_LABELS).map(([k, v]) => (
                <Chip key={k} label={v} selected={answers.primaryPain.includes(k)}
                      multi onClick={() => togglePain(k)} />
              ))}
            </div>
          </Step>
        )}

        {currentStep === "details" && (
          <Step
            heading="Tell us a bit more — even a sentence helps."
            sub="Optional but useful. The more context, the more personalized the call."
          >
            {/* Provisional fit card */}
            {fit && fit.salesTrack !== "disqualify" && (
              <div className="bg-orange-brand/10 border border-orange-brand/30 rounded-xl p-4 mb-5">
                <p className="text-orange-brand text-xs font-bold uppercase tracking-wide mb-1">
                  Preliminary fit
                </p>
                <p className="text-white text-sm font-semibold mb-1">{fit.pitchAngle}</p>
                <p className="text-gray-400 text-xs">
                  {TRACK_DESCRIPTIONS[fit.salesTrack] ?? "We'll map the exact build on the call."}
                </p>
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-300 block mb-1.5">
                  What does the leak look like for you? (optional)
                </label>
                <textarea
                  value={answers.painNotes}
                  onChange={(e) => set("painNotes", e.target.value)}
                  rows={4}
                  placeholder="e.g. We miss calls after 5pm and our quotes just go silent…"
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white text-base placeholder-gray-500 focus:outline-none focus:border-orange-brand resize-none"
                />
              </div>
              <div>
                <label className="text-sm text-gray-300 block mb-1.5">
                  Average job ticket value (optional)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                  <input
                    type="number"
                    value={answers.avgJobTicket}
                    onChange={(e) => set("avgJobTicket", e.target.value)}
                    placeholder="850"
                    className="w-full bg-white/5 border border-white/20 rounded-xl pl-8 pr-4 py-3 text-white text-base placeholder-gray-500 focus:outline-none focus:border-orange-brand"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Helps us show you the ROI math — most owners recover 3–5 jobs/month.
                </p>
              </div>
            </div>
          </Step>
        )}

        {currentStep === "business" && (
          <Step heading="Tell us about your business." sub="">
            <div className="space-y-4">
              <Field label="Business name *">
                <input value={answers.businessName}
                  onChange={(e) => set("businessName", e.target.value)}
                  placeholder="Martinez HVAC" className={inputClass} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="City">
                  <input value={answers.city}
                    onChange={(e) => set("city", e.target.value)}
                    placeholder="Mesa" className={inputClass} />
                </Field>
                <Field label="State">
                  <input value={answers.usState}
                    onChange={(e) => set("usState", e.target.value)}
                    placeholder="AZ" className={inputClass} />
                </Field>
              </div>
              <div>
                <p className="text-sm text-gray-300 mb-2">When are you looking to start?</p>
                <div className="space-y-2">
                  {Object.entries(TIMELINE_LABELS).map(([k, v]) => (
                    <Chip key={k} label={v} selected={answers.timelineToStart === k}
                          onClick={() => set("timelineToStart", k)} />
                  ))}
                </div>
              </div>
            </div>
          </Step>
        )}

        {currentStep === "contact" && (
          <Step
            heading="Last step — where should we send your breakdown?"
            sub="We'll send a custom build plan based on everything you've told us."
          >
            <div className="space-y-4">
              <Field label="Full name *">
                <input value={answers.fullName}
                  onChange={(e) => set("fullName", e.target.value)}
                  placeholder="George Martinez" className={inputClass} />
              </Field>
              <Field label="Email *">
                <input type="email" value={answers.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="george@yourbiz.com" className={inputClass} />
              </Field>
              <Field label="Phone (for priority follow-up)">
                <input type="tel" value={answers.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="(555) 000-0000" className={inputClass} />
              </Field>
              <Field label="Website (optional)">
                <input type="url" value={answers.website}
                  onChange={(e) => set("website", e.target.value)}
                  placeholder="https://yourbiz.com" className={inputClass} />
              </Field>

              {/* Consent */}
              <div className="space-y-3 pt-2 border-t border-white/10">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={answers.consentSms}
                    onChange={(e) => set("consentSms", e.target.checked)}
                    className="mt-1 accent-orange-brand w-4 h-4 shrink-0" />
                  <span className="text-xs text-gray-400 leading-relaxed">
                    <strong className="text-white">Yes</strong> — I agree to receive calls and texts
                    from ChrisAlchemy Consulting about my inquiry. I understand I can opt out at any time. *
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={answers.consentEmail}
                    onChange={(e) => set("consentEmail", e.target.checked)}
                    className="mt-1 accent-orange-brand w-4 h-4 shrink-0" />
                  <span className="text-xs text-gray-400 leading-relaxed">
                    Send me the breakdown and any follow-up by email.
                  </span>
                </label>
              </div>
            </div>
          </Step>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-8 space-y-3">
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <button
          type="button"
          onClick={advance}
          disabled={!canAdvance() || submitting}
          className="w-full bg-orange-brand text-white font-bold py-4 rounded-xl text-lg hover:bg-orange-brand-hover transition-colors disabled:opacity-40"
        >
          {submitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 size={20} className="animate-spin" /> Submitting…
            </span>
          ) : stepIndex < totalSteps - 1 ? (
            "Continue →"
          ) : (
            "See My Build Plan →"
          )}
        </button>

        {stepIndex > 0 && (
          <button type="button" onClick={back}
            className="w-full flex items-center justify-center gap-1 text-gray-400 hover:text-white text-sm py-2 transition-colors">
            <ChevronLeft size={16} /> Back
          </button>
        )}
      </div>

      <p className="text-center text-gray-600 text-xs mt-4">
        No pressure · No spam · Unsubscribe any time
      </p>
    </div>
  );
}

// ── Small sub-components ───────────────────────────────────────────────────

function Step({
  heading, sub, multi, children,
}: {
  heading: string; sub: string; multi?: boolean; children: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-snug">
        {heading}
      </h1>
      {sub && <p className="text-gray-400 text-sm mb-5">{sub}</p>}
      {multi && <p className="text-orange-brand text-xs mb-3 font-semibold">Select all that apply</p>}
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm text-gray-300 block mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white text-base placeholder-gray-500 focus:outline-none focus:border-orange-brand";
