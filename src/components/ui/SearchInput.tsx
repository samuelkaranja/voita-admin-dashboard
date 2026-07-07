"use client";

import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder,
}: SearchInputProps) {
  return (
    <div className="relative w-full sm:max-w-xs">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-voita-text-muted"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-voita-card border border-voita-border rounded-lg pl-9 pr-4 py-2.5 text-sm text-voita-text placeholder-voita-text-muted focus:outline-none focus:ring-1 focus:ring-voita-accent"
      />
    </div>
  );
}
