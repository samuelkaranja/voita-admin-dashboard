import clsx from "clsx";
import { TowingAvailability } from "@/types";

export default function AvailabilityStatus({
  status,
}: {
  status: TowingAvailability;
}) {
  const isAvailable = status === "Available";

  return (
    <span
      className={clsx(
        "flex items-center gap-1.5 text-sm font-medium",
        isAvailable ? "text-voita-accent" : "text-red-400",
      )}
    >
      <span
        className={clsx(
          "w-1.5 h-1.5 rounded-full",
          isAvailable ? "bg-voita-accent" : "bg-red-400",
        )}
      />
      {status}
    </span>
  );
}
