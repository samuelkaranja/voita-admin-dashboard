import clsx from "clsx";
import { CtaType } from "@/types";

const styles: Record<CtaType, string> = {
  "Book Scout": "bg-voita-accent-dim text-voita-accent",
  "Quick Request": "bg-blue-500/10 text-blue-400",
  "Schedule Valet": "bg-purple-500/10 text-purple-400",
};

export default function CtaTypeBadge({ type }: { type: CtaType }) {
  return (
    <span
      className={clsx(
        "px-2.5 py-1 rounded-full text-xs font-medium",
        styles[type],
      )}
    >
      {type}
    </span>
  );
}
