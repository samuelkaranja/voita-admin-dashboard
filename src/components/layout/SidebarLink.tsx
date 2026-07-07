"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Wrench,
  Droplet,
  Truck,
  Radar,
  LucideIcon,
} from "lucide-react";
import clsx from "clsx";
import { SidebarLinkData } from "@/types";

const iconMap: Record<SidebarLinkData["icon"], LucideIcon> = {
  grid: LayoutGrid,
  wrench: Wrench,
  droplet: Droplet,
  truck: Truck,
  radar: Radar,
};

export default function SidebarLink({ label, href, icon }: SidebarLinkData) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const Icon = iconMap[icon];

  return (
    <Link
      href={href}
      className={clsx(
        "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
        isActive
          ? "bg-voita-accent-dim text-voita-accent"
          : "text-voita-text-secondary hover:text-voita-text hover:bg-voita-card",
      )}
    >
      <Icon size={18} strokeWidth={2} />
      {label}
    </Link>
  );
}
