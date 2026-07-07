"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";

interface ImageUploadInputProps {
  initialUrl?: string;
  onFileSelect: (file: File | null) => void;
}

export default function ImageUploadInput({
  initialUrl,
  onFileSelect,
}: ImageUploadInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(initialUrl ?? null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    onFileSelect(file);
    if (file) setPreview(URL.createObjectURL(file));
  }

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex-1 flex items-center gap-2 bg-voita-bg border border-dashed border-voita-border rounded-lg px-4 py-2.5 text-sm text-voita-text-muted hover:border-voita-accent hover:text-voita-text-secondary transition-colors"
      >
        <Upload size={15} />
        {preview ? "Change photo" : "Upload photo"}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt="Preview"
          className="w-10 h-10 rounded-full object-cover border border-voita-border shrink-0"
        />
      )}
    </div>
  );
}
