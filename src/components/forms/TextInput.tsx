import { InputHTMLAttributes } from "react";

export default function TextInput(
  props: InputHTMLAttributes<HTMLInputElement>,
) {
  return (
    <input
      {...props}
      className="w-full bg-voita-bg border border-voita-border rounded-lg px-4 py-2.5 text-sm text-voita-text placeholder-voita-text-muted focus:outline-none focus:ring-1 focus:ring-voita-accent"
    />
  );
}
