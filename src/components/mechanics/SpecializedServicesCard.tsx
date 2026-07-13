"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import ListSectionHeader from "@/components/ui/ListSectionHeader";
import ServiceListItem from "@/components/mechanics/ServiceListItem";
import TextInput from "@/components/forms/TextInput";
import ToggleSwitch from "@/components/forms/ToggleSwitch";
import { MechanicService } from "@/types";
import { useAppDispatch } from "@/store/hooks";
import {
  addMechanicServiceThunk,
  deleteMechanicServiceThunk,
} from "@/store/slices/mechanicsSlice";
import IconKeySelect from "../forms/IconKeySelect";

interface SpecializedServicesCardProps {
  mechanicId: string;
  services: MechanicService[];
}

export default function SpecializedServicesCard({
  mechanicId,
  services,
}: SpecializedServicesCardProps) {
  const dispatch = useAppDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [label, setLabel] = useState("");
  const [iconKey, setIconKey] = useState("");
  const [description, setDescription] = useState("");
  const [highlighted, setHighlighted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function resetForm() {
    setLabel("");
    setIconKey("");
    setDescription("");
    setHighlighted(false);
    setIsAdding(false);
  }

  async function handleAdd() {
    if (!label.trim()) return;
    setSubmitting(true);
    await dispatch(
      addMechanicServiceThunk({
        mechanicId,
        payload: {
          label: label.trim(),
          description: description.trim(),
          icon: iconKey.trim() || "wrench",
          highlighted,
        },
      }),
    );
    setSubmitting(false);
    resetForm();
  }

  function handleDelete(serviceId: string) {
    dispatch(deleteMechanicServiceThunk({ mechanicId, serviceId }));
  }

  return (
    <Card>
      <ListSectionHeader
        title="Specialized Services"
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
            <IconKeySelect value={iconKey} onChange={setIconKey} />
          </div>
          <TextInput
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <div className="flex items-center justify-between flex-wrap gap-3">
            <ToggleSwitch
              label="Highlighted"
              checked={highlighted}
              onChange={setHighlighted}
            />
            <div className="flex items-center gap-2">
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
                disabled={submitting}
                className="px-4 py-2 rounded-lg bg-voita-accent text-voita-bg text-xs font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {submitting ? "Adding..." : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        {services.map((service) => (
          <ServiceListItem
            key={service.id}
            service={service}
            onDelete={() => handleDelete(service.id)}
          />
        ))}
      </div>
    </Card>
  );
}
