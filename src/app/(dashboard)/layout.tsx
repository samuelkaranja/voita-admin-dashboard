import Sidebar from "@/components/layout/Sidebar";
import MobileTopBar from "@/components/layout/MobileTopBar";
import { SidebarProvider } from "@/context/SidebarContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
