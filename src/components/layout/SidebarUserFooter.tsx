import { UserCircle2, LogOut } from "lucide-react";

interface SidebarUserFooterProps {
  email: string;
  role: string;
}

export default function SidebarUserFooter({
  email,
  role,
}: SidebarUserFooterProps) {
  return (
    <div className="border-t border-voita-border pt-4 mt-auto">
      <div className="flex items-center gap-3 px-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-voita-card flex items-center justify-center">
          <UserCircle2 size={18} className="text-voita-text-secondary" />
        </div>
        <div className="leading-tight">
          <p className="text-sm text-voita-text">{email}</p>
          <p className="text-xs text-voita-text-muted">{role}</p>
        </div>
      </div>
      <button className="flex items-center gap-2 px-2 py-2 text-sm text-voita-text-secondary hover:text-voita-text transition-colors w-full">
        <LogOut size={16} />
        Sign out
      </button>
    </div>
  );
}
