import { NextRequest, NextResponse } from "next/server";
import { getStripe, getPlanPriceIds } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { planId, customer } = body as {
      planId: string;
      customer: {
        email: string;
        name: string;
        businessName?: string;
        phone?: string;
      };
    };

    if (!planId || !customer?.email) {
      return NextResponse.json({ error: "Missing planId or customer email" }, { status: 400 });
    }

    const { setupPriceId, monthlyPriceId } = getPlanPriceIds(planId);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await getStripe().checkout.sessions.create({
      mode: "subscription",
      customer_email: customer.email,
      // Monthly recurring price + one-time setup fee as invoice item
      line_items: [
        { price: monthlyPriceId, quantity: 1 },
        { price: setupPriceId, quantity: 1 },
      ],
      subscription_data: {
        metadata: {
          planId,
          businessName: customer.businessName || "",
          phone: customer.phone || "",
        },
      },
      metadata: {
        planId,
        customerName: customer.name,
        businessName: customer.businessName || "",
      },
      success_url: `${siteUrl}/thank-you/service?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout/payment?plan=${planId}&canceled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    console.error("[/api/checkout]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
