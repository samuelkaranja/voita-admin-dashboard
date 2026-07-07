import clsx from "clsx";
import { VehicleType } from "@/types";

const styles: Record<VehicleType, string> = {
  Flatbed: "bg-blue-500/10 text-blue-400",
  "Heavy Duty": "bg-amber-500/10 text-amber-400",
  Roadside: "bg-purple-500/10 text-purple-400",
};

export default function VehicleTypeBadge({ type }: { type: VehicleType }) {
  return (
    <span
      className={clsx(
        "px-2.5 py-1 rounded-md text-xs font-medium",
        styles[type],
      )}
    >
      {type}
    </span>
  );
}
