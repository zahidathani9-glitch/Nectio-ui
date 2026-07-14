import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ChatHeaderProps {
  fullName: string;
  photoUrl?: string | null;
}

export default function ChatHeader({
  fullName,
  photoUrl,
}: ChatHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.1)] pb-5">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#B8AA9C] transition hover:text-[#F3E9DE]"
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>

      <div className="flex items-center gap-3">
        {photoUrl && (
          <img
            src={photoUrl}
            alt={fullName}
            className="h-9 w-9 rounded-full object-cover border border-[rgba(255,255,255,0.1)]"
          />
        )}
        <h1 className="truncate text-xl font-bold text-[#F3E9DE]">
          {fullName || "Conversation"}
        </h1>
      </div>

      <div className="w-14 flex-shrink-0" />
    </div>
  );
}