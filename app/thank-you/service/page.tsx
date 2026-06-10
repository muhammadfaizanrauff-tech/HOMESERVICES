import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Welcome to ChrisAlchemy!",
  description: "Your ChrisAlchemy plan is confirmed. Here's what happens next.",
};

export default function ServiceThankYouPage() {
  return (
    <div className="bg-gray-light min-h-screen py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <CheckCircle size={64} className="text-green-brand mx-auto mb-6" />

        <h1 className="text-4xl font-extrabold text-navy mb-4">
          You&apos;re in. Welcome to ChrisAlchemy.
        </h1>

        <p className="text-gray-muted text-lg mb-10">
          Your plan is confirmed. Here&apos;s what happens next:
        </p>

        <ol className="text-left space-y-4 mb-10">
          {[
            "Check your email for your receipt and welcome message.",
            "We'll reach out within one business day to schedule your 20-minute onboarding call.",
            "Our build team configures and connects everything.",
            "Your system goes live within 5 to 7 business days.",
          ].map((step, i) => (
            <li key={step} className="flex items-start gap-4 bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-4">
              <span className="w-8 h-8 rounded-full bg-orange-brand text-white font-bold text-sm flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <span className="text-gray-body">{step}</span>
            </li>
          ))}
        </ol>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/demo/calendar"
            className="bg-orange-brand text-white font-semibold px-6 py-3 rounded-xl hover:bg-orange-brand-hover transition-colors"
          >
            Book your onboarding call now
          </Link>
          <Link
            href="/"
            className="border-2 border-navy text-navy font-semibold px-6 py-3 rounded-xl hover:bg-navy hover:text-white transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
