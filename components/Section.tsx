import { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
  gray?: boolean;
};

export default function Section({
  children,
  className = "",
  id,
  dark = false,
  gray = false,
}: SectionProps) {
  const bg = dark
    ? "bg-navy text-white"
    : gray
    ? "bg-gray-light"
    : "bg-white";

  return (
    <section id={id} className={`py-12 md:py-20 ${bg} ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

type EyebrowProps = { children: ReactNode; className?: string };
export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <p
      className={`text-xs font-bold tracking-wide sm:tracking-widest uppercase text-orange-brand mb-3 ${className}`}
    >
      {children}
    </p>
  );
}
