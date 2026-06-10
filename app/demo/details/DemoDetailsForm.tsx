"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { INDUSTRIES, SOFTWARE_OPTIONS, TECH_COUNT_OPTIONS } from "@/lib/constants";

const schema = z.object({
  name: z.string().min(2, "Full name is required"),
  businessName: z.string().min(2, "Business name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  industry: z.string().min(1, "Please select your industry"),
  currentSoftware: z.string().min(1, "Please select your current software"),
  techCount: z.string().min(1, "Please select number of techs"),
  painPoints: z.string().min(10, "Please tell us a bit about what's falling through the cracks"),
});

type FormData = z.infer<typeof schema>;

export default function DemoDetailsForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setError("");
    await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, source: "demo" }),
    }).catch(() => {});
    router.push("/thank-you/demo");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 space-y-5"
      noValidate
    >
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
      <Field
        label="What's falling through the cracks right now?"
        error={errors.painPoints?.message}
      >
        <textarea
          {...register("painPoints")}
          rows={4}
          placeholder="e.g. Missed calls, quotes going cold, customers not rebooking…"
          className={inputClass(!!errors.painPoints)}
        />
      </Field>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-orange-brand text-white font-bold py-3.5 px-6 rounded-xl hover:bg-orange-brand-hover transition-colors disabled:opacity-60 text-lg"
      >
        {isSubmitting ? "Submitting…" : "Confirm My Demo"}
      </button>
    </form>
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
