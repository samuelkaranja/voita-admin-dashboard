"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import ListSectionHeader from "@/components/ui/ListSectionHeader";
import WashServiceListItem from "@/components/carwash/WashServiceListItem";
import TextInput from "@/components/forms/TextInput";
import TextArea from "@/components/forms/TextArea";
import ToggleSwitch from "@/components/forms/ToggleSwitch";
import { CarWashService } from "@/types";
import { useAppDispatch } from "@/store/hooks";
import {
  addCarWashServiceThunk,
  deleteCarWashServiceThunk,
} from "@/store/slices/carWashSlice";
import IconKeySelect from "../forms/IconKeySelect";

interface WashServicesCardProps {
  carWashId: string;
  services: CarWashService[];
}

export default function WashServicesCard({
  carWashId,
  services,
}: WashServicesCardProps) {
  const dispatch = useAppDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [label, setLabel] = useState("");
  const [iconKey, setIconKey] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [premium, setPremium] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function resetForm() {
    setLabel("");
    setIconKey("");
    setDescription("");
    setPrice("");
    setPremium(false);
    setIsAdding(false);
  }

  async function handleAdd() {
    if (!label.trim()) return;
    setSubmitting(true);
    await dispatch(
      addCarWashServiceThunk({
        carWashId,
        payload: {
          label: label.trim(),
          description: description.trim(),
          icon: iconKey.trim() || "sparkles",
          price: price ? `Kshs${price}` : undefined,
          is_premium: premium,
        },
      }),
    );
    setSubmitting(false);
    resetForm();
  }

  function handleDelete(serviceId: string) {
    dispatch(deleteCarWashServiceThunk({ carWashId, serviceId }));
  }

  return (
    <Card>
      <ListSectionHeader
        title="Wash Services"
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
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={2}
          />
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="w-full sm:max-w-[160px]">
              <TextInput
                type="number"
                min={0}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price (Kshs)"
              />
            </div>
            <ToggleSwitch
              label="Premium"
              checked={premium}
              onChange={setPremium}
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
              disabled={submitting}
              className="px-4 py-2 rounded-lg bg-voita-accent text-voita-bg text-xs font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {submitting ? "Adding..." : "Add"}
            </button>
          </div>
        </div>
      )}

      <div>
        {services.map((service) => (
          <WashServiceListItem
            key={service.id}
            service={service}
            onDelete={() => handleDelete(service.id)}
          />
        ))}
      </div>
    </Card>
  );
}
