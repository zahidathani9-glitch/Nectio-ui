import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProfileMatchCard from "./profileMatchedCard";
import type { FeedItem } from "../../types/chat";

interface CardCarouselProps {
  cards: FeedItem[];
  onMessage: (item: FeedItem) => void;
  onViewProfile: (item: FeedItem) => void;
}

/**
 * Returns enter/exit variants for the arc transition.
 * Direction: 1 = going forward (next), -1 = going backward (prev).
 * The arc is achieved by combining x + a subtle y curve so the card
 * traces a shallow upward arc rather than a flat horizontal slide.
 */
function getVariants(direction: number) {
  return {
    enter: {
      x: direction * 340,
      y: 30,
      scale: 0.88,
      opacity: 0,
    },
    center: {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
    },
    exit: {
      x: direction * -340,
      y: 30,
      scale: 0.88,
      opacity: 0,
    },
  };
}

const spring = {
  type: "spring" as const,
  stiffness: 280,
  damping: 30,
  mass: 0.75,
};

export default function CardCarousel({
  cards,
  onMessage,
  onViewProfile,
}: CardCarouselProps) {
  const [index, setIndex] = useState(0);
  // direction tracks which way the user navigated so the arc goes the right way
  const direction = useRef(1);

  const navigate = (dir: 1 | -1) => {
    direction.current = dir;
    setIndex((i) => (i + dir + cards.length) % cards.length);
  };

  if (!cards.length) return null;

  const item = cards[index];
  const variants = getVariants(direction.current);

  return (
    <div className="w-full flex flex-col items-center gap-4 select-none">
      {/* ── Card Stage ─── */}
      <div className="relative w-full flex justify-center overflow-visible pt-16 pb-2">
        <AnimatePresence mode="popLayout" initial={false} custom={direction.current}>
          <motion.div
            key={item.profileId || `card-${index}`}
            custom={direction.current}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={spring}
            style={{
              width: "min(340px, 90vw)",
              willChange: "transform, opacity",
            }}
          >
            <ProfileMatchCard
              item={item}
              onMessage={() => onMessage(item)}
              onViewProfile={onViewProfile}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Navigation ─── only shown when there are multiple cards */}
      {cards.length > 1 && (
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            aria-label="Previous recommendation"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#B8AA9C] hover:border-white/25 hover:bg-white/[0.08] hover:text-[#F3E9DE] transition-all active:scale-90"
          >
            <ChevronLeft size={15} />
          </button>

          <span className="text-[11px] text-[#8A7C6E] tabular-nums">
            {index + 1} / {cards.length}
          </span>

          <button
            onClick={() => navigate(1)}
            aria-label="Next recommendation"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#B8AA9C] hover:border-white/25 hover:bg-white/[0.08] hover:text-[#F3E9DE] transition-all active:scale-90"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
