import {
  House,
  Search,
  MessageCircle,
  Bell,
  User,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useProfile } from "../../contexts/ProfileContexts";

const menuItems = [
  {
    title: "Home",
    icon: House,
    path: "/home",
  },
  {
    title: "Discover",
    icon: Search,
    path: "/discover",
  },
  {
    title: "Messages",
    icon: MessageCircle,
    path: "/messages",
  },
  {
    title: "Notifications",
    icon: Bell,
    path: "/notifications",
  },
  {
    title: "Profile",
    icon: User,
    path: "/profile",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default function Sidebar() {
  const { unreadNotificationCount } = useProfile();
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-950 px-6 py-8">
      {/* Logo */}
      <div className="mb-14 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500 text-lg font-bold text-white">
          N
        </div>

        <div>
          <h1 className="font-display text-2xl font-bold text-white">
            Nectio
          </h1>

          <p className="text-sm text-slate-400">
            Professional Networking
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${isActive
                  ? "bg-green-500 text-white shadow-lg"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`
              }
            >
              <Icon size={21} />

              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-4">

                  <span className="font-medium">
                    {item.title}
                  </span>
                </div>

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
      <div className="mt-auto rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <p className="text-sm font-semibold text-white">
          AI Match Engine
        </p>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          Your profile has been analyzed and personalized networking
          recommendations are ready.
        </p>
      </div>
    </aside>
  );
}