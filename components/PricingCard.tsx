import Link from "next/link";
import { Check } from "lucide-react";
import type { Plan } from "@/content/plans";

type PricingCardProps = {
  plan: Plan;
  compact?: boolean;
};

const tierBg: Record<string, string> = {
  CORE: "bg-green-brand",
  GROWTH: "bg-blue-brand",
  PREMIUM: "bg-purple-brand",
};

export default function PricingCard({ plan, compact = false }: PricingCardProps) {
  return (
    <div
      className={`relative rounded-2xl border-2 ${
        plan.popular
          ? "border-blue-brand shadow-2xl md:scale-105"
          : "border-gray-200 shadow-md"
      } bg-white overflow-hidden flex flex-col`}
    >
      {plan.popular && (
        <div className="absolute top-0 left-0 right-0 bg-blue-brand text-white text-xs font-bold text-center py-1.5 tracking-widest uppercase">
          Most Popular
        </div>
      )}

      <div className={`p-5 md:p-8 flex flex-col flex-1 ${plan.popular ? "pt-11 md:pt-14" : ""}`}>
        {/* Tier badge */}
        <span
          className={`inline-block text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 self-start ${tierBg[plan.tier]}`}
        >
          {plan.tier}
        </span>

        <h3 className="text-xl md:text-2xl font-bold text-navy mb-2">{plan.name}</h3>

        <div className="mb-5 md:mb-6">
          <span className="text-3xl md:text-4xl font-extrabold text-navy">
            ${plan.setup.toLocaleString()}
          </span>
          <span className="text-gray-muted ml-2 text-sm">one-time setup</span>
          <div className="text-base font-semibold text-gray-muted mt-1">
            then{" "}
            <span className="text-navy font-bold">${plan.monthly}/mo</span>
          </div>
        </div>

        <p className="text-xs font-semibold text-navy bg-gray-light rounded-lg px-3 py-2 mb-5 inline-block self-start">
          {plan.integrationsIncluded}
        </p>

        {!compact && (
          <ul className="space-y-2.5 mb-6 md:mb-8 flex-1">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-gray-body">
                <Check
                  className="mt-0.5 shrink-0 text-green-brand"
                  size={16}
                  aria-hidden
                />
                {f}
              </li>
            ))}
          </ul>
        )}

        <Link
          href={`/qualify?plan=${plan.id}`}
          className={`mt-auto w-full text-center font-semibold py-3.5 px-6 rounded-lg transition-colors text-base ${
            plan.popular
              ? "bg-orange-brand text-white hover:bg-orange-brand-hover"
              : "bg-navy text-white hover:bg-navy-dark"
          }`}
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
