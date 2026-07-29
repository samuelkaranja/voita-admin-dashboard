import { Phone, MapPin, Wrench } from "lucide-react";
import { MechanicSuggestion } from "@/types";
import Pill from "@/components/ui/Pill";

const STATUS_COLOR: Record<
  MechanicSuggestion["status"],
  "accent" | "amber" | "red"
> = {
  pending: "amber",
  approved: "accent",
  rejected: "red",
};

interface SuggestionCardProps {
  suggestion: MechanicSuggestion;
  onApprove: () => void;
  onReject: () => void;
  isMutating: boolean;
}

export default function SuggestionCard({
  suggestion,
  onApprove,
  onReject,
  isMutating,
}: SuggestionCardProps) {
  return (
    <div className="bg-voita-card border border-voita-border rounded-xl p-4 sm:p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-voita-text font-semibold text-sm">
              {suggestion.name}
            </p>
            {suggestion.status !== "pending" && (
              <Pill
                label={
                  suggestion.status === "approved" ? "Approved" : "Rejected"
                }
                color={STATUS_COLOR[suggestion.status]}
              />
            )}
          </div>
          <p className="text-voita-text-muted text-xs mt-1">
            Submitted{" "}
            {new Date(suggestion.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        {suggestion.status === "pending" && (
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={onApprove}
              disabled={isMutating}
              className="px-4 py-2 rounded-lg bg-voita-accent-dim text-voita-accent text-xs font-semibold hover:bg-voita-accent hover:text-voita-bg transition-colors disabled:opacity-50"
            >
              {isMutating ? "..." : "Approve"}
            </button>
            <button
              onClick={onReject}
              disabled={isMutating}
              className="px-4 py-2 rounded-lg border border-red-500/40 text-red-400 text-xs font-semibold hover:bg-red-500/10 transition-colors disabled:opacity-50"
            >
              {isMutating ? "..." : "Reject"}
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 flex-wrap text-xs text-voita-text-secondary">
        <span className="flex items-center gap-1.5">
          <Phone size={12} className="text-voita-text-muted" />
          {suggestion.phone}
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin size={12} className="text-voita-text-muted" />
          {suggestion.location}
        </span>
        <span className="flex items-center gap-1.5">
          <Wrench size={12} className="text-voita-text-muted" />
          {suggestion.specialty}
        </span>
      </div>

      <p className="text-voita-text-secondary text-sm">{suggestion.reason}</p>
    </div>
  );
}
