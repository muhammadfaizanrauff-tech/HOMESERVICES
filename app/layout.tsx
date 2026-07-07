import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AttributionInit from "@/components/AttributionInit";
import MobileCTABar from "@/components/MobileCTABar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

function resolveSiteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (raw) {
    try {
      return new URL(raw);
    } catch {
      try {
        return new URL(`https://${raw}`);
      } catch {
        // fall through to default
      }
    }
  }
  return new URL("http://localhost:3000");
}

export const metadata: Metadata = {
  metadataBase: resolveSiteUrl(),
  title: {
    default: "ChrisAlchemy Consulting: AI Automation for Home Services",
    template: "%s | ChrisAlchemy Consulting",
  },
  description:
    "Stop losing jobs to missed calls and dead leads. ChrisAlchemy adds an AI-powered follow-up, booking, and review system to your home services business. Powered by GoHighLevel.",
  keywords: [
    "home services automation",
    "HVAC automation",
    "plumbing CRM",
    "GoHighLevel home services",
    "missed call text back",
    "AI voice agent",
    "field service automation",
  ],
  openGraph: {
    title: "ChrisAlchemy Consulting: AI Automation for Home Services",
    description:
      "Stop losing 3 to 5 jobs a month to missed calls and dead leads. The GHL layer built for the field, not just the funnel.",
    type: "website",
    locale: "en_US",
    siteName: "ChrisAlchemy Consulting",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased flex flex-col min-h-screen">
        <Nav />
        <Suspense fallback={null}>
          <AttributionInit />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileCTABar />
      </body>
    </html>
  );
}
