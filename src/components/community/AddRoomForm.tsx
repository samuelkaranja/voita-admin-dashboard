"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormField from "@/components/forms/FormField";
import TextInput from "@/components/forms/TextInput";
import TextArea from "@/components/forms/TextArea";
import Select from "@/components/forms/Select";
import ImageUploadInput from "@/components/forms/ImageUploadInput";
import FormActions from "@/components/forms/FormActions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createRoomThunk } from "@/store/slices/communitySlice";
import { RoomType } from "@/types";

const TYPE_OPTIONS: { value: RoomType; label: string }[] = [
  { value: "general", label: "General" },
  { value: "brand", label: "Brand" },
];

export default function AddRoomForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { mutationStatus, mutationError } = useAppSelector(
    (state) => state.community,
  );

  const [name, setName] = useState("");
  const [type, setType] = useState<RoomType>("general");
  const [brandSlug, setBrandSlug] = useState("");
  const [description, setDescription] = useState("");
  const [rulesText, setRulesText] = useState("");
  const [iconFile, setIconFile] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = await dispatch(
      createRoomThunk({
        name,
        type,
        brandSlug: type === "brand" ? brandSlug.trim() : undefined,
        description: description.trim() || undefined,
        rulesText: rulesText.trim() || undefined,
        iconFile,
      }),
    );
    if (createRoomThunk.fulfilled.match(result)) {
      router.push("/community/chat-rooms");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {mutationStatus === "failed" && (
        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
          {mutationError}
        </p>
      )}

      <FormField label="Room Name">
        <TextInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Nairobi Drivers"
          required
        />
      </FormField>

      <FormField label="Room Type">
        <Select
          options={TYPE_OPTIONS.map((o) => o.label)}
          value={TYPE_OPTIONS.find((o) => o.value === type)?.label}
          onChange={(e) =>
            setType(
              TYPE_OPTIONS.find((o) => o.label === e.target.value)?.value ??
                "general",
            )
          }
        />
      </FormField>

      {type === "brand" && (
        <FormField label="Brand Slug">
          <TextInput
            value={brandSlug}
            onChange={(e) => setBrandSlug(e.target.value)}
            placeholder="e.g. subaru"
            required
          />
        </FormField>
      )}

      <FormField label="Description">
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What is this room about?"
          rows={3}
        />
      </FormField>

      <FormField label="Rules">
        <TextArea
          value={rulesText}
          onChange={(e) => setRulesText(e.target.value)}
          placeholder="Community guidelines for this room..."
          rows={3}
        />
      </FormField>

      <FormField label="Room Icon">
        <ImageUploadInput onFileSelect={setIconFile} />
      </FormField>

      <div className="pt-2">
        <FormActions
          onCancel={() => router.push("/community/chat-rooms")}
          saveLabel={
            mutationStatus === "loading" ? "Creating..." : "Create Room"
          }
        />
      </div>
    </form>
  );
}
