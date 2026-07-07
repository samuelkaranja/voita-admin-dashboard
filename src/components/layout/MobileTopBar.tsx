"use client";

import { Menu, Leaf } from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";

export default function MobileTopBar() {
  const { toggle } = useSidebar();

  return (
    <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-voita-sidebar border-b border-voita-border sticky top-0 z-30">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-voita-accent flex items-center justify-center">
          <Leaf size={14} className="text-voita-bg" />
        </div>
        <p className="text-white font-semibold text-sm">Voita Admin</p>
      </div>

      <button onClick={toggle} className="text-voita-text-secondary p-1">
        <Menu size={22} />
      </button>
    </header>
  );
}
