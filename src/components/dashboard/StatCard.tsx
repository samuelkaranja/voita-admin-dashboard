import { Wrench, Droplet, Truck, Radar, LucideIcon } from "lucide-react";
import { StatCardData } from "@/types";

const iconMap: Record<StatCardData["icon"], LucideIcon> = {
  wrench: Wrench,
  droplet: Droplet,
  truck: Truck,
  radar: Radar,
};

export default function StatCard({ label, value, icon }: StatCardData) {
  const Icon = iconMap[icon];

  return (
    <div className="bg-voita-card border-b-2 border-voita-accent rounded-xl p-4 sm:p-5 flex flex-col gap-3 sm:gap-4">
      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-voita-accent-dim flex items-center justify-center">
        <Icon size={16} className="text-voita-accent" />
      </div>
      <div>
        <p className="text-2xl sm:text-3xl font-bold text-voita-text">
          {value}
        </p>
        <p className="text-xs sm:text-sm text-voita-text-secondary mt-1">
          {label}
        </p>
      </div>
    </div>
  );
}
