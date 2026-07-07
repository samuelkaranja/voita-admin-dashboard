import { Clock } from "lucide-react";

export default function EtaRangeLabel({
  min,
  max,
}: {
  min: number | null;
  max: number | null;
}) {
  return (
    <span className="flex items-center gap-1.5 text-voita-text-secondary text-sm">
      <Clock size={13} className="text-voita-text-muted shrink-0" />
      {min != null && max != null ? `${min}–${max} mins` : "Not set"}
    </span>
  );
}
