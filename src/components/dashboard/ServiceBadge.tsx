import clsx from "clsx";
import { ServiceType } from "@/types";

const styles: Record<ServiceType, string> = {
  Mechanic: "bg-blue-500/10 text-blue-400",
  "Car Wash": "bg-cyan-500/10 text-cyan-400",
  Towing: "bg-amber-500/10 text-amber-400",
  Scout: "bg-purple-500/10 text-purple-400",
};

export default function ServiceBadge({ type }: { type: ServiceType }) {
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
