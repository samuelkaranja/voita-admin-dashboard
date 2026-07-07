"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormField from "@/components/forms/FormField";
import TextInput from "@/components/forms/TextInput";
import TextArea from "@/components/forms/TextArea";
import ImageUploadInput from "@/components/forms/ImageUploadInput";
import ToggleSwitch from "@/components/forms/ToggleSwitch";
import FormActions from "@/components/forms/FormActions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createMechanicThunk } from "@/store/slices/mechanicsSlice";

export default function AddMechanicForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { mutationStatus, mutationError } = useAppSelector(
    (state) => state.mechanics,
  );

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [description, setDescription] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [rating, setRating] = useState("");
  const [verified, setVerified] = useState(false);
  const [availableToday, setAvailableToday] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = await dispatch(
      createMechanicThunk({
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
    if (createMechanicThunk.fulfilled.match(result)) {
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
          placeholder="e.g. James Okonkwo"
          required
        />
      </FormField>

      <FormField label="Address">
        <TextInput
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="e.g. 14 Broad Street, Lagos Island"
        />
      </FormField>

      <FormField label="Primary Specialty">
        <TextInput
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          placeholder="e.g. Engine Tuning"
        />
      </FormField>

      <FormField label="Description / About">
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description of experience and expertise..."
        />
      </FormField>

      <FormField label="Photo">
        <ImageUploadInput onFileSelect={setPhotoFile} />
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
              placeholder="4.5"
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
            mutationStatus === "loading" ? "Saving..." : "Save Mechanic"
          }
        />
      </div>
    </form>
  );
}
