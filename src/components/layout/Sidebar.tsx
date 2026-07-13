"use client";

import { Leaf, X } from "lucide-react";
import SidebarLink from "./SidebarLink";
import SidebarUserFooter from "./SidebarUserFooter";
import { SidebarLinkData } from "@/types";
import { useSidebar } from "@/context/SidebarContext";
import clsx from "clsx";

const links: SidebarLinkData[] = [
  { label: "Overview", href: "/", icon: "grid" },
  { label: "Mechanics", href: "/mechanics", icon: "wrench" },
  { label: "Car Wash", href: "/car-wash", icon: "droplet" },
  { label: "Towing", href: "/towing", icon: "truck" },
  { label: "Scouts", href: "/scouts", icon: "radar" },
];

export default function Sidebar() {
  const { isOpen, close } = useSidebar();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={close}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={clsx(
          "w-64 lg:w-56 shrink-0 h-screen bg-voita-sidebar border-r border-voita-border flex flex-col px-3 py-5",
          "fixed top-0 left-0 z-50 transition-transform duration-200 ease-in-out",
          "lg:sticky lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-voita-accent flex items-center justify-center">
              <Leaf size={16} className="text-voita-bg" />
            </div>
            <div className="leading-tight">
              <p className="text-white font-semibold text-sm">Voita</p>
              <p className="text-voita-text-muted text-xs">Admin</p>
            </div>
          </div>

          <button
            onClick={close}
            className="lg:hidden text-voita-text-secondary"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {links.map((link) => (
            <div key={link.href} onClick={close}>
              <SidebarLink {...link} />
            </div>
          ))}
        </nav>

        <SidebarUserFooter />
      </aside>
    </>
  );
}
