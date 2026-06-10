"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { plans } from "@/content/plans";
import { Shield, Lock } from "lucide-react";

export default function PaymentClient() {
  const params = useSearchParams();
  const planId = params.get("plan") || "starter";
  const email = params.get("email") || "";
  const name = params.get("name") || "";
  const businessName = params.get("businessName") || "";
  const phone = params.get("phone") || "";
  const canceled = params.get("canceled") === "1";

  const plan = plans.find((p) => p.id === planId) || plans[0];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handlePay() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId,
          customer: { email, name, businessName, phone },
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Could not create checkout session. Please try again.");
        setLoading(false);
        return;
      }
      const { url } = await res.json();
      window.location.href = url;
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
      {canceled && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-sm text-yellow-800">
          Your payment was canceled. No charge was made — you can try again below.
        </div>
      )}

      {/* Order summary */}
      <h2 className="font-bold text-navy text-lg mb-5">Order summary</h2>
      <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
        <div className="bg-gray-light px-5 py-3 flex items-center justify-between">
          <span className="font-semibold text-navy">{plan.name} Plan</span>
          <span className="text-xs bg-navy text-white px-2 py-0.5 rounded font-bold uppercase">
            {plan.tier}
          </span>
        </div>
        <div className="divide-y divide-gray-100">
          <div className="px-5 py-3 flex justify-between text-sm">
            <span className="text-gray-muted">One-time setup fee</span>
            <span className="font-semibold text-navy">${plan.setup.toLocaleString()}</span>
          </div>
          <div className="px-5 py-3 flex justify-between text-sm">
            <span className="text-gray-muted">Monthly subscription</span>
            <span className="font-semibold text-navy">${plan.monthly}/mo</span>
          </div>
          <div className="px-5 py-3 flex justify-between font-bold text-navy">
            <span>Due today</span>
            <span>${plan.setup.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Customer info */}
      {name && (
        <div className="bg-gray-light rounded-lg px-4 py-3 mb-6 text-sm">
          <p className="font-medium text-navy mb-0.5">{name}</p>
          {businessName && <p className="text-gray-muted">{businessName}</p>}
          {email && <p className="text-gray-muted">{email}</p>}
        </div>
      )}

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <button
        onClick={handlePay}
        disabled={loading}
        className="w-full bg-orange-brand text-white font-bold py-4 px-6 rounded-xl hover:bg-orange-brand-hover transition-colors disabled:opacity-60 text-lg"
      >
        {loading ? "Redirecting to secure checkout…" : "Pay & Activate →"}
      </button>

      <div className="flex items-center justify-center gap-4 mt-5 text-xs text-gray-muted">
        <span className="flex items-center gap-1"><Lock size={12} /> SSL Encrypted</span>
        <span className="flex items-center gap-1"><Shield size={12} /> Powered by Stripe</span>
      </div>

      <p className="text-center text-xs text-gray-muted mt-3">
        You&apos;ll be redirected to Stripe&apos;s secure payment page. Setup begins after
        your 20-minute onboarding call.
      </p>
    </div>
  );
}
