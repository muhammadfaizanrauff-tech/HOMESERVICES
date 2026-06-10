import type { Metadata } from "next";
import { Suspense } from "react";
import QualifierClient from "./QualifierClient";

export const metadata: Metadata = {
  title: "See If It's a Fit: ChrisAlchemy",
  description:
    "Answer 4 quick questions and we'll show you exactly which AI automation setup fits your home-services business. Takes about 2 minutes.",
};

export default function QualifyPage() {
  return (
    <div className="min-h-screen bg-navy">
      <Suspense fallback={<div className="text-white text-center pt-32">Loading…</div>}>
        <QualifierClient />
      </Suspense>
    </div>
  );
}
