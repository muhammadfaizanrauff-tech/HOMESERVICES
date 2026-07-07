import { PlayCircle } from "lucide-react";

type AudioPlaceholderProps = { label: string; className?: string };

export default function AudioPlaceholder({ label, className = "" }: AudioPlaceholderProps) {
  return (
    <div
      className={`bg-white/5 border-2 border-dashed border-white/20 rounded-xl p-5 flex items-center gap-4 ${className}`}
    >
      <div className="w-14 h-14 rounded-full bg-orange-brand/20 text-orange-brand flex items-center justify-center shrink-0">
        <PlayCircle size={28} />
      </div>
      <div className="flex-1 text-left">
        <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
          <div className="h-full w-1/3 bg-orange-brand/50 rounded-full" />
        </div>
        <p className="text-xs text-gray-400">[audio] {label}</p>
      </div>
    </div>
  );
}
