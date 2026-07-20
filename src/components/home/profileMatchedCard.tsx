import type { FeedItem } from "../../types/chat";

interface ProfileMatchCardProps {
  item: FeedItem;
  onViewProfile: (item: FeedItem) => void;
}

export default function ProfileMatchCard({ item, onViewProfile }: ProfileMatchCardProps) {
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

      <span className="mt-3 inline-flex rounded-full bg-[rgba(255,255,255,0.1)] px-2.5 py-0.5 text-[11px] font-semibold text-[#F3E9DE]">
        {Math.round(item.similarity * 100)}% Match
      </span>

      <button
        onClick={() => onViewProfile(item)}
        className="mt-3 w-full rounded-lg border border-[rgba(255,255,255,0.12)] py-1.5 text-xs font-semibold text-[#F3E9DE] transition hover:bg-[rgba(255,255,255,0.08)]"
      >
        View Profile
      </button>
    </div>
  );
}
