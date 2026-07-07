import { Trash2, Shield } from "lucide-react";
import { InsurancePartner } from "@/types";

export default function PartnerListItem({
  partner,
  onDelete,
}: {
  partner: InsurancePartner;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 bg-voita-bg border border-voita-border rounded-lg px-4 py-3">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-7 h-7 shrink-0 rounded-full bg-voita-card-hover flex items-center justify-center">
          <Shield size={13} className="text-voita-text-secondary" />
        </div>
        <span className="text-voita-text text-sm font-medium truncate">
          {partner.name}
        </span>
      </div>
      <button
        onClick={onDelete}
        className="text-voita-text-secondary hover:text-red-400 transition-colors shrink-0"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
