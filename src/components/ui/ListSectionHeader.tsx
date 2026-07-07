import { Plus } from "lucide-react";

interface ListSectionHeaderProps {
  title: string;
  count: number;
  onAddClick: () => void;
}

export default function ListSectionHeader({
  title,
  count,
  onAddClick,
}: ListSectionHeaderProps) {
  return (
    <div className="flex items-center justify-between px-5 sm:px-6 py-4">
      <div>
        <h3 className="text-voita-text font-semibold text-sm">{title}</h3>
        <p className="text-voita-text-muted text-xs mt-0.5">
          {count} {count === 1 ? "item" : "items"}
        </p>
      </div>
      <button
        type="button"
        onClick={onAddClick}
        className="flex items-center gap-1.5 bg-voita-accent text-voita-bg text-xs font-semibold px-3.5 py-2 rounded-lg hover:opacity-90 transition-opacity"
      >
        <Plus size={14} strokeWidth={2.5} />
        Add
      </button>
    </div>
  );
}
