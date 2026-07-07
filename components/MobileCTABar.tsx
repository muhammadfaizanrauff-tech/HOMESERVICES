"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const HIDDEN_PREFIXES = ["/qualify", "/demo", "/contact", "/thank-you"];

export default function MobileCTABar() {
  const pathname = usePathname();
  if (HIDDEN_PREFIXES.some((p) => pathname.startsWith(p))) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy border-t border-white/10 px-4 py-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
      <Link
        href="/demo/calendar"
        className="w-full flex items-center justify-center bg-orange-brand text-white font-bold py-3 rounded-xl hover:bg-orange-brand-hover transition-colors"
      >
        Book a Demo
      </Link>
    </div>
  );
}
