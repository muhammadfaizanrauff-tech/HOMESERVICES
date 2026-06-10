import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-05-27.dahlia",
    });
  }
  return _stripe;
}

export function getPlanPriceIds(planId: string): {
  setupPriceId: string;
  monthlyPriceId: string;
} {
  const id = planId.toUpperCase();
  const setupPriceId = process.env[`STRIPE_PRICE_${id}_SETUP`];
  const monthlyPriceId = process.env[`STRIPE_PRICE_${id}_MONTHLY`];

  if (!setupPriceId || !monthlyPriceId) {
    throw new Error(`Stripe price IDs not configured for plan: ${planId}`);
  }

  return { setupPriceId, monthlyPriceId };
}
