interface FormActionsProps {
  onCancel: () => void;
  saveLabel: string;
}

export default function FormActions({ onCancel, saveLabel }: FormActionsProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onCancel}
        className="px-5 py-2.5 rounded-lg border border-voita-border text-voita-text-secondary text-sm font-medium hover:bg-voita-card transition-colors"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="px-5 py-2.5 rounded-lg bg-voita-accent text-voita-bg text-sm font-semibold hover:opacity-90 transition-opacity"
      >
        {saveLabel}
      </button>
    </div>
  );
}
