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
import { createCarWashThunk } from "@/store/slices/carWashSlice";

export default function AddCarWashForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { mutationStatus, mutationError } = useAppSelector(
    (state) => state.carWash,
  );

  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [waitTime, setWaitTime] = useState("");
  const [rating, setRating] = useState("");
  const [verified, setVerified] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = await dispatch(
      createCarWashThunk({
        payload: {
          name,
          area,
          address,
          description,
          wait_time_mins: waitTime ? Number(waitTime) : undefined,
          rating: rating ? Number(rating) : undefined,
          verified,
        },
        photoFile,
      }),
    );
    if (createCarWashThunk.fulfilled.match(result)) {
      router.push("/car-wash");
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
          placeholder="e.g. Crystal Clear Auto Spa"
          required
        />
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Area / Neighbourhood">
          <TextInput
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="e.g. Victoria Island"
          />
        </FormField>
        <FormField label="Address">
          <TextInput
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Full street address"
          />
        </FormField>
      </div>

      <FormField label="Description / About">
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe services, specialties, and experience..."
        />
      </FormField>

      <FormField label="Photo">
        <ImageUploadInput onFileSelect={setPhotoFile} />
      </FormField>

      <div className="flex flex-col sm:flex-row sm:items-end gap-4">
        <div className="grid grid-cols-2 gap-4 w-full sm:w-auto">
          <div className="sm:w-[140px]">
            <FormField label="Wait Time (mins)">
              <TextInput
                type="number"
                min={0}
                value={waitTime}
                onChange={(e) => setWaitTime(e.target.value)}
                placeholder="15"
              />
            </FormField>
          </div>
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
          onCancel={() => router.push("/car-wash")}
          saveLabel={
            mutationStatus === "loading" ? "Saving..." : "Save Car Wash"
          }
        />
      </div>
    </form>
  );
}
