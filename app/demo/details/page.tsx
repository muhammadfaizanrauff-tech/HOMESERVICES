import type { Metadata } from "next";
import DemoDetailsForm from "./DemoDetailsForm";
import { Eyebrow } from "@/components/Section";

export const metadata: Metadata = {
  title: "Demo Details — Tell Us About Your Business",
  description: "A few quick details so we can tailor your ChrisAlchemy demo.",
};

export default function DemoDetailsPage() {
  return (
    <div className="bg-gray-light min-h-screen py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Eyebrow>Step 2 of 2 — Tell us about your business</Eyebrow>
          <h1 className="text-3xl md:text-4xl font-extrabold text-navy mb-3">
            A few quick details before your demo.
          </h1>
          <p className="text-gray-muted">
            This helps us tailor the demo to exactly what you need.
          </p>
        </div>
        <DemoDetailsForm />
      </div>
    </div>
  );
}
