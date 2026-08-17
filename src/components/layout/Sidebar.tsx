import SidebarLink from "./SidebarLink";
import SidebarSectionHeader from "./SidebarSectionHeader";
import SidebarUserFooter from "./SidebarUserFooter";
import { SidebarLinkData } from "@/types";
import Image from "next/image";
import voitaLogo from "@/assets/voita.png";

const mainLinks: SidebarLinkData[] = [
  { label: "Overview", href: "/", icon: "grid" },
  { label: "Mechanics", href: "/mechanics", icon: "wrench" },
  { label: "Suggestions", href: "/mechanics/suggestions", icon: "inbox" },
  { label: "Car Wash", href: "/car-wash", icon: "droplet" },
  { label: "Towing", href: "/towing", icon: "truck" },
  { label: "Scouts", href: "/scouts", icon: "radar" },
  { label: "Alerts", href: "/alerts", icon: "bell" },
];

const communityLinks: SidebarLinkData[] = [
  {
    label: "Join Requests",
    href: "/community/join-requests",
    icon: "userCheck",
  },
  { label: "Chat Rooms", href: "/community/chat-rooms", icon: "messageSquare" },
];

export default function Sidebar() {
  return (
    <aside className="w-56 shrink-0 h-screen sticky top-0 bg-voita-sidebar border-r border-voita-border flex flex-col px-3 py-5">
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
          <Image
            src={voitaLogo}
            alt="Voita"
            className="w-10 h-10 object-contain"
          />
        </div>
        <div className="leading-tight">
          <p className="text-white font-semibold text-sm">Voita</p>
          <p className="text-voita-text-muted text-xs">Admin</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {mainLinks.map((link) => (
          <SidebarLink key={link.href} {...link} />
        ))}

        <SidebarSectionHeader label="Community" />
        {communityLinks.map((link) => (
          <SidebarLink key={link.href} {...link} />
        ))}
      </nav>

      <SidebarUserFooter />
    </aside>
  );
}
