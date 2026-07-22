import { useState, useEffect } from "react";
import {
  House,
  MessageCircle,
  User,
  LogOut,
  Menu,
  ChevronDown,
  ChevronUp,
  Plus,
  X
} from "lucide-react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useProfile } from "../../contexts/ProfileContexts";
import { supabase } from "../../lib/supabase";
import UpcomingConversations from "../home/UpcomingConversations";
import ExploreOpportunities from "../home/ExploreOpportunities";
import InfoSidebar from "../home/infoSidebar";
import loungeBg from "../../Assets/lounge-bg.jpg";
import { motion, AnimatePresence } from "framer-motion";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { profile, unreadNotificationCount } = useProfile();
  const navigate = useNavigate();
  const location = useLocation();

  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Accordion states
  const [conversationsExpanded, setConversationsExpanded] = useState(false);
  const [exploreExpanded, setExploreExpanded] = useState(false);
  const [infoExpanded, setInfoExpanded] = useState(false);

  const initial = profile?.full_name?.trim()?.charAt(0)?.toUpperCase() || "?";

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleNewChat = () => {
    if (!profile) return;
    const STORAGE_KEY = `agent-chat-${profile.id}`;
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event("nectio-new-chat"));
    if (location.pathname !== "/home") {
      navigate("/home");
    }
  };

  const handlePromptClick = (prompt: string) => {
    if (location.pathname !== "/home") {
      navigate("/home");
    }
    setMobileDrawerOpen(false);
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("nectio-send-prompt", { detail: prompt }));
    }, 150);
  };

  const navItems = [
    { title: "AI Assistant", icon: House, path: "/home" },
    { title: "Messages", icon: MessageCircle, path: "/messages" },
    { title: "Profile", icon: User, path: "/profile" },
  ];

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileDrawerOpen(false);
  }, [location.pathname]);

  const sidebarContent = (
    <div className="flex h-full flex-col bg-[rgba(15,10,7,0.92)] text-[#F3E9DE] backdrop-blur-xl">
      {/* Brand & New Chat */}
      <div className="p-4 flex flex-col gap-3 border-b border-white/5">
        <div className="flex items-center gap-2.5 px-2 py-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F3E9DE] text-sm font-extrabold text-[#0d0906]">
            N
          </div>
          <span className="text-base font-bold tracking-tight bg-gradient-to-r from-[#F3E9DE] to-[#B8AA9C] bg-clip-text text-transparent">
            Nectio.AI
          </span>
        </div>

        <button
          onClick={handleNewChat}
          className="flex items-center justify-center gap-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-[#F3E9DE] transition hover:bg-white/[0.08] hover:border-white/20 active:scale-[0.98]"
        >
          <Plus size={14} />
          New Chat
        </button>
      </div>

      {/* Scrollable Center Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isMessages = item.title === "Messages";
            return (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-white/[0.08] text-[#F3E9DE]"
                      : "text-[#B8AA9C] hover:bg-white/[0.03] hover:text-[#F3E9DE]"
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} className="shrink-0" />
                  <span>{item.title}</span>
                </div>
                {isMessages && unreadNotificationCount > 0 && (
                  <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#E8934A] px-1.5 text-[10px] font-bold text-white">
                    {unreadNotificationCount}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-white/5 my-2" />

        {/* Collapsible widgets */}
        <div className="space-y-2">
          {/* Upcoming Conversations */}
          <div className="rounded-xl border border-white/5 bg-white/[0.01] overflow-hidden">
            <button
              onClick={() => setConversationsExpanded((v) => !v)}
              className="flex w-full items-center justify-between px-3 py-2.5 text-xs font-semibold text-[#B8AA9C] hover:text-[#F3E9DE] hover:bg-white/[0.02]"
            >
              <span>Upcoming Chats</span>
              {conversationsExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            <AnimatePresence initial={false}>
              {conversationsExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-2 pb-3 overflow-hidden border-t border-white/5"
                >
                  <UpcomingConversations />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Explore Opportunities */}
          <div className="rounded-xl border border-white/5 bg-white/[0.01] overflow-hidden">
            <button
              onClick={() => setExploreExpanded((v) => !v)}
              className="flex w-full items-center justify-between px-3 py-2.5 text-xs font-semibold text-[#B8AA9C] hover:text-[#F3E9DE] hover:bg-white/[0.02]"
            >
              <span>Explore Opportunities</span>
              {exploreExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            <AnimatePresence initial={false}>
              {exploreExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-2 pb-3 overflow-hidden border-t border-white/5"
                >
                  <ExploreOpportunities />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* How It Works & Help */}
          <div className="rounded-xl border border-white/5 bg-white/[0.01] overflow-hidden">
            <button
              onClick={() => setInfoExpanded((v) => !v)}
              className="flex w-full items-center justify-between px-3 py-2.5 text-xs font-semibold text-[#B8AA9C] hover:text-[#F3E9DE] hover:bg-white/[0.02]"
            >
              <span>How It Works</span>
              {infoExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            <AnimatePresence initial={false}>
              {infoExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-2 pb-3 overflow-hidden border-t border-white/5"
                >
                  <InfoSidebar onPromptClick={handlePromptClick} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-white/5 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F3E9DE] text-sm font-bold text-[#0d0906]">
            {initial}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#F3E9DE]">{profile?.full_name || "Nectio Member"}</p>
            <p className="truncate text-[10px] text-[#8A7C6E]">Connected Profile</p>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          title="Sign Out"
          className="rounded-lg p-2 text-[#B8AA9C] hover:bg-white/5 hover:text-[#F3E9DE] transition-colors"
        >
          <LogOut size={16} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-[#0d0906] flex overflow-hidden">
      {/* Background photo, sharp, no blur */}
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${loungeBg})` }}
      />
      {/* Dark overlay for text readability */}
      <div className="fixed inset-0 bg-[#0d0906]/65" />

      {/* Desktop Collapsible Left Sidebar */}
      <div
        className={`hidden lg:block relative z-30 shrink-0 h-screen transition-all duration-300 border-r border-white/10 ${
          desktopSidebarOpen ? "w-[280px]" : "w-0 overflow-hidden border-none"
        }`}
      >
        {sidebarContent}
      </div>

      {/* Mobile Drawer (AnimatePresence slide over) */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-40 lg:hidden flex">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Slide-out Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative z-50 w-72 h-full flex flex-col border-r border-white/10"
            >
              {sidebarContent}
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="absolute top-4 right-[-44px] flex h-9 w-9 items-center justify-center rounded-lg bg-[rgba(15,10,7,0.92)] border border-white/10 text-[#F3E9DE]"
              >
                <X size={18} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main viewport area */}
      <div className="relative z-10 flex-1 flex flex-col h-screen min-w-0 overflow-hidden">
        {/* Minimal sticky top navbar */}
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center justify-between border-b border-white/5 bg-[rgba(13,9,6,0.4)] px-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            {/* Toggle button */}
            <button
              onClick={() => {
                setDesktopSidebarOpen((v) => !v);
                setMobileDrawerOpen(true); // for mobile
              }}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-[#F3E9DE] hover:bg-white/5 transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu size={16} />
            </button>

            <span className="text-sm font-semibold tracking-wide text-[#F3E9DE]">
              {location.pathname === "/home"
                ? "AI Assistant"
                : location.pathname === "/messages"
                ? "Messages"
                : location.pathname === "/profile"
                ? "My Profile"
                : "Nectio.AI"}
            </span>
          </div>

          <button
            onClick={handleNewChat}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold text-[#F3E9DE] hover:bg-white/[0.08]"
          >
            <Plus size={12} />
            New Chat
          </button>
        </header>

        {/* Content Wrapper */}
        <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}