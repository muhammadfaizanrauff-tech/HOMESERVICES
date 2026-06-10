"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-navy shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none shrink-0">
            <span className="text-white font-extrabold text-xl tracking-tight uppercase">
              Home <span className="text-orange-brand">Services</span>
            </span>
            <span className="text-gray-400 text-[10px] font-medium tracking-wide">
              By Chris Alchemy Consulting
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Primary">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-orange-brand"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/services"
              className="text-sm font-semibold text-white hover:text-orange-brand transition-colors"
            >
              View Plans
            </Link>
            <Link
              href="/demo/calendar"
              className="bg-orange-brand text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-orange-brand-hover transition-colors"
            >
              Book a Demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2 -mr-2 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-brand"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-navy-dark border-t border-white/10 px-4 pb-6">
          <nav className="flex flex-col pt-2" aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`py-3.5 text-base font-medium border-b border-white/10 last:border-0 ${
                  pathname === link.href
                    ? "text-orange-brand"
                    : "text-gray-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-5">
              <Link
                href="/services"
                onClick={() => setOpen(false)}
                className="text-base font-semibold text-white text-center border border-white/30 rounded-xl py-3.5 hover:bg-white/10 transition-colors"
              >
                View Plans
              </Link>
              <Link
                href="/demo/calendar"
                onClick={() => setOpen(false)}
                className="bg-orange-brand text-white text-base font-semibold px-4 py-3.5 rounded-xl text-center hover:bg-orange-brand-hover transition-colors"
              >
                Book a Demo
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
