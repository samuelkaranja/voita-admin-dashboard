"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import MobileTopBar from "@/components/layout/MobileTopBar";
import { SidebarProvider } from "@/context/SidebarContext";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { hydrateFromStorage } from "@/store/slices/authSlice";
import { isAdminRole } from "@/lib/api/authApi";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, status } = useAppSelector((state) => state.auth);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    dispatch(hydrateFromStorage());
    setChecked(true);
  }, [dispatch]);

  useEffect(() => {
    if (!checked || status === "loading") return;
    if (!user || !isAdminRole(user.role)) {
      router.replace("/login");
    }
  }, [checked, user, status, router]);

  if (!checked || status === "loading" || !user || !isAdminRole(user.role)) {
    return (
      <div className="min-h-screen bg-voita-bg flex items-center justify-center">
        <p className="text-voita-text-muted text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-voita-bg">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <MobileTopBar />
          <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
