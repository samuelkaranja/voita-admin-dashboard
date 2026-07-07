"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Scout } from "@/types";
import FormField from "@/components/forms/FormField";
import TextInput from "@/components/forms/TextInput";
import TextArea from "@/components/forms/TextArea";
import Select from "@/components/forms/Select";
import ImageUploadInput from "@/components/forms/ImageUploadInput";
import ColorPickerInput from "@/components/forms/ColorPickerInput";
import ToggleSwitch from "@/components/forms/ToggleSwitch";
import FormActions from "@/components/forms/FormActions";

const CTA_TYPES = ["Book Scout", "Quick Request", "Schedule Valet"];

export default function EditScoutForm({ scout }: { scout: Scout }) {
  const router = useRouter();
  const [name, setName] = useState(scout.name);
  const [role, setRole] = useState(scout.role);
  const [bio, setBio] = useState(scout.bio);
  const [location, setLocation] = useState(scout.location);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [ctaType, setCtaType] = useState(scout.ctaType);
  const [accentColor, setAccentColor] = useState(scout.accentColor);
  const [rating, setRating] = useState(scout.rating.toString());
  const [missionsCompleted, setMissionsCompleted] = useState(
    scout.missionsCompleted.toString(),
  );
  const [verified, setVerified] = useState(scout.verified);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: if imageFile is set, upload to Cloudinary first, then PATCH
    // voita-backend.fly.dev/api/v1/scouts/{scout.id} with the resulting URL + form fields
    router.push("/scouts");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Name">
          <TextInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormField>
        <FormField label="Role / Title">
          <TextInput
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </FormField>
      </div>

      <FormField label="Bio">
        <TextArea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
        />
      </FormField>

      <FormField label="Location">
        <TextInput
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </FormField>

      <FormField label="Avatar">
        <ImageUploadInput
          initialUrl={scout.avatarUrl}
          onFileSelect={setImageFile}
        />
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="CTA Type">
          <Select
            options={CTA_TYPES}
            value={ctaType}
            onChange={(e) => setCtaType(e.target.value as typeof ctaType)}
          />
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
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </FormField>
          </div>
          <div className="sm:w-[160px]">
            <FormField label="Missions Completed">
              <TextInput
                type="number"
                min={0}
                value={missionsCompleted}
                onChange={(e) => setMissionsCompleted(e.target.value)}
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

      <div className="pt-2">
        <FormActions
          onCancel={() => router.push("/scouts")}
          saveLabel="Update Scout"
        />
      </div>
    </form>
  );
}
