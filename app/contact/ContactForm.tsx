"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { INDUSTRIES, SOFTWARE_OPTIONS } from "@/lib/constants";
import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { postContactLeadToGHL } from "@/lib/leadClient";

const schema = z.object({
  name: z.string().min(2, "Full name is required"),
  businessName: z.string().min(2, "Business name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  industry: z.string().min(1, "Please select your industry"),
  currentSoftware: z.string().min(1, "Please select your current software"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setError("");
    try {
      await postContactLeadToGHL({
        source: "contact",
        name: data.name,
        businessName: data.businessName,
        email: data.email,
        phone: data.phone,
        industry: data.industry,
        currentSoftware: data.currentSoftware,
        notes: data.message,
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    }
  }

  if (submitted) {
    return (
      <div className="bg-green-brand/10 border border-green-brand rounded-xl p-8 text-center">
        <CheckCircle size={40} className="text-green-brand mx-auto mb-3" />
        <h3 className="font-bold text-navy text-xl mb-2">Message sent!</h3>
        <p className="text-gray-muted">
          We&apos;ll get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Full name" error={errors.name?.message}>
          <input
            {...register("name")}
            placeholder="George Martinez"
            className={inputClass(!!errors.name)}
          />
        </Field>
        <Field label="Business name" error={errors.businessName?.message}>
          <input
            {...register("businessName")}
            placeholder="Martinez HVAC"
            className={inputClass(!!errors.businessName)}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Email" error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            placeholder="george@yourbiz.com"
            className={inputClass(!!errors.email)}
          />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <input
            {...register("phone")}
            type="tel"
            placeholder="(555) 000-0000"
            className={inputClass(!!errors.phone)}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Industry" error={errors.industry?.message}>
          <select {...register("industry")} className={inputClass(!!errors.industry)}>
            <option value="">Select industry</option>
            {INDUSTRIES.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </Field>
        <Field label="Current software" error={errors.currentSoftware?.message}>
          <select {...register("currentSoftware")} className={inputClass(!!errors.currentSoftware)}>
            <option value="">Select software</option>
            {SOFTWARE_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Message (optional)" error={undefined}>
        <textarea
          {...register("message")}
          rows={4}
          placeholder="Tell us what's on your mind…"
          className={inputClass(false)}
        />
      </Field>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-orange-brand text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-brand-hover transition-colors disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return `w-full border ${hasError ? "border-red-400" : "border-gray-300"} rounded-lg px-4 py-3 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-brand`;
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-navy">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
