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
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createScoutThunk } from "@/store/slices/scoutsSlice";
import { ctaTypeToBackend } from "@/lib/api/scoutsApi";
import { CtaType } from "@/types";
import ImageUploadInput from "../forms/ImageUploadInput";

const CTA_TYPES: CtaType[] = ["Book Scout", "Quick Request", "Schedule Valet"];

export default function AddScoutForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { mutationStatus, mutationError } = useAppSelector(
    (state) => state.scouts,
  );

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [ctaType, setCtaType] = useState<CtaType>("Book Scout");
  const [accentColor, setAccentColor] = useState("#10B981");
  const [rating, setRating] = useState("");
  const [missionsCompleted, setMissionsCompleted] = useState("");
  const [verified, setVerified] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = await dispatch(
      createScoutThunk({
        payload: {
          name,
          role,
          cta_type: ctaTypeToBackend(ctaType),
          bio,
          location,
          accent_color: accentColor,
          rating: rating ? Number(rating) : undefined,
          missions_completed: missionsCompleted
            ? Number(missionsCompleted)
            : undefined,
          is_verified: verified,
        },
        photoFile,
      }),
    );
    if (createScoutThunk.fulfilled.match(result)) {
      router.push("/scouts");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {mutationStatus === "failed" && (
        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
          {mutationError}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Name">
          <TextInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Emeka Osei"
            required
          />
        </FormField>
        <FormField label="Role / Title">
          <TextInput
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Expert Quote Auditor"
            required
          />
        </FormField>
      </div>

      <FormField label="Bio">
        <TextArea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Scout biography and expertise..."
        />
      </FormField>

      <FormField label="Location">
        <TextInput
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Lagos, Nigeria"
        />
      </FormField>

      <FormField label="Avatar">
        <ImageUploadInput onFileSelect={setPhotoFile} />
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="CTA Type">
          <Select
            options={CTA_TYPES}
            value={ctaType}
            onChange={(e) => setCtaType(e.target.value as CtaType)}
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
                placeholder="4.5"
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
                placeholder="0"
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
          saveLabel={mutationStatus === "loading" ? "Saving..." : "Save Scout"}
        />
      </div>
    </form>
  );
}
