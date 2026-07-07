import clsx from "clsx";

export default function AvailabilityIndicator({
  available,
}: {
  available: boolean;
}) {
  return (
    <span className="flex items-center gap-1.5 text-sm text-voita-text-secondary">
      <span
        className={clsx(
          "w-1.5 h-1.5 rounded-full",
          available ? "bg-voita-accent" : "bg-voita-text-muted",
        )}
      />
      {available ? "Yes" : "No"}
    </span>
  );
}
