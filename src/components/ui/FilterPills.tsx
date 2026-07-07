"use client";

import clsx from "clsx";

interface FilterPillsProps<T extends string> {
  options: readonly T[];
  active: T;
  onChange: (value: T) => void;
}

export default function FilterPills<T extends string>({
  options,
  active,
  onChange,
}: FilterPillsProps<T>) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={clsx(
            "px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap",
            active === option
              ? "bg-voita-accent-dim text-voita-accent border-voita-accent/30"
              : "bg-transparent text-voita-text-secondary border-voita-border hover:border-voita-text-muted",
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
