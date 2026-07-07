import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./topNavbar";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen bg-slate-950">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Navbar */}
        <TopNavbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-950 p-8">
          {children}
        </main>

      </div>
    </div>
  );
}