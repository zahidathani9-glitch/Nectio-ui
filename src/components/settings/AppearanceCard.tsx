import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

export default function AppearanceCard() {

  const {
    theme,
    toggleTheme,
  } = useTheme();

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="text-2xl font-semibold text-white">
        Appearance
      </h2>

      <p className="mt-2 text-slate-400">
        Choose how Nectio looks on your device.
      </p>

      <div className="mt-8 flex gap-4">

        <button
          onClick={() => toggleTheme("dark")}
          className={`flex flex-1 items-center justify-center gap-3 rounded-2xl px-6 py-4 font-semibold transition ${
            theme === "dark"
              ? "bg-green-500 text-white"
              : "border border-slate-700 bg-slate-800 text-slate-300"
          }`}
        >
          <Moon size={20} />
          Dark
        </button>

        <button
          onClick={() => toggleTheme("light")}
          className={`flex flex-1 items-center justify-center gap-3 rounded-2xl px-6 py-4 font-semibold transition ${
            theme === "light"
              ? "bg-green-500 text-white"
              : "border border-slate-700 bg-slate-800 text-slate-300"
          }`}
        >
          <Sun size={20} />
          Light
        </button>

      </div>

    </div>
  );
}