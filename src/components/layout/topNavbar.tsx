import { Bell, Search, Menu } from "lucide-react";

interface TopNavbarProps {
  onMenuClick: () => void;
}

export default function TopNavbar({ onMenuClick }: TopNavbarProps) {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning ☀"
      : hour < 18
      ? "Good Afternoon 🌤"
      : "Good Evening 🌙";

  return (
    <header className="flex h-auto min-h-[72px] lg:h-20 items-center justify-between gap-3 border-b border-[rgba(255,255,255,0.08)] bg-[#0d0906] px-4 py-3 sm:px-6 lg:px-10">
      {/* Left */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuClick}
          className="lg:hidden flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(28,22,18,0.78)]"
          aria-label="Open menu"
        >
          <Menu size={20} className="text-[#F3E9DE]" />
        </button>

        <div className="min-w-0">
          <h2 className="text-lg sm:text-2xl font-bold text-[#F3E9DE] truncate">
            {greeting}
          </h2>
          <p className="mt-0.5 hidden sm:block text-[#B8AA9C]">
            Let's build meaningful connections today.
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
        {/* Search: full input on lg+, icon-only button below */}
        <div className="hidden lg:flex w-72 xl:w-96 items-center gap-3 rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(28,22,18,0.78)] px-4 py-3">
          <Search size={20} className="text-[#B8AA9C]" />
          <input
            type="text"
            placeholder="Search Nectio..."
            className="w-full bg-transparent text-[#F3E9DE] placeholder:text-[#8A7C6E] focus:outline-none"
          />
        </div>

        <button
          className="lg:hidden flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(28,22,18,0.78)]"
          aria-label="Search"
        >
          <Search size={20} className="text-[#F3E9DE]" />
        </button>

        {/* Notification */}
        <button className="flex h-11 w-11 lg:h-12 lg:w-12 items-center justify-center rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(28,22,18,0.78)] transition hover:bg-[rgba(255,255,255,0.06)]">
          <Bell size={20} className="text-[#F3E9DE]" />
        </button>

        {/* Avatar */}
        <div className="flex h-11 w-11 lg:h-12 lg:w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#F3E9DE] text-lg font-bold text-[#0d0906]">
          Z
        </div>
      </div>
    </header>
  );
}