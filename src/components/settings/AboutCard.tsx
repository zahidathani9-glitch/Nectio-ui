import { Info } from "lucide-react";

export default function AboutCard() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <div className="flex items-center gap-3">

        <Info
          size={22}
          className="text-green-400"
        />

        <h2 className="text-2xl font-semibold text-white">
          About
        </h2>

      </div>

      <div className="mt-6 space-y-3">

        <div className="flex justify-between">

          <span className="text-slate-400">
            Application
          </span>

          <span className="font-medium text-white">
            Nectio
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-slate-400">
            Version
          </span>

          <span className="font-medium text-white">
            v1.0 MVP
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-slate-400">
            Powered By
          </span>

          <span className="font-medium text-green-400">
            AI Match Engine
          </span>

        </div>

      </div>

    </div>
  );
}