"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CommunityRoom } from "@/types";
import FormField from "@/components/forms/FormField";
import TextInput from "@/components/forms/TextInput";
import TextArea from "@/components/forms/TextArea";
import ImageUploadInput from "@/components/forms/ImageUploadInput";
import FormActions from "@/components/forms/FormActions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateRoomThunk } from "@/store/slices/communitySlice";

export default function EditRoomForm({ room }: { room: CommunityRoom }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { mutationStatus, mutationError } = useAppSelector(
    (state) => state.community,
  );

  const [name, setName] = useState(room.name);
  const [description, setDescription] = useState(room.description ?? "");
  const [rulesText, setRulesText] = useState(room.rulesText ?? "");
  const [iconFile, setIconFile] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = await dispatch(
      updateRoomThunk({
        roomId: room.id,
        payload: {
          name,
          description: description.trim() || undefined,
          rulesText: rulesText.trim() || undefined,
          iconFile,
        },
      }),
    );
    if (updateRoomThunk.fulfilled.match(result)) {
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
          required
        />
      </FormField>

      <FormField label="Description">
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </FormField>

      <FormField label="Rules">
        <TextArea
          value={rulesText}
          onChange={(e) => setRulesText(e.target.value)}
          rows={3}
        />
      </FormField>

      <FormField label="Room Icon">
        <ImageUploadInput
          initialUrl={room.iconUrl ?? undefined}
          onFileSelect={setIconFile}
        />
      </FormField>

      <p className="text-voita-text-muted text-xs -mt-2">
        Room type ({room.type === "brand" ? "Brand" : "General"}) cannot be
        changed after creation.
      </p>

      <div className="pt-2">
        <FormActions
          onCancel={() => router.push("/community/chat-rooms")}
          saveLabel={mutationStatus === "loading" ? "Saving..." : "Update Room"}
        />
      </div>
    </form>
  );
}
