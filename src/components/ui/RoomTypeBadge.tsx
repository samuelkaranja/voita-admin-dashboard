import { RoomType } from "@/types";

const LABELS: Record<RoomType, string> = {
  general: "General",
  brand: "Brand",
};

export default function RoomTypeBadge({ type }: { type: RoomType }) {
  return (
    <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wide border border-voita-border text-voita-text-secondary">
      {LABELS[type]}
    </span>
  );
}
