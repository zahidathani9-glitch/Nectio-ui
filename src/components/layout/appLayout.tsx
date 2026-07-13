import { useState, type ReactNode } from "react";
import TopNavbar from "./topNavbar";
import loungeBg from "../../Assets/lounge-bg.jpg";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="relative ">
      {/* Background photo, blurred */}
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${loungeBg})`,
          filter: "blur(6px)",
          transform: "scale(1.08)",
        }}
      />
      {/* Dark overlay for text readability */}
      <div className="fixed inset-0 bg-[#0d0906]/65" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <TopNavbar
          isMobileNavOpen={mobileNavOpen}
          onToggleMobileNav={() => setMobileNavOpen((v) => !v)}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}