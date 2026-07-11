import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ChatHeaderProps {
  fullName: string;
}

export default function ChatHeader({
  fullName,
}: ChatHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between border-b border-slate-800 pb-5">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-300 hover:text-white transition"
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>

      <h1 className="text-2xl font-bold">
        {fullName}
      </h1>

      {/* Spacer to keep title centered */}
      <div className="w-14" />
    </div>
  );
}