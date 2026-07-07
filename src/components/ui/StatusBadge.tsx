import clsx from "clsx";

export default function StatusBadge({ verified }: { verified: boolean }) {
  return (
    <span
      className={clsx(
        "px-2.5 py-1 rounded-full text-xs font-medium border",
        verified
          ? "bg-voita-accent-dim text-voita-accent border-voita-accent/30"
          : "bg-transparent text-voita-text-muted border-voita-border",
      )}
    >
      {verified ? "Verified" : "Unverified"}
    </span>
  );
}
