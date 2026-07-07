import { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
}

export default function Select({ options, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        {...props}
        className="w-full appearance-none bg-voita-bg border border-voita-border rounded-lg px-4 py-2.5 pr-10 text-sm text-voita-text focus:outline-none focus:ring-1 focus:ring-voita-accent"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-voita-text-muted pointer-events-none"
      />
    </div>
  );
}
