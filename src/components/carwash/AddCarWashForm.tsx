"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormField from "@/components/forms/FormField";
import TextInput from "@/components/forms/TextInput";
import TextArea from "@/components/forms/TextArea";
import ToggleSwitch from "@/components/forms/ToggleSwitch";
import FormActions from "@/components/forms/FormActions";

export default function AddCarWashForm() {
  const router = useRouter();
  const [verified, setVerified] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire up to POST voita-backend.fly.dev/api/v1/car-wash
    router.push("/car-wash");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <FormField label="Name">
        <TextInput placeholder="e.g. Crystal Clear Auto Spa" required />
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Area / Neighbourhood">
          <TextInput placeholder="e.g. Victoria Island" required />
        </FormField>
        <FormField label="Address">
          <TextInput placeholder="Full street address" required />
        </FormField>
      </div>

      <FormField label="Description / About">
        <TextArea
          placeholder="Describe services, specialties, and experience..."
          rows={4}
        />
      </FormField>

      <FormField label="Image URL">
        <TextInput placeholder="https://example.com/photo.jpg" />
      </FormField>

      <div className="flex flex-col sm:flex-row sm:items-end gap-4">
        <div className="grid grid-cols-2 gap-4 w-full sm:w-auto">
          <div className="sm:w-[140px]">
            <FormField label="Wait Time (mins)">
              <TextInput type="number" min={0} placeholder="15" />
            </FormField>
          </div>
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
        </div>

        <div className="pb-0.5 sm:pb-2.5">
          <ToggleSwitch
            label="Verified"
            checked={verified}
            onChange={setVerified}
          />
        </div>
      </div>

      <FormField label="Tags">
        <TextInput placeholder="e.g. Full Detail, Eco-Wax" />
      </FormField>

      <div className="pt-2">
        <FormActions
          onCancel={() => router.push("/car-wash")}
          saveLabel="Save Car Wash"
        />
      </div>
    </form>
  );
}
