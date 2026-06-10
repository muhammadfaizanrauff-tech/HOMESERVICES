import Button from "./Button";

export default function CTABanner() {
  return (
    <section className="bg-navy py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to stop losing jobs?
        </h2>
        <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
          An AI follow-up system built for the trades. Done for you. Live in 5–7
          days.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/services" size="lg">
            View Plans
          </Button>
          <Button
            href="/demo/calendar"
            variant="secondary"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-navy"
          >
            Book a Free Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
