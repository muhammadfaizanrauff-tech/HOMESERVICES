export type Plan = {
  id: "starter" | "pro" | "elite";
  name: string;
  tier: "CORE" | "GROWTH" | "PREMIUM";
  color: string;
  tierColor: string;
  setup: number;
  monthly: number;
  popular: boolean;
  features: string[];
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    tier: "CORE",
    color: "green",
    tierColor: "#2E9E6B",
    setup: 497,
    monthly: 297,
    popular: false,
    features: [
      "Speed-to-lead SMS + AI call",
      "Missed call text-back",
      "Appointment confirm + reminders",
      "Review generation",
      "GHL sub-account included",
      "Email + chat support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tier: "GROWTH",
    color: "blue",
    tierColor: "#2C6FB5",
    setup: 997,
    monthly: 497,
    popular: true,
    features: [
      "Everything in Starter",
      "AI Voice Agent (24/7 inbound)",
      "Estimate follow-up sequence",
      "Rehash & win-back campaigns",
      "After-hours coverage",
      "Priority support + monthly call",
    ],
  },
  {
    id: "elite",
    name: "Elite",
    tier: "PREMIUM",
    color: "purple",
    tierColor: "#6B4FA0",
    setup: 1997,
    monthly: 797,
    popular: false,
    features: [
      "Everything in Pro",
      "Membership & service plan flows",
      "Outbound fill-in AI calls",
      "Past customer re-engagement",
      "Smart lead qualification",
      "Dedicated account manager",
    ],
  },
];

export function getPlanById(id: string): Plan | undefined {
  return plans.find((p) => p.id === id);
}
