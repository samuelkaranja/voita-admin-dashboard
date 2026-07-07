"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormField from "@/components/forms/FormField";
import TextInput from "@/components/forms/TextInput";
import TextArea from "@/components/forms/TextArea";
import Select from "@/components/forms/Select";
import ToggleSwitch from "@/components/forms/ToggleSwitch";
import FormActions from "@/components/forms/FormActions";

const VEHICLE_TYPES = ["Flatbed", "Roadside", "Heavy Duty"];
const AVAILABILITY_OPTIONS = ["Available", "Busy"];

export default function AddTowingForm() {
  const router = useRouter();
  const [isPartner, setIsPartner] = useState(false);
  const [verified, setVerified] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire up to POST voita-backend.fly.dev/api/v1/towing
    router.push("/towing");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <FormField label="Name">
        <TextInput placeholder="e.g. Lagos Quick Tow" required />
      </FormField>

      <FormField label="Description / About">
        <TextArea
          placeholder="Describe services and coverage area..."
          rows={4}
        />
      </FormField>

      <FormField label="Image URL">
        <TextInput placeholder="https://example.com/photo.jpg" />
      </FormField>

      <FormField label="Phone Number">
        <TextInput type="tel" placeholder="+234XXXXXXXXXX" required />
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Min ETA (mins)">
          <TextInput type="number" min={0} placeholder="15" />
        </FormField>
        <FormField label="Max ETA (mins)">
          <TextInput type="number" min={0} placeholder="30" />
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Vehicle Type">
          <Select options={VEHICLE_TYPES} defaultValue={VEHICLE_TYPES[0]} />
        </FormField>
        <FormField label="Availability">
          <Select
            options={AVAILABILITY_OPTIONS}
            defaultValue={AVAILABILITY_OPTIONS[0]}
          />
        </FormField>
      </div>

      <FormField label="Tags">
        <TextInput placeholder="e.g. Flatbed, GPS Tracking" />
      </FormField>

      <div className="flex flex-col sm:flex-row sm:items-end gap-4">
        <div className="w-full sm:max-w-[160px]">
          <FormField label="Rating (1–5)">
            <TextInput
              type="number"
              min={1}
              max={5}
              step={0.1}
              placeholder="4.5"
            />
          </FormField>
        </div>

        <div className="flex items-center gap-6 pb-0.5 sm:pb-2.5">
          <ToggleSwitch
            label="Is Partner"
            checked={isPartner}
            onChange={setIsPartner}
          />
          <ToggleSwitch
            label="Verified"
            checked={verified}
            onChange={setVerified}
          />
        </div>
      </div>

      <div className="pt-2">
        <FormActions
          onCancel={() => router.push("/towing")}
          saveLabel="Save Provider"
        />
      </div>
    </form>
  );
}
