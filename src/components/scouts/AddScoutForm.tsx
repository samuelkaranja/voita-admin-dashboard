"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormField from "@/components/forms/FormField";
import TextInput from "@/components/forms/TextInput";
import TextArea from "@/components/forms/TextArea";
import Select from "@/components/forms/Select";
import ColorPickerInput from "@/components/forms/ColorPickerInput";
import ToggleSwitch from "@/components/forms/ToggleSwitch";
import FormActions from "@/components/forms/FormActions";

const CTA_TYPES = ["Book Scout", "Quick Request", "Schedule Valet"];

export default function AddScoutForm() {
  const router = useRouter();
  const [verified, setVerified] = useState(false);
  const [accentColor, setAccentColor] = useState("#10B981");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire up to POST voita-backend.fly.dev/api/v1/scouts
    router.push("/scouts");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Name">
          <TextInput placeholder="e.g. Emeka Osei" required />
        </FormField>
        <FormField label="Role / Title">
          <TextInput placeholder="e.g. Expert Quote Auditor" required />
        </FormField>
      </div>

      <FormField label="Bio">
        <TextArea placeholder="Scout biography and expertise..." rows={4} />
      </FormField>

      <FormField label="Location">
        <TextInput placeholder="e.g. Lagos, Nigeria" />
      </FormField>

      <FormField label="Avatar URL">
        <TextInput placeholder="https://example.com/avatar.jpg" />
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="CTA Type">
          <Select options={CTA_TYPES} defaultValue={CTA_TYPES[0]} />
        </FormField>
        <FormField label="Accent Color">
          <ColorPickerInput value={accentColor} onChange={setAccentColor} />
        </FormField>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end gap-4">
        <div className="grid grid-cols-2 gap-4 w-full sm:w-auto">
          <div className="sm:w-[140px]">
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
          <div className="sm:w-[160px]">
            <FormField label="Missions Completed">
              <TextInput type="number" min={0} placeholder="0" />
            </FormField>
          </div>
        </div>

        <div className="pb-0.5 sm:pb-2.5">
          <ToggleSwitch
            label="Verified"
            checked={verified}
            onChange={setVerified}
          />
        </div>
      </div>

      <div className="pt-2">
        <FormActions
          onCancel={() => router.push("/scouts")}
          saveLabel="Save Scout"
        />
      </div>
    </form>
  );
}
