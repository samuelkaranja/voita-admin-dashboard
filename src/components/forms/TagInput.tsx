"use client";

import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export default function TagInput({
  tags,
  onChange,
  placeholder,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  function addTag() {
    const trimmed = inputValue.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
    setInputValue("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2 w-full bg-voita-bg border border-voita-border rounded-lg px-3 py-2.5 focus-within:ring-1 focus-within:ring-voita-accent">
      {tags.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-voita-card-hover text-voita-text-secondary border border-voita-border"
        >
          {tag}
          <button
            type="button"
            onClick={() => onChange(tags.filter((t) => t !== tag))}
            className="text-voita-text-muted hover:text-voita-text"
          >
            <X size={12} />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
        placeholder={tags.length === 0 ? placeholder : ""}
        className="flex-1 min-w-[100px] bg-transparent text-sm text-voita-text placeholder-voita-text-muted focus:outline-none py-0.5"
      />
    </div>
  );
}
