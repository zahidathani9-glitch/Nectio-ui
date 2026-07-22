import type { FeedItem } from "../../types/chat";
import { MessageSquare, User, MapPin, Award } from "lucide-react";
import { motion } from "framer-motion";

interface ProfileMatchCardProps {
  item: FeedItem;
  onMessage: () => void;
  onViewProfile: (item: FeedItem) => void;
}

export default function ProfileMatchCard({
  item,
  onMessage,
  onViewProfile,
}: ProfileMatchCardProps) {
  const matchScore = Math.round(item.similarity * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-4 shadow-lg shadow-black/20 hover:border-[#E8934A]/30 hover:bg-white/[0.04] transition-all duration-300"
    >
      <div className="space-y-3">
        {/* Card Header Info */}
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={item.photoUrl || "https://placehold.co/48x48?text=User"}
              alt={item.fullName}
              className="h-12 w-12 rounded-full border border-white/15 object-cover"
            />
            <div className="min-w-0">
              <h4 className="truncate text-sm font-bold text-[#F3E9DE]">{item.fullName}</h4>
              {item.jobTitle && (
                <p className="truncate text-xs text-[#B8AA9C]">{item.jobTitle}</p>
              )}
              {item.location && (
                <span className="inline-flex items-center gap-1 text-[10px] text-[#8A7C6E] mt-0.5">
                  <MapPin size={10} />
                  {item.location}
                </span>
              )}
            </div>
          </div>

          {/* Match Score Badge */}
          <div className="flex items-center gap-1 rounded-full bg-[#E8934A]/10 border border-[#E8934A]/30 px-2 py-0.5 text-[10px] font-bold text-[#E8934A] shrink-0">
            <Award size={10} />
            {matchScore}% Match
          </div>
        </div>

        {/* AI Insight Reason */}
        {item.reason && (
          <div className="mt-2 bg-white/[0.01] border border-white/5 rounded-xl p-3">
            <h5 className="text-[10px] font-semibold text-[#8A7C6E] uppercase tracking-wider">AI Insight</h5>
            <p className="mt-1 text-xs leading-5 text-[#B8AA9C] line-clamp-3">
              {item.reason}
            </p>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-4 flex items-center gap-2 border-t border-white/5 pt-3">
        <button
          onClick={() => onViewProfile(item)}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] py-2 text-xs font-semibold text-[#F3E9DE] hover:bg-white/[0.08] hover:border-white/20 transition-all"
        >
          <User size={13} />
          View Profile
        </button>

        <button
          onClick={onMessage}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-[#F3E9DE] py-2 text-xs font-semibold text-[#0d0906] hover:bg-white transition-all shadow-sm"
        >
          <MessageSquare size={13} />
          Message
        </button>
      </div>
    </motion.div>
  );
}
