"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { INDUSTRIES, SOFTWARE_OPTIONS, TECH_COUNT_OPTIONS } from "@/lib/constants";
import { Check } from "lucide-react";
import type { Plan } from "@/content/plans";

const schema = z.object({
  planId: z.string().min(1),
  name: z.string().min(2, "Full name is required"),
  businessName: z.string().min(2, "Business name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  industry: z.string().min(1, "Please select your industry"),
  currentSoftware: z.string().min(1, "Please select your current software"),
  techCount: z.string().min(1, "Please select number of techs"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function CheckoutFormClient({ plans }: { plans: Plan[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");

  const defaultPlan = params.get("plan") || "starter";

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { planId: defaultPlan },
  });

  const selectedPlanId = watch("planId");
  const selectedPlan = plans.find((p) => p.id === selectedPlanId) || plans[0];

  useEffect(() => {
    if (defaultPlan) setValue("planId", defaultPlan);
  }, [defaultPlan, setValue]);

  async function onSubmit(data: FormData) {
    setError("");
    await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, source: "checkout" }),
    }).catch(() => {});
    const query = new URLSearchParams({
      plan: data.planId,
      name: data.name,
      email: data.email,
      businessName: data.businessName,
      phone: data.phone,
    });
    router.push(`/checkout/payment?${query.toString()}`);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Plan selector / summary */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:sticky lg:top-24">
          <h2 className="font-bold text-navy text-lg mb-4">Selected Plan</h2>
          <div className="space-y-3 mb-5">
            {plans.map((plan) => (
              <label
                key={plan.id}
                className={`flex items-start gap-3 border-2 rounded-xl p-3 cursor-pointer transition-colors ${
                  selectedPlanId === plan.id
                    ? "border-orange-brand bg-orange-brand/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  {...register("planId")}
                  value={plan.id}
                  className="mt-1"
                />
                <div>
                  <div className="font-bold text-navy text-sm">{plan.name}</div>
                  <div className="text-gray-muted text-xs">
                    ${plan.setup} setup + ${plan.monthly}/mo
                  </div>
                </div>
              </label>
            ))}
          </div>

          {selectedPlan && (
            <div className="border-t pt-4">
              <p className="text-xs font-semibold text-navy mb-2">Includes:</p>
              <ul className="space-y-1">
                {selectedPlan.features.map((f) => (
                  <li key={f} className="flex items-start gap-1.5 text-xs text-gray-muted">
                    <Check size={12} className="mt-0.5 text-green-brand shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8"
        noValidate
      >
        <h2 className="font-bold text-navy text-lg mb-6">Your details</h2>
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Full name" error={errors.name?.message}>
              <input {...register("name")} placeholder="George Martinez" className={inputClass(!!errors.name)} />
            </Field>
            <Field label="Business name" error={errors.businessName?.message}>
              <input {...register("businessName")} placeholder="Martinez HVAC" className={inputClass(!!errors.businessName)} />
            </Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Email" error={errors.email?.message}>
              <input {...register("email")} type="email" placeholder="george@yourbiz.com" className={inputClass(!!errors.email)} />
            </Field>
            <Field label="Phone" error={errors.phone?.message}>
              <input {...register("phone")} type="tel" placeholder="(555) 000-0000" className={inputClass(!!errors.phone)} />
            </Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Industry" error={errors.industry?.message}>
              <select {...register("industry")} className={inputClass(!!errors.industry)}>
                <option value="">Select industry</option>
                {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
            </Field>
            <Field label="Current software" error={errors.currentSoftware?.message}>
              <select {...register("currentSoftware")} className={inputClass(!!errors.currentSoftware)}>
                <option value="">Select software</option>
                {SOFTWARE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Number of techs on the road" error={errors.techCount?.message}>
            <select {...register("techCount")} className={inputClass(!!errors.techCount)}>
              <option value="">Select range</option>
              {TECH_COUNT_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Notes (optional)" error={undefined}>
            <textarea
              {...register("notes")}
              rows={3}
              placeholder="Anything we should know before setup?"
              className={inputClass(false)}
            />
          </Field>
        </div>

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full bg-orange-brand text-white font-semibold py-3.5 px-6 rounded-xl hover:bg-orange-brand-hover transition-colors disabled:opacity-60 text-lg"
        >
          {isSubmitting ? "Saving…" : "Continue to Payment →"}
        </button>

        <p className="text-center text-xs text-gray-muted mt-3">
          🔒 Secure checkout · Setup begins after your 20-min onboarding call
        </p>
      </form>
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full border ${hasError ? "border-red-400" : "border-gray-300"} rounded-lg px-4 py-3 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-brand bg-white`;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-navy">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
