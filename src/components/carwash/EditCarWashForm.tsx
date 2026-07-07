"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CarWash } from "@/types";
import FormField from "@/components/forms/FormField";
import TextInput from "@/components/forms/TextInput";
import TextArea from "@/components/forms/TextArea";
import TagInput from "@/components/forms/TagInput";
import ImageUploadInput from "@/components/forms/ImageUploadInput";
import ToggleSwitch from "@/components/forms/ToggleSwitch";
import FormActions from "@/components/forms/FormActions";

export default function EditCarWashForm({ carWash }: { carWash: CarWash }) {
  const router = useRouter();
  const [name, setName] = useState(carWash.name);
  const [area, setArea] = useState(carWash.area);
  const [address, setAddress] = useState(carWash.address);
  const [description, setDescription] = useState(carWash.description);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [waitTime, setWaitTime] = useState(carWash.waitTimeMins.toString());
  const [rating, setRating] = useState(carWash.rating.toString());
  const [verified, setVerified] = useState(carWash.verified);
  const [tags, setTags] = useState<string[]>(carWash.tags);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: if imageFile is set, upload to Cloudinary first, then PATCH
    // voita-backend.fly.dev/api/v1/car-wash/{carWash.id} with the resulting URL + form fields
    router.push("/car-wash");
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Area / Neighbourhood">
          <TextInput
            value={area}
            onChange={(e) => setArea(e.target.value)}
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
      </div>

      <FormField label="Description / About">
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </FormField>

      <FormField label="Photo">
        <ImageUploadInput
          initialUrl={carWash.avatarUrl}
          onFileSelect={setImageFile}
        />
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
        <TagInput
          tags={tags}
          onChange={setTags}
          placeholder="Add a tag and press Enter"
        />
      </FormField>

      <div className="pt-2">
        <FormActions
          onCancel={() => router.push("/car-wash")}
          saveLabel="Update Car Wash"
        />
      </div>
    </form>
  );
}
