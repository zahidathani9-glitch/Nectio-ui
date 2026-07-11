import { LogOut } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function AccountCard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="text-2xl font-semibold text-white">
        Account
      </h2>

      <p className="mt-2 text-slate-400">
        Sign out from your Nectio account.
      </p>

      <button
        onClick={handleLogout}
        className="mt-8 flex items-center gap-3 rounded-2xl bg-red-500 px-6 py-4 font-semibold text-white transition hover:bg-red-600"
      >
        <LogOut size={20} />
        Sign Out
      </button>

    </div>
  );
}