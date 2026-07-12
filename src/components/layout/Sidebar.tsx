import {
  House,
  Search,
  MessageCircle,
  Bell,
  User,
  Settings,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useProfile } from "../../contexts/ProfileContexts";

const menuItems = [
  { title: "Home", icon: House, path: "/home" },
  { title: "Discover", icon: Search, path: "/discover" },
  { title: "Messages", icon: MessageCircle, path: "/messages" },
  { title: "Notifications", icon: Bell, path: "/notifications" },
  { title: "Profile", icon: User, path: "/profile" },
  { title: "Settings", icon: Settings, path: "/settings" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { unreadNotificationCount } = useProfile();

  const content = (
    <>
      {/* Logo */}
      <div className="mb-10 lg:mb-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F3E9DE] text-lg font-bold text-[#0d0906]">
            N
          </div>

          <div>
            <h1 className="font-display text-2xl font-bold text-[#F3E9DE]">
              Nectio
            </h1>
            <p className="text-sm text-[#B8AA9C]">Professional Networking</p>
          </div>
        </div>

        {/* Close button, mobile drawer only */}
        <button
          onClick={onClose}
          className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg text-[#B8AA9C] hover:bg-[rgba(255,255,255,0.06)] hover:text-[#F3E9DE]"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${isActive
                  ? "bg-[#F3E9DE] text-[#0d0906] shadow-lg"
                  : "text-[#B8AA9C] hover:bg-[rgba(255,255,255,0.06)] hover:text-[#F3E9DE]"
                }`
              }
            >
              <Icon size={21} />

              <div className="flex w-full items-center justify-between">
                <span className="font-medium">{item.title}</span>

                {item.title === "Notifications" &&
                  unreadNotificationCount > 0 && (
                    <div className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-red-500 px-2 text-xs font-semibold text-white">
                      {unreadNotificationCount}
                    </div>
                  )}
              </div>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="mt-auto rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(28,22,18,0.78)] p-5">
        <p className="text-sm font-semibold text-[#F3E9DE]">AI Match Engine</p>
        <p className="mt-2 text-sm leading-6 text-[#B8AA9C]">
          Your profile has been analyzed and personalized networking
          recommendations are ready.
        </p>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex h-screen w-64 flex-col border-r border-[rgba(255,255,255,0.08)] bg-[#0d0906] px-6 py-8">
        {content}
      </aside>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-200 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60"
          onClick={onClose}
          aria-hidden="true"
        />

        <aside
          className={`absolute left-0 top-0 flex h-full w-72 max-w-[80vw] flex-col border-r border-[rgba(255,255,255,0.08)] bg-[#0d0906] px-6 py-8 transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {content}
        </aside>
      </div>
    </>
  );
}