"use client";

import { UserCircle2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";

const ROLE_LABELS: Record<string, string> = {
  admin: "Admin",
  super_admin: "Super Admin",
};

export default function SidebarUserFooter() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  function handleSignOut() {
    dispatch(logout());
    router.push("/login");
  }

  if (!user) return null;

  const displayName =
    `${user.first_name} ${user.last_name}`.trim() || user.phone;

  return (
    <div className="border-t border-voita-border pt-4 mt-auto">
      <div className="flex items-center gap-3 px-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-voita-card flex items-center justify-center">
          <UserCircle2 size={18} className="text-voita-text-secondary" />
        </div>
        <div className="leading-tight">
          <p className="text-sm text-voita-text">{displayName}</p>
          <p className="text-xs text-voita-text-muted">
            {ROLE_LABELS[user.role] ?? user.role}
          </p>
        </div>
      </div>
      <button
        onClick={handleSignOut}
        className="flex items-center gap-2 px-2 py-2 text-sm text-voita-text-secondary hover:text-voita-text transition-colors w-full"
      >
        <LogOut size={16} />
        Sign out
      </button>
    </div>
  );
}
