import { Clock } from "lucide-react";

export default function WaitTimeLabel({ minutes }: { minutes: number }) {
  return (
    <span className="flex items-center gap-1.5 text-voita-text-secondary text-sm">
      <Clock size={13} className="text-voita-text-muted shrink-0" />
      {minutes} mins
    </span>
  );
}
