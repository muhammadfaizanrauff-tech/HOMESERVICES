type ImagePlaceholderProps = {
  label: string;
  ratio?: string;
  className?: string;
};

export default function ImagePlaceholder({
  label,
  ratio = "16/9",
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`w-full rounded-xl border-2 border-dashed border-gray-300 bg-gray-light flex items-center justify-center p-6 text-center ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <p className="text-sm text-gray-muted font-medium">[photo] {label}</p>
    </div>
  );
}
