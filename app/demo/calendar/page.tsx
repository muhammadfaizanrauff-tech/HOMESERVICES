import type { Metadata } from "next";
import CalendarEmbed from "./CalendarEmbed";
import { Eyebrow } from "@/components/Section";

export const metadata: Metadata = {
  title: "Book a Free Demo",
  description:
    "See the ChrisAlchemy AI automation system live. Book your free 20-minute demo and get a build plan for your home services business.",
};

export default function DemoCalendarPage() {
  return (
    <div className="bg-gray-light min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Eyebrow>FREE DEMO CALL</Eyebrow>
          <h1 className="text-3xl md:text-4xl font-extrabold text-navy mb-3">
            Book your free demo.
          </h1>
          <p className="text-gray-muted max-w-xl mx-auto">
            See the system live and get a build plan tailored to your business. Takes about 20
            minutes.
          </p>
        </div>

        <CalendarEmbed />

        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-muted mt-4">
          {[
            "No pressure",
            "20 minutes",
            "Walk away with a build plan even if you don't buy",
          ].map((item) => (
            <span key={item} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-brand inline-block" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
