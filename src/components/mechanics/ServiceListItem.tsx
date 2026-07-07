import { Trash2 } from "lucide-react";
import { MechanicService } from "@/types";
import IconKeyAvatar from "@/components/ui/IconKeyAvatar";

export default function ServiceListItem({
  service,
  onDelete,
}: {
  service: MechanicService;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-3.5 border-t border-voita-border">
      <div className="flex items-center gap-3 min-w-0">
        <IconKeyAvatar iconKey={service.iconKey} />
        <div className="min-w-0">
          <p className="text-voita-text font-medium text-sm truncate">
            {service.label}
          </p>
          <p className="text-voita-text-muted text-xs truncate">
            {service.description}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {service.highlighted && (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-voita-accent-dim text-voita-accent">
            Highlighted
          </span>
        )}
        <button
          onClick={onDelete}
          className="text-voita-text-secondary hover:text-red-400 transition-colors"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}
