"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Plus } from "lucide-react";

interface ComboboxOption {
  id: string;
  label: string;
}

interface SearchableComboboxProps {
  options: ComboboxOption[];
  placeholder?: string;
  onSelectExisting: (option: ComboboxOption) => void;
  onCreateNew: (label: string) => void;
}

export default function SearchableCombobox({
  options,
  placeholder,
  onSelectExisting,
  onCreateNew,
}: SearchableComboboxProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase()),
  );
  const exactMatch = options.some(
    (o) => o.label.toLowerCase() === query.trim().toLowerCase(),
  );

  function handleSelect(option: ComboboxOption) {
    onSelectExisting(option);
    setQuery("");
    setIsOpen(false);
  }

  function handleCreate() {
    if (!query.trim()) return;
    onCreateNew(query.trim());
    setQuery("");
    setIsOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full bg-voita-bg border border-voita-border rounded-lg pl-4 pr-10 py-2.5 text-sm text-voita-text placeholder-voita-text-muted focus:outline-none focus:ring-1 focus:ring-voita-accent"
        />
        <ChevronDown
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-voita-text-muted pointer-events-none"
        />
      </div>

      {isOpen && (
        <div className="absolute z-20 mt-1 w-full bg-voita-card border border-voita-border rounded-lg shadow-lg max-h-56 overflow-y-auto">
          {filtered.length > 0 ? (
            filtered.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelect(option)}
                className="w-full flex items-center gap-2 px-3.5 py-2.5 text-left text-sm text-voita-text hover:bg-voita-card-hover transition-colors"
              >
                <Check size={14} className="text-voita-accent shrink-0" />
                {option.label}
              </button>
            ))
          ) : (
            <p className="px-3.5 py-3 text-voita-text-muted text-xs">
              No matches found
            </p>
          )}

          {query.trim() && !exactMatch && (
            <button
              type="button"
              onClick={handleCreate}
              className="w-full flex items-center gap-2 px-3.5 py-2.5 text-left text-sm text-voita-accent hover:bg-voita-card-hover transition-colors border-t border-voita-border"
            >
              <Plus size={14} className="shrink-0" />
              Create &ldquo;{query.trim()}&rdquo;
            </button>
          )}
        </div>
      )}
    </div>
  );
}
