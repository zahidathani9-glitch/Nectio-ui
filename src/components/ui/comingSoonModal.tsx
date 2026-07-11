import { useEffect } from "react";
interface ComingSoonModalProps {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
}

export default function ComingSoonModal({
  open,
  title,
  description,
  onClose,
}: ComingSoonModalProps) {

    useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  if (open) {
    window.addEventListener("keydown", handleKeyDown);
  }

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [open, onClose]);


  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">

        <h2 className="text-2xl font-bold text-white">
          {title}
        </h2>

        <p className="mt-5 leading-7 text-slate-400">
          {description}
        </p>

        <button
          onClick={onClose}
          className="mt-8 w-full rounded-xl bg-green-500 py-3 font-semibold text-white transition hover:bg-green-600"
        >
          Back
        </button>

      </div>

    </div>
  );
}