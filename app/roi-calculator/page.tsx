import type { Metadata } from "next";
import Section, { Eyebrow } from "@/components/Section";
import CTABanner from "@/components/CTABanner";
import RoiCalculatorClient from "./RoiCalculatorClient";

export const metadata: Metadata = {
  title: "ROI Calculator",
  description:
    "See how much revenue is walking out the door every month from missed calls and unanswered leads. Takes 10 seconds.",
};

export default function RoiCalculatorPage() {
  return (
    <>
      <section className="bg-navy py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Eyebrow className="justify-center">ROI CALCULATOR</Eyebrow>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 max-w-2xl mx-auto">
            How much are missed calls costing you every month?
          </h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            Move the sliders below. Takes 10 seconds, no email required.
          </p>
        </div>
      </section>

      <Section>
        <RoiCalculatorClient />
      </Section>

      <CTABanner />
    </>
  );
}
