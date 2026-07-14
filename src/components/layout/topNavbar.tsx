import { useState, useRef, useEffect } from "react";
import { House, Search, MessageCircle, User, Menu, X, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useProfile } from "../../contexts/ProfileContexts";
import { supabase } from "../../lib/supabase";

const navItems = [
  { title: "Home", icon: House, path: "/home" },
  { title: "Discover", icon: Search, path: "/discover" },
  { title: "Messages", icon: MessageCircle, path: "/messages" },
  { title: "Profile", icon: User, path: "/profile" },
];

interface TopNavbarProps {
  isMobileNavOpen: boolean;
  onToggleMobileNav: () => void;
}

export default function TopNavbar({ isMobileNavOpen, onToggleMobileNav }: TopNavbarProps) {
  const { unreadNotificationCount, profile } = useProfile();
  const navigate = useNavigate();

  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  const initial = profile?.full_name?.trim()?.charAt(0)?.toUpperCase() || "?";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-20 px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(20,14,9,0.6)] px-4 sm:px-6 py-3 backdrop-blur-md">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F3E9DE] text-sm font-bold text-[#0d0906]">
            N
          </div>
          <div className="hidden sm:block">
            <div className="text-[15px] font-semibold text-[#F3E9DE] leading-tight">
              Nectio.AI
            </div>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-[rgba(255,255,255,0.12)] text-[#F3E9DE]"
                      : "text-[#B8AA9C] hover:text-[#F3E9DE]"
                  }`
                }
              >
                <Icon size={17} />
                {item.title}
                {item.title === "Messages" && unreadNotificationCount > 0 && (
                  <span className="ml-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-semibold text-white">
                    {unreadNotificationCount}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">

          {/* Avatar + dropdown */}
          <div className="relative" ref={avatarRef}>
            <button
              onClick={() => setAvatarMenuOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F3E9DE] text-sm font-bold text-[#0d0906]"
            >
              {initial}
            </button>

            {avatarMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(20,14,9,0.95)] backdrop-blur-md p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-[#F3E9DE] transition-colors hover:bg-[rgba(255,255,255,0.08)]"
                >
                  <LogOut size={16} />
                  Sign out
                </button>
              </div>
            )}
          </div>

          <button
            onClick={onToggleMobileNav}
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.12)] text-[#F3E9DE]"
            aria-label="Toggle menu"
          >
            {isMobileNavOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown nav */}
      {isMobileNavOpen && (
        <nav className="lg:hidden mt-2 flex flex-col gap-1 rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(20,14,9,0.85)] p-3 backdrop-blur-md">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.title}
                to={item.path}
                onClick={onToggleMobileNav}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors ${
                    isActive
                      ? "bg-[rgba(255,255,255,0.12)] text-[#F3E9DE]"
                      : "text-[#B8AA9C]"
                  }`
                }
              >
                <Icon size={18} />
                {item.title}
              </NavLink>
            );
          })}
        </nav>
      )}
    </header>
  );
}