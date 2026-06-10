import type { Metadata } from "next";
import Link from "next/link";
import { Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Demo Booked!",
  description: "Your ChrisAlchemy demo is confirmed. Here's what to expect.",
};

export default function DemoThankYouPage() {
  return (
    <div className="bg-gray-light min-h-screen py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Calendar size={64} className="text-orange-brand mx-auto mb-6" />

        <h1 className="text-4xl font-extrabold text-navy mb-4">
          Your demo is booked.
        </h1>

        <p className="text-gray-muted text-lg mb-10">
          We&apos;re looking forward to showing you how ChrisAlchemy can capture more of
          your leads. Here&apos;s what&apos;s next:
        </p>

        <ol className="text-left space-y-4 mb-10">
          {[
            "You'll get a calendar invite and confirmation email.",
            "We'll review your details so the demo is tailored to your business.",
            "On the call we'll show the system live and map out exactly what we'd build for you.",
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
            href="/services"
            className="bg-orange-brand text-white font-semibold px-6 py-3 rounded-xl hover:bg-orange-brand-hover transition-colors"
          >
            Explore Plans while you wait
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
