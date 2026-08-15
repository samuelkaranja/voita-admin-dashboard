import clsx from "clsx";

interface PillProps {
  label: string;
  color?: "accent" | "amber" | "red";
}

const colorStyles: Record<NonNullable<PillProps["color"]>, string> = {
  accent: "bg-voita-accent-dim text-voita-accent",
  amber: "bg-amber-500/10 text-amber-400",
  red: "bg-red-500/10 text-red-400",
};

export default function Pill({ label, color = "accent" }: PillProps) {
  return (
    <span
      className={clsx(
        "px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap",
        colorStyles[color],
      )}
    >
      {label}
    </span>
  );
}
