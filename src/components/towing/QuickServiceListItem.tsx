import { Trash2 } from "lucide-react";
import { TowingQuickService } from "@/types";
import IconKeyAvatar from "@/components/ui/IconKeyAvatar";

export default function QuickServiceListItem({
  service,
  onDelete,
}: {
  service: TowingQuickService;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-3.5 border-t border-voita-border">
      <div className="flex items-center gap-3 min-w-0">
        <IconKeyAvatar iconKey={service.iconKey} />
        <p className="text-voita-text font-medium text-sm truncate">
          {service.label}
        </p>
      </div>
      <button
        onClick={onDelete}
        className="text-voita-text-secondary hover:text-red-400 transition-colors shrink-0"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}
