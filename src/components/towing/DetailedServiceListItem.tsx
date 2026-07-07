import { Trash2 } from "lucide-react";
import { TowingDetailedService } from "@/types";
import IconKeyAvatar from "@/components/ui/IconKeyAvatar";
import Pill from "@/components/ui/Pill";

export default function DetailedServiceListItem({
  service,
  onDelete,
}: {
  service: TowingDetailedService;
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
        {service.highlighted && <Pill label="Highlighted" color="accent" />}
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
