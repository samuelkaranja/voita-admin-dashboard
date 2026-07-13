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
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateMechanicThunk } from "@/store/slices/mechanicsSlice";

export default function EditMechanicForm({ mechanic }: { mechanic: Mechanic }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { mutationStatus, mutationError } = useAppSelector(
    (state) => state.mechanics,
  );

  const [name, setName] = useState(mechanic.name);
  const [address, setAddress] = useState(mechanic.address);
  const [specialty, setSpecialty] = useState(mechanic.primarySpecialty);
  const [description, setDescription] = useState(mechanic.description);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [rating, setRating] = useState(mechanic.rating.toString());
  const [verified, setVerified] = useState(mechanic.verified);
  const [availableToday, setAvailableToday] = useState(mechanic.availableToday);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = await dispatch(
      updateMechanicThunk({
        id: mechanic.id,
        payload: {
          name,
          address,
          specialty,
          description,
          rating: rating ? Number(rating) : undefined,
          verified,
          available_today: availableToday,
        },
        photoFile,
      }),
    );
    if (updateMechanicThunk.fulfilled.match(result)) {
      router.push("/mechanics");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {mutationStatus === "failed" && (
        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
          {mutationError}
        </p>
      )}

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
        />
      </FormField>

      <FormField label="Primary Specialty">
        <TextInput
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
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
          onFileSelect={setPhotoFile}
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
          saveLabel={
            mutationStatus === "loading" ? "Saving..." : "Update Mechanic"
          }
        />
      </div>
    </form>
  );
}
