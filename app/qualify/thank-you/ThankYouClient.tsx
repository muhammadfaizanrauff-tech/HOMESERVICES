"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Calendar, Mail, ArrowRight } from "lucide-react";
import { TRACK_LABELS, TRACK_DESCRIPTIONS, FSM_LABELS } from "@/lib/catalog";
import { track } from "@/lib/analytics";
import { useEffect } from "react";

export default function ThankYouClient() {
  const params   = useSearchParams();
  const salesTrack = params.get("track") ?? "B_integrate";
  const temp     = params.get("temp") ?? "warm";
  const pitch    = params.get("pitch") ?? "";
  const platform = params.get("platform") ?? "";
  const firstName = params.get("name") ?? "there";
  const bookingUrl = params.get("bookingUrl") ?? process.env.NEXT_PUBLIC_GHL_CALENDAR_URL ?? "";

  const isHot  = temp === "hot";
  const isWarm = temp === "warm";
  const isCold = temp === "cold";
  const isSkip = temp === "skip" || salesTrack === "disqualify";

  useEffect(() => {
    if (salesTrack === "disqualify") {
      track({ event: "disqualified", reason: "low_intent_or_st_replace" });
    } else {
      track({ event: "fit_result_shown", track: salesTrack, temperature: temp });
      if (isHot || isWarm) {
        track({ event: "booking_shown", track: salesTrack });
      }
    }
  }, [salesTrack, temp, isHot, isWarm]);

  if (isSkip) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-6">🤝</div>
        <h1 className="text-2xl font-bold text-white mb-4">
          We may not be the right fit right now, but you shouldn&apos;t leave empty-handed.
        </h1>
        <p className="text-gray-400 mb-8">
          We&apos;ll send you a free resource on what top home-services operators are doing to
          capture more leads. No automation required.
        </p>
        <Link href="/" className="text-orange-brand hover:underline text-sm">
          ← Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <CheckCircle size={56} className="text-orange-brand mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-white mb-3">
          {firstName ? `Got it, ${firstName}.` : "Got it."} Here&apos;s your build plan.
        </h1>
        <p className="text-gray-400 text-base leading-relaxed">
          Based on your answers, here&apos;s exactly what we&apos;d set up for you:
        </p>
      </div>

      {/* Pitch angle card */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <span className="bg-orange-brand text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shrink-0">
            {TRACK_LABELS[salesTrack] ?? salesTrack}
          </span>
          {platform && (
            <span className="text-gray-400 text-sm mt-1">
              for {FSM_LABELS[platform] ?? platform} users
            </span>
          )}
        </div>
        <p className="text-white font-semibold text-lg mb-2">{pitch || TRACK_LABELS[salesTrack]}</p>
        <p className="text-gray-400 text-sm leading-relaxed">
          {TRACK_DESCRIPTIONS[salesTrack]}
        </p>
      </div>

      {/* Next steps by temperature */}
      {(isHot || isWarm) && (
        <div className="mb-6">
          <h2 className="text-white font-bold text-lg mb-4">
            {isHot
              ? "We're ready to move. Grab a time and we'll map it all out."
              : "Book a free 20-minute call. We'll walk through exactly what we'd build."}
          </h2>

          {bookingUrl ? (
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-orange-brand text-white font-bold py-4 px-6 rounded-xl hover:bg-orange-brand-hover transition-colors text-lg mb-3"
            >
              <Calendar size={20} /> Book My Free Demo Call
            </a>
          ) : (
            <Link
              href="/demo/calendar"
              className="w-full flex items-center justify-center gap-2 bg-orange-brand text-white font-bold py-4 px-6 rounded-xl hover:bg-orange-brand-hover transition-colors text-lg mb-3"
            >
              <Calendar size={20} /> Book My Free Demo Call
            </Link>
          )}

          <ul className="space-y-2 text-sm text-gray-400">
            {[
              "A breakdown is heading to your inbox now.",
              "The call is 20 minutes. No pitch, just a plan.",
              "You'll leave knowing exactly what we'd build and what it costs.",
            ].map((s) => (
              <li key={s} className="flex items-start gap-2">
                <span className="text-orange-brand mt-0.5">✓</span> {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {isCold && (
        <div className="mb-6 bg-white/5 border border-white/10 rounded-2xl p-5">
          <div className="flex items-start gap-3 mb-3">
            <Mail size={20} className="text-orange-brand shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-semibold mb-1">Breakdown is on its way.</p>
              <p className="text-gray-400 text-sm">
                We&apos;ll send a couple of examples and the exact setup we&apos;d build for your
                situation. Keep an eye on your inbox.
              </p>
            </div>
          </div>
          <Link
            href="/demo/calendar"
            className="inline-flex items-center gap-2 text-orange-brand text-sm font-semibold hover:underline"
          >
            Want to talk sooner? Book a quick call <ArrowRight size={14} />
          </Link>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/services"
          className="flex-1 text-center border border-white/20 text-white font-semibold py-3 rounded-xl hover:bg-white/5 transition-colors text-sm">
          Explore Plans
        </Link>
        <Link href="/"
          className="flex-1 text-center text-gray-400 hover:text-white font-semibold py-3 rounded-xl text-sm transition-colors">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
