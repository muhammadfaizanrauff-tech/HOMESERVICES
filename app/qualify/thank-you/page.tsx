import type { Metadata } from "next";
import { Suspense } from "react";
import ThankYouClient from "./ThankYouClient";

export const metadata: Metadata = {
  title: "Your Build Plan Is Ready — ChrisAlchemy",
  description: "Based on your answers, here's exactly what we'd set up for your business.",
};

export default function QualifyThankYouPage() {
  return (
    <div className="min-h-screen bg-navy">
      <Suspense fallback={<div className="text-white text-center pt-32">Loading…</div>}>
        <ThankYouClient />
      </Suspense>
    </div>
  );
}
