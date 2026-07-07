"use client";

import clsx from "clsx";

interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function ToggleSwitch({
  label,
  checked,
  onChange,
}: ToggleSwitchProps) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-xs font-semibold text-voita-text-muted uppercase tracking-wide">
        {label}
      </span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={clsx(
          "w-9 h-5 rounded-full relative transition-colors shrink-0",
          checked ? "bg-voita-accent" : "bg-voita-border",
        )}
      >
        <span
          className={clsx(
            "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform",
            checked ? "translate-x-4" : "translate-x-0.5",
          )}
        />
      </button>
    </div>
  );
}
