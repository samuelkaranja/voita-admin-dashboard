import { MapPin } from "lucide-react";

export default function LocationLabel({ text }: { text: string }) {
  return (
    <span className="flex items-center gap-1.5 text-voita-text-secondary text-sm">
      <MapPin size={13} className="text-voita-text-muted shrink-0" />
      {text}
    </span>
  );
}
