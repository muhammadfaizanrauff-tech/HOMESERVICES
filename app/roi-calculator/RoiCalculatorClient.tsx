"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

const WEEKS_PER_MONTH = 4.33;
const BOOKING_RATE_ON_RECOVERED_CALLS = 0.5;

function currency(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function RoiCalculatorClient() {
  const [avgTicket, setAvgTicket] = useState(650);
  const [callsPerWeek, setCallsPerWeek] = useState(40);
  const [missedPct, setMissedPct] = useState(20);

  const { lostJobsPerMonth, lostRevenuePerMonth, lostRevenuePerYear } = useMemo(() => {
    const missedCallsPerMonth = callsPerWeek * WEEKS_PER_MONTH * (missedPct / 100);
    const jobs = missedCallsPerMonth * BOOKING_RATE_ON_RECOVERED_CALLS;
    const revenue = jobs * avgTicket;
    return {
      lostJobsPerMonth: jobs,
      lostRevenuePerMonth: revenue,
      lostRevenuePerYear: revenue * 12,
    };
  }, [avgTicket, callsPerWeek, missedPct]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      {/* Inputs */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 space-y-7">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-navy">Average job ticket value</label>
            <span className="text-navy font-bold">{currency(avgTicket)}</span>
          </div>
          <input
            type="range"
            min={100}
            max={5000}
            step={50}
            value={avgTicket}
            onChange={(e) => setAvgTicket(Number(e.target.value))}
            className="w-full accent-orange-brand"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-navy">Inbound calls per week</label>
            <span className="text-navy font-bold">{callsPerWeek}</span>
          </div>
          <input
            type="range"
            min={5}
            max={300}
            step={5}
            value={callsPerWeek}
            onChange={(e) => setCallsPerWeek(Number(e.target.value))}
            className="w-full accent-orange-brand"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-navy">% of calls missed or unanswered</label>
            <span className="text-navy font-bold">{missedPct}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={60}
            step={1}
            value={missedPct}
            onChange={(e) => setMissedPct(Number(e.target.value))}
            className="w-full accent-orange-brand"
          />
        </div>

        <p className="text-xs text-gray-muted leading-relaxed">
          Estimate assumes half of recovered missed calls convert to a booked job,
          based on benchmark outcomes from comparable deployments. Your results will vary.
        </p>
      </div>

      {/* Output */}
      <div className="bg-navy rounded-2xl p-6 md:p-8 text-center flex flex-col items-center gap-2">
        <AlertTriangle size={28} className="text-orange-brand mb-2" />
        <p className="text-gray-300 text-sm uppercase tracking-wide font-semibold">
          Walking out the door every month
        </p>
        <p className="text-4xl md:text-5xl font-extrabold text-orange-brand my-2">
          {currency(Math.round(lostRevenuePerMonth))}
        </p>
        <p className="text-gray-400 text-sm mb-6">
          ≈ {currency(Math.round(lostRevenuePerYear))}/year · roughly{" "}
          {Math.round(lostJobsPerMonth)} lost jobs/month
        </p>
        <Link
          href="/qualify"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange-brand text-white font-bold px-8 py-4 rounded-xl hover:bg-orange-brand-hover transition-colors text-lg"
        >
          Stop the leak. See if it&apos;s a fit →
        </Link>
      </div>
    </div>
  );
}
