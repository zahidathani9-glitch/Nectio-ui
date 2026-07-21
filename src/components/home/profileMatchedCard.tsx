import type { FeedItem } from "../../types/chat";
import { MessageCircle } from "lucide-react";

interface ProfileMatchCardProps {
  item: FeedItem;
  onMessage: () => void;
}

export default function ProfileMatchCard({ item, onMessage }: ProfileMatchCardProps) {
  return (
    <div className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(20,14,9,0.5)] p-3.5 transition hover:border-[rgba(255,255,255,0.2)]">
      <div className="flex items-center gap-3">
        <img
          src={item.photoUrl || "https://placehold.co/48x48?text=User"}
          alt={item.fullName}
          className="h-11 w-11 rounded-full border border-[rgba(255,255,255,0.15)] object-cover"
        />
        <div className="min-w-0">
          <h4 className="truncate text-sm font-semibold text-[#F3E9DE]">{item.fullName}</h4>
          <p className="truncate text-xs text-[#B8AA9C]">{item.jobTitle}</p>
        </div>
      </div>

     {item.reason && (
  <div className="mt-4">
    <h5 className="text-sm font-semibold text-[#F3E9DE]">
      Why AI Recommended This Person
    </h5>

    <p className="mt-2 line-clamp-5 text-sm leading-7 text-[#B8AA9C]">
  {item.reason}
</p>
  </div>
)}

<div className="mt-4 flex items-center justify-between">
  {item.location && (
    <span className="rounded-full bg-[rgba(255,255,255,0.08)] px-3 py-1 text-xs text-[#F3E9DE]">
      📍 {item.location}
    </span>
  )}

  <button
    onClick={onMessage}
    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#F3E9DE] transition-all duration-200 hover:border-[#E8934A] hover:bg-[#E8934A]/15 hover:text-[#E8934A]"
  >
    <MessageCircle className="h-5 w-5" />
  </button>
</div>
    </div>
  );
}
