import { useState, useRef, useEffect } from "react";
import type { FeedItem } from "../../types/chat";
import { MapPin, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [showMenu, setShowMenu] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close menu on scroll or window resize
  useEffect(() => {
    if (!showMenu) return;

    const handleDismiss = () => {
      setShowMenu(false);
    };

    window.addEventListener("scroll", handleDismiss, { capture: true });
    window.addEventListener("resize", handleDismiss);

    return () => {
      window.removeEventListener("scroll", handleDismiss, { capture: true });
      window.removeEventListener("resize", handleDismiss);
    };
  }, [showMenu]);

  // Touch Long-Press handlers for mobile
  const handleTouchStart = () => {
    timerRef.current = setTimeout(() => {
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        try {
          navigator.vibrate(15);
        } catch (_) {}
      }
      setShowMenu(true);
    }, 450);
  };

  const handleTouchEnd = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleTouchMove = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // Right-click for Desktop
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      try {
        navigator.vibrate(10);
      } catch (_) {}
    }
    setShowMenu(true);
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      className="relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-4 shadow-lg shadow-black/20 hover:border-[#E8934A]/30 hover:bg-white/[0.04] transition-colors duration-300 cursor-pointer select-none"
    >
      {/* Backdrop blur overlay when menu is open */}
      <AnimatePresence>
        {showMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(false);
              }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />

            {/* Floating Emoji Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6, y: 10 }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 24,
                mass: 0.8,
              }}
              className="absolute -top-16 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-full border border-[#E8934A]/40 bg-[rgba(20,14,9,0.92)] px-4 py-2 backdrop-blur-md shadow-[0_12px_36px_rgba(0,0,0,0.6),0_0_24px_rgba(232,147,74,0.25)]"
            >
              {/* 👀 View Profile */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(false);
                  onViewProfile(item);
                }}
                className="flex h-14 w-14 items-center justify-center rounded-full text-2xl bg-white/5 border border-white/10 text-white transition-all duration-200 hover:scale-125 hover:bg-[#E8934A]/20 hover:border-[#E8934A]/40 active:scale-95 shadow-inner"
                title="View Profile"
              >
                <span className="leading-none">👀</span>
              </button>

              {/* 💬 Start Conversation */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(false);
                  onMessage();
                }}
                className="flex h-14 w-14 items-center justify-center rounded-full text-2xl bg-white/5 border border-white/10 text-white transition-all duration-200 hover:scale-125 hover:bg-[#E8934A]/20 hover:border-[#E8934A]/40 active:scale-95 shadow-inner"
                title="Start Conversation"
              >
                <span className="leading-none">💬</span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        {/* Card Header Info */}
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={
                item.photoUrl ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  item.fullName
                )}&background=E8934A&color=fff`
              }
              alt={item.fullName}
              className="h-12 w-12 rounded-full border border-white/15 object-cover"
              onError={(e) => {
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  item.fullName
                )}&background=E8934A&color=fff`;
              }}
            />
            <div className="min-w-0">
              <h4 className="truncate text-sm font-bold text-[#F3E9DE]">
                {item.fullName}
              </h4>
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
            <h5 className="text-[10px] font-semibold text-[#8A7C6E] uppercase tracking-wider">
              AI Insight
            </h5>
            <p className="mt-1 text-xs leading-5 text-[#B8AA9C] line-clamp-3">
              {item.reason}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
