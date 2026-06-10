import type { Metadata } from "next";
import { Suspense } from "react";
import PaymentClient from "./PaymentClient";

export const metadata: Metadata = {
  title: "Complete Your Order",
  description: "Secure checkout for your ChrisAlchemy plan.",
};

export default function PaymentPage() {
  return (
    <div className="bg-gray-light min-h-screen py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-orange-brand mb-2">
            Step 2 of 2 — Payment
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-navy">
            Complete your order.
          </h1>
        </div>
        <Suspense fallback={<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center text-gray-muted">Loading order details…</div>}>
          <PaymentClient />
        </Suspense>
      </div>
    </div>
  );
}
