import { useState, type ReactNode } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./topNavbar";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0d0906]">
      <Sidebar isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNavbar onMenuClick={() => setMobileOpen(true)} />

        <main className="flex-1 overflow-y-auto bg-[#0d0906] p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}