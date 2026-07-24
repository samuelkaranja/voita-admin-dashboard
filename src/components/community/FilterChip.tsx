import { X } from "lucide-react";

interface FilterChipProps {
  label: string;
  onClear: () => void;
}

export default function FilterChip({ label, onClear }: FilterChipProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-voita-text-muted text-sm">Filtered by:</span>
      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-voita-card-hover text-voita-text-secondary border border-voita-border">
        {label}
        <button onClick={onClear} className="hover:text-voita-text">
          <X size={12} />
        </button>
      </span>
    </div>
  );
}
