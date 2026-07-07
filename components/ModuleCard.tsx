import {
  Zap, MessageSquare, Bot, CalendarCheck, FileText, RotateCcw,
  Star, Moon, Repeat, PhoneOutgoing, Users, Filter,
} from "lucide-react";
import type { Module } from "@/content/modules";

type ModuleCardProps = { module: Module };

const tierStyles: Record<string, { bg: string; text: string; label: string }> = {
  CORE:    { bg: "bg-green-brand/10",   text: "text-green-brand",   label: "CORE" },
  GROWTH:  { bg: "bg-blue-brand/10",    text: "text-blue-brand",    label: "GROWTH" },
  PREMIUM: { bg: "bg-purple-brand/10",  text: "text-purple-brand",  label: "PREMIUM" },
};

const moduleIcons: Record<number, React.ComponentType<{ size?: number; className?: string }>> = {
  1: Zap, 2: MessageSquare, 3: Bot, 4: CalendarCheck, 5: FileText, 6: RotateCcw,
  7: Star, 8: Moon, 9: Repeat, 10: PhoneOutgoing, 11: Users, 12: Filter,
};

export default function ModuleCard({ module: m }: ModuleCardProps) {
  const style = tierStyles[m.tier];
  const Icon = moduleIcons[m.n] ?? Zap;
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex gap-4 hover:shadow-md transition-shadow">
      <div className="shrink-0 w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center font-bold text-navy text-sm">
        {m.n}
      </div>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Icon size={14} className="text-orange-brand" />
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${style.bg} ${style.text}`}
          >
            {style.label}
          </span>
          <h3 className="font-semibold text-navy text-sm">{m.title}</h3>
        </div>
        <p className="text-gray-muted text-sm leading-relaxed">{m.desc}</p>
      </div>
    </div>
  );
}
