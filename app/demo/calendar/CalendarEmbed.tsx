"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const CALENDAR_ID = "pLvaWOApsVIsvQRkqbbC";

export default function CalendarEmbed() {
  const router = useRouter();
  const redirected = useRef(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.type = "text/javascript";
    document.body.appendChild(script);

    function handleMessage(e: MessageEvent) {
      if (redirected.current) return;
      const d = e.data;
      const isBookingConfirmed =
        d?.event === "booking" ||
        d?.type === "booking" ||
        d?.event === "appointmentBooked" ||
        d?.action === "appointmentBooked" ||
        (typeof d === "string" && d.includes("booking"));
      if (isBookingConfirmed) {
        redirected.current = true;
        router.push("/thank-you/demo");
      }
    }

    window.addEventListener("message", handleMessage);
    return () => {
      document.body.removeChild(script);
      window.removeEventListener("message", handleMessage);
    };
  }, [router]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
      <iframe
        src={`https://api.leadconnectorhq.com/widget/booking/${CALENDAR_ID}`}
        style={{ width: "100%", border: "none", overflow: "hidden" }}
        scrolling="no"
        id={`${CALENDAR_ID}_1781128357001`}
        className="min-h-[600px] md:min-h-[750px]"
        title="Book a demo: ChrisAlchemy Consulting"
      />
    </div>
  );
}
