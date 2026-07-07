import {
  Cpu,
  Zap,
  Wrench,
  Shield,
  Sparkles,
  Home,
  Truck,
  Anchor,
  Battery,
  Circle,
  Search,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  cpu: Cpu,
  zap: Zap,
  wrench: Wrench,
  shield: Shield,
  sparkles: Sparkles,
  home: Home,
  truck: Truck,
  anchor: Anchor,
  battery: Battery,
  circle: Circle,
  search: Search,
};

export default function IconKeyAvatar({ iconKey }: { iconKey: string }) {
  const Icon = iconMap[iconKey.toLowerCase()] ?? Wrench;
  return (
    <div className="w-9 h-9 shrink-0 rounded-lg bg-voita-bg border border-voita-border flex items-center justify-center">
      <Icon size={16} className="text-voita-text-secondary" />
    </div>
  );
}
