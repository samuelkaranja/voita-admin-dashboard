"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import ListSectionHeader from "@/components/ui/ListSectionHeader";
import QuickServiceListItem from "@/components/towing/QuickServiceListItem";
import TextInput from "@/components/forms/TextInput";
import { TowingQuickService } from "@/types";

interface QuickServicesCardProps {
  services: TowingQuickService[];
  onChange: (services: TowingQuickService[]) => void;
}

export default function QuickServicesCard({
  services,
  onChange,
}: QuickServicesCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [label, setLabel] = useState("");
  const [iconKey, setIconKey] = useState("");

  function resetForm() {
    setLabel("");
    setIconKey("");
    setIsAdding(false);
  }

  function handleAdd() {
    if (!label.trim()) return;
    onChange([
      ...services,
      {
        id: crypto.randomUUID(),
        label: label.trim(),
        iconKey: iconKey.trim() || "wrench",
      },
    ]);
    resetForm();
  }

  return (
    <Card>
      <ListSectionHeader
        title="Quick Services"
        count={services.length}
        onAddClick={() => setIsAdding(true)}
      />

      {isAdding && (
        <div className="px-5 sm:px-6 pb-5 border-t border-voita-border pt-4 flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <TextInput
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Label"
            />
            <TextInput
              value={iconKey}
              onChange={(e) => setIconKey(e.target.value)}
              placeholder="Icon Key"
            />
          </div>
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 rounded-lg border border-voita-border text-voita-text-secondary text-xs font-medium hover:bg-voita-card-hover transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAdd}
              className="px-4 py-2 rounded-lg bg-voita-accent text-voita-bg text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              Add
            </button>
          </div>
        </div>
      )}

      <div>
        {services.map((service) => (
          <QuickServiceListItem
            key={service.id}
            service={service}
            onDelete={() =>
              onChange(services.filter((s) => s.id !== service.id))
            }
          />
        ))}
      </div>
    </Card>
  );
}
