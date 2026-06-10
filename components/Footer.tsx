import Link from "next/link";
import { CONTACT_EMAIL, TAGLINE } from "@/lib/constants";

const links = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Book a Demo", href: "/demo/calendar" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="text-white font-extrabold text-xl tracking-tight mb-3">
              Chris<span className="text-orange-brand">Alchemy</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              {TAGLINE}
            </p>
          </div>

          {/* Nav */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Contact
            </h3>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm text-orange-brand hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="text-xs text-gray-500 mt-4">
              Powered by Rep Stack · Built for the trades.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} ChrisAlchemy Consulting. All rights reserved.</p>
          <p>{TAGLINE}</p>
        </div>
      </div>
    </footer>
  );
}
