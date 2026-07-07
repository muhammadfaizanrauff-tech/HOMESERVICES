"use client";

import { useState } from "react";
import {
  integrations,
  CATEGORY_LABELS,
  TIER_META,
  type IntegrationCategory,
} from "@/content/integrations";

const FILTERS: { key: IntegrationCategory | "All"; label: string }[] = [
  { key: "All", label: "All" },
  { key: "FSM", label: "FSM" },
  { key: "Roofing", label: "Roofing & Construction" },
  { key: "Leads", label: "Lead Sources" },
  { key: "Ops", label: "Ops" },
];

export default function IntegrationsGrid() {
  const [filter, setFilter] = useState<IntegrationCategory | "All">("All");

  const visible =
    filter === "All" ? integrations : integrations.filter((i) => i.category === filter);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
              filter === f.key
                ? "bg-orange-brand text-white border-orange-brand"
                : "bg-white text-navy border-gray-200 hover:border-orange-brand"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {visible.map((i) => {
          const tierMeta = TIER_META[i.tier];
          return (
            <div
              key={i.slug}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-navy text-sm leading-snug">{i.name}</h3>
                <span
                  className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${tierMeta.bg} ${tierMeta.text}`}
                >
                  {tierMeta.label}
                </span>
              </div>
              <p className="text-gray-muted text-[11px] uppercase tracking-wide font-semibold mb-2">
                {i.trades}
              </p>
              <p className="text-gray-body text-sm leading-relaxed">{i.trigger}</p>
            </div>
          );
        })}
      </div>

      <p className="text-center text-gray-muted text-sm mt-8">
        Showing {visible.length} of {integrations.length} integrations
        {filter !== "All" ? ` in ${CATEGORY_LABELS[filter]}` : ""}.
      </p>
    </div>
  );
}
