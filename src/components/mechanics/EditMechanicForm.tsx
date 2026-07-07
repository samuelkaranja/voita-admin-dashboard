"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mechanic } from "@/types";
import FormField from "@/components/forms/FormField";
import TextInput from "@/components/forms/TextInput";
import TextArea from "@/components/forms/TextArea";
import TagInput from "@/components/forms/TagInput";
import ImageUploadInput from "@/components/forms/ImageUploadInput";
import ToggleSwitch from "@/components/forms/ToggleSwitch";
import FormActions from "@/components/forms/FormActions";

export default function EditMechanicForm({ mechanic }: { mechanic: Mechanic }) {
  const router = useRouter();
  const [name, setName] = useState(mechanic.name);
  const [address, setAddress] = useState(mechanic.address);
  const [primarySpecialty, setPrimarySpecialty] = useState(
    mechanic.primarySpecialty,
  );
  const [specialties, setSpecialties] = useState<string[]>(
    mechanic.specialties,
  );
  const [description, setDescription] = useState(mechanic.description);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [rating, setRating] = useState(mechanic.rating.toString());
  const [verified, setVerified] = useState(mechanic.verified);
  const [availableToday, setAvailableToday] = useState(mechanic.availableToday);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: if imageFile is set, upload to Cloudinary first, then PATCH
    // voita-backend.fly.dev/api/v1/mechanics/{mechanic.id} with the resulting URL + form fields
    router.push("/mechanics");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <FormField label="Name">
        <TextInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </FormField>

      <FormField label="Address">
        <TextInput
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </FormField>

      <FormField label="Primary Specialty">
        <TextInput
          value={primarySpecialty}
          onChange={(e) => setPrimarySpecialty(e.target.value)}
          required
        />
      </FormField>

      <FormField label="Specialties / Tags">
        <TagInput
          tags={specialties}
          onChange={setSpecialties}
          placeholder="Add a specialty and press Enter"
        />
      </FormField>

      <FormField label="Description / About">
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </FormField>

      <FormField label="Photo">
        <ImageUploadInput
          initialUrl={mechanic.avatarUrl}
          onFileSelect={setImageFile}
        />
      </FormField>

      <div className="flex flex-col sm:flex-row sm:items-end gap-4">
        <div className="w-full sm:max-w-[160px]">
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

        <div className="flex items-center gap-6 pb-0.5 sm:pb-2.5">
          <ToggleSwitch
            label="Verified"
            checked={verified}
            onChange={setVerified}
          />
          <ToggleSwitch
            label="Available Today"
            checked={availableToday}
            onChange={setAvailableToday}
          />
        </div>
      </div>

      <div className="pt-2">
        <FormActions
          onCancel={() => router.push("/mechanics")}
          saveLabel="Update Mechanic"
        />
      </div>
    </form>
  );
}
