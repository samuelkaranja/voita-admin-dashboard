"use client";

interface ColorPickerInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ColorPickerInput({
  value,
  onChange,
}: ColorPickerInputProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="relative w-10 h-10 shrink-0 rounded-lg border border-voita-border overflow-hidden cursor-pointer">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute -top-1 -left-1 w-12 h-12 cursor-pointer border-none p-0"
        />
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="#10B981"
        className="w-full bg-voita-bg border border-voita-border rounded-lg px-4 py-2.5 text-sm text-voita-text placeholder-voita-text-muted focus:outline-none focus:ring-1 focus:ring-voita-accent"
      />
    </div>
  );
}
