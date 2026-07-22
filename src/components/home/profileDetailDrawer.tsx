import { motion } from "framer-motion";
import { X, MessageSquare, MapPin, Briefcase, Award, HelpCircle } from "lucide-react";
import type { FeedItem } from "../../types/chat";

interface ProfileDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  item: FeedItem | null;
  onMessage: () => void;
}

export default function ProfileDetailDrawer({
  isOpen,
  onClose,
  item,
  onMessage,
}: ProfileDetailDrawerProps) {
  if (!item) return null;

  const matchScore = Math.round(item.similarity * 100);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-y-0 right-0 z-50 flex w-full flex-col border-l border-white/10 bg-[#0d0906]/95 p-6 shadow-2xl backdrop-blur-lg sm:max-w-md"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h3 className="text-lg font-bold text-[#F3E9DE]">Professional Profile</h3>
        <button
          onClick={onClose}
          className="rounded-full p-2 text-[#B8AA9C] hover:bg-white/5 hover:text-[#F3E9DE] transition-colors"
          aria-label="Close details"
        >
          <X size={20} />
        </button>
      </div>

      {/* Content Container */}
      <div className="flex-1 overflow-y-auto py-6 space-y-6">
        {/* Profile Card Intro */}
        <div className="flex flex-col items-center text-center space-y-4">
          <img
            src={item.photoUrl || "https://placehold.co/120x120?text=User"}
            alt={item.fullName}
            className="h-28 w-28 rounded-full border-2 border-[#E8934A]/30 object-cover shadow-lg"
          />
          <div>
            <h4 className="text-xl font-bold text-[#F3E9DE]">{item.fullName}</h4>
            {item.jobTitle && (
              <p className="flex items-center justify-center gap-1.5 mt-1 text-sm text-[#B8AA9C]">
                <Briefcase size={14} className="text-[#E8934A]" />
                {item.jobTitle}
              </p>
            )}
            {item.location && (
              <p className="flex items-center justify-center gap-1.5 mt-1 text-xs text-[#8A7C6E]">
                <MapPin size={12} />
                {item.location}
              </p>
            )}
          </div>

          {/* Match Score Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#E8934A]/20 to-[#E8934A]/5 border border-[#E8934A]/30 px-3.5 py-1 text-sm font-semibold text-[#E8934A]">
            <Award size={14} />
            {matchScore}% Match
          </div>
        </div>

        {/* Bio Section */}
        {item.bio && (
          <div className="space-y-2">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-[#8A7C6E]">About</h5>
            <p className="text-sm leading-relaxed text-[#B8AA9C] bg-white/[0.02] border border-white/5 rounded-xl p-4">
              {item.bio}
            </p>
          </div>
        )}

        {/* AI Recommendation Context */}
        {item.reason && (
          <div className="space-y-2">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-[#8A7C6E]">AI Matching Insight</h5>
            <div className="text-sm leading-relaxed text-[#F3E9DE] bg-gradient-to-br from-[#E8934A]/10 to-transparent border border-[#E8934A]/25 rounded-xl p-4 space-y-2">
              <p className="font-medium text-xs text-[#E8934A] flex items-center gap-1.5">
                <HelpCircle size={14} />
                Why they are a great match:
              </p>
              <p className="text-xs sm:text-sm text-[#B8AA9C] leading-6">{item.reason}</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer / Message CTA */}
      <div className="border-t border-white/10 pt-4 mt-auto">
        <button
          onClick={onMessage}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F3E9DE] py-3 text-sm font-semibold text-[#0d0906] transition-transform active:scale-95 hover:bg-white"
        >
          <MessageSquare size={16} />
          Message {item.fullName.split(" ")[0]}
        </button>
      </div>
    </motion.div>
  );
}
