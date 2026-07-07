"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import Card from "@/components/ui/Card";

interface TagsCardProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

export default function TagsCard({ tags, onChange }: TagsCardProps) {
  const [inputValue, setInputValue] = useState("");

  function handleAdd() {
    const trimmed = inputValue.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
      setInputValue("");
    }
  }

  return (
    <Card>
      <div className="px-5 sm:px-6 py-4">
        <h3 className="text-voita-text font-semibold text-sm">Tags</h3>
        <p className="text-voita-text-muted text-xs mt-0.5">
          {tags.length} {tags.length === 1 ? "tag" : "tags"}
        </p>
      </div>

      <div className="px-5 sm:px-6 pb-5 flex flex-col gap-3 border-t border-voita-border pt-4">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-voita-accent-dim text-voita-accent"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => onChange(tags.filter((t) => t !== tag))}
                  className="hover:opacity-70"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), handleAdd())
            }
            placeholder="Add a tag..."
            className="flex-1 bg-voita-bg border border-voita-border rounded-lg px-4 py-2.5 text-sm text-voita-text placeholder-voita-text-muted focus:outline-none focus:ring-1 focus:ring-voita-accent"
          />
          <button
            type="button"
            onClick={handleAdd}
            className="shrink-0 w-10 h-10 rounded-lg bg-voita-accent text-voita-bg flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            <Plus size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </Card>
  );
}
