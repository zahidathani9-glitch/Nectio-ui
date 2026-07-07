import { Bell, Search } from "lucide-react";

export default function TopNavbar() {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning ☀"
      : hour < 18
      ? "Good Afternoon 🌤"
      : "Good Evening 🌙";

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950 px-10">

      {/* Left */}

      <div>
        <h2 className="text-2xl font-bold text-white">
          {greeting}
        </h2>

        <p className="mt-1 text-slate-400">
          Let's build meaningful connections today.
        </p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        {/* Search */}

        <div className="flex w-96 items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3">

          <Search
            size={20}
            className="text-slate-400"
          />

          <input
            type="text"
            placeholder="Search Nectio..."
            className="w-full bg-transparent text-white placeholder:text-slate-500 focus:outline-none"
          />

        </div>

        {/* Notification */}

        <button className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 transition hover:bg-slate-800">

          <Bell
            size={20}
            className="text-white"
          />

        </button>

        {/* Avatar */}

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-lg font-bold text-white">

          Z

        </div>

      </div>

    </header>
  );
}