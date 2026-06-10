"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FAQ } from "@/content/faqs";

type FAQItemProps = { faq: FAQ };

export default function FAQItem({ faq }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-5 text-left gap-4 hover:text-orange-brand transition-colors"
      >
        <span className="font-semibold text-navy text-base">{faq.q}</span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-gray-muted transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open && (
        <div className="pb-5 text-gray-body text-sm leading-relaxed pr-8">
          {faq.a}
        </div>
      )}
    </div>
  );
}
