import type { Metadata } from "next";
import { Suspense } from "react";
import QualifierClient from "./QualifierClient";

export const metadata: Metadata = {
  title: "See If It's a Fit: ChrisAlchemy",
  description:
    "Answer 4 quick questions and we'll show you exactly which AI automation setup fits your home-services business. Takes about 2 minutes.",
};

function QualifierSkeleton() {
  return (
    <div className="max-w-lg mx-auto px-4 py-10 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400">Step 1 of 8</span>
          <span className="text-xs text-gray-400">~2 min left</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full w-[12%] bg-orange-brand rounded-full" />
        </div>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-snug">
        What type of home-services business do you run?
      </h1>
      <p className="text-gray-400 text-sm mb-5">We&apos;ll tailor everything to your trade.</p>
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-16 rounded-xl border-2 border-white/10 bg-white/5 animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export default function QualifyPage() {
  return (
    <div className="min-h-screen bg-navy">
      <Suspense fallback={<QualifierSkeleton />}>
        <QualifierClient />
      </Suspense>
    </div>
  );
}
