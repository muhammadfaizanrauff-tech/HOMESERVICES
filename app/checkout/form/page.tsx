import type { Metadata } from "next";
import { Suspense } from "react";
import { plans } from "@/content/plans";
import CheckoutFormClient from "./CheckoutFormClient";

export const metadata: Metadata = {
  title: "Get Started — Select Your Plan",
  description: "Start your ChrisAlchemy plan setup. Complete your details to activate AI automation for your home services business.",
};

export default function CheckoutFormPage() {
  return (
    <div className="bg-gray-light min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-orange-brand mb-2">
            Step 1 of 2 — Your Details
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-navy">
            Get started with ChrisAlchemy.
          </h1>
          <p className="text-gray-muted mt-2 text-sm">
            Secure checkout · Setup begins after a quick 20-min onboarding call · Live in 5–7 business days
          </p>
        </div>
        <Suspense fallback={<div className="text-center text-gray-muted py-12">Loading…</div>}>
          <CheckoutFormClient plans={plans} />
        </Suspense>
      </div>
    </div>
  );
}
