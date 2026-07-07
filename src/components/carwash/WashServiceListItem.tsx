import { Trash2 } from "lucide-react";
import { CarWashService } from "@/types";
import IconKeyAvatar from "@/components/ui/IconKeyAvatar";
import Pill from "@/components/ui/Pill";
import PriceLabel from "@/components/ui/PriceLabel";

export default function WashServiceListItem({
  service,
  onDelete,
}: {
  service: CarWashService;
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
        <PriceLabel amount={service.price} />
        {service.premium && <Pill label="Premium" color="amber" />}
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
