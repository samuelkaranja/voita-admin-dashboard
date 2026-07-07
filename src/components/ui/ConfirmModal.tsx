"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDangerous?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isDangerous = true,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  // Prevent background scroll while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        className="relative w-full max-w-sm bg-voita-card border border-voita-border rounded-xl p-6 shadow-xl animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="flex items-start gap-3">
          <div
            className={
              isDangerous
                ? "shrink-0 w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center"
                : "shrink-0 w-10 h-10 rounded-full bg-voita-accent-dim flex items-center justify-center"
            }
          >
            <AlertTriangle
              size={18}
              className={isDangerous ? "text-red-400" : "text-voita-accent"}
            />
          </div>
          <div className="flex-1 pt-1">
            <h3
              id="confirm-modal-title"
              className="text-voita-text font-semibold text-sm"
            >
              {title}
            </h3>
            <p className="text-voita-text-secondary text-sm mt-1.5 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-voita-border text-voita-text-secondary text-sm font-medium hover:bg-voita-card-hover transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={
              isDangerous
                ? "px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
                : "px-4 py-2 rounded-lg bg-voita-accent text-voita-bg text-sm font-semibold hover:opacity-90 transition-colors"
            }
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
