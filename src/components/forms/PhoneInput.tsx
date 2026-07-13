import { Phone } from "lucide-react";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function PhoneInput({
  value,
  onChange,
  placeholder,
}: PhoneInputProps) {
  return (
    <div className="relative">
      <Phone
        size={16}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-voita-text-muted"
      />
      <input
        type="tel"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-voita-bg border border-voita-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-voita-text placeholder-voita-text-muted focus:outline-none focus:ring-1 focus:ring-voita-accent"
      />
    </div>
  );
}
