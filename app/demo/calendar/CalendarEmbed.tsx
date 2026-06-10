"use client";

import { useEffect } from "react";

export default function CalendarEmbed() {
  const calendarUrl = process.env.NEXT_PUBLIC_GHL_CALENDAR_URL;

  useEffect(() => {
    if (!calendarUrl) return;
    // Load GHL embed script for auto-resize if needed
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [calendarUrl]);

  if (!calendarUrl) {
    return (
      <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center mb-6">
        <p className="text-gray-muted font-medium">GHL Calendar Embed</p>
        <p className="text-sm text-gray-400 mt-2">
          Set <code className="bg-gray-100 px-1 rounded">NEXT_PUBLIC_GHL_CALENDAR_URL</code> in your environment to display the booking calendar.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
      <iframe
        src={calendarUrl}
        className="w-full min-h-[520px] md:min-h-[700px]"
        style={{ border: "none" }}
        title="Book a demo — ChrisAlchemy Consulting"
        loading="lazy"
      />
    </div>
  );
}
