import { TextareaHTMLAttributes } from "react";

export default function TextArea(
  props: TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return (
    <textarea
      {...props}
      rows={props.rows ?? 4}
      className="w-full bg-voita-bg border border-voita-border rounded-lg px-4 py-2.5 text-sm text-voita-text placeholder-voita-text-muted focus:outline-none focus:ring-1 focus:ring-voita-accent resize-none"
    />
  );
}
