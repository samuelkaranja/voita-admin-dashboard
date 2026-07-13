import Select from "@/components/forms/Select";

export const ICON_KEYS = [
  "wrench",
  "cpu",
  "zap",
  "shield",
  "sparkles",
  "home",
  "truck",
  "anchor",
  "battery",
  "circle",
  "search",
] as const;

interface IconKeySelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function IconKeySelect({ value, onChange }: IconKeySelectProps) {
  return (
    <Select
      options={[...ICON_KEYS]}
      value={value || ICON_KEYS[0]}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
