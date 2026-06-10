"use client";

import { useEffect } from "react";
import { initAttribution } from "@/lib/attribution";
import { track } from "@/lib/analytics";
import { usePathname, useSearchParams } from "next/navigation";

export default function AttributionInit() {
  const pathname    = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    initAttribution();

    const tradeMatch    = pathname.match(/\/for\/([^/]+)/);
    const platformMatch = pathname.match(/\/platform\/([^/]+)/);

    track({
      event: "funnel_view",
      landingPath: pathname,
      trade:    tradeMatch?.[1],
      platform: platformMatch?.[1],
      source:   searchParams.get("utm_source") ?? undefined,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
