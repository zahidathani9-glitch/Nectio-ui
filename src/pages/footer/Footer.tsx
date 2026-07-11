import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import FooterWordmark from "./FooterWordmark";
import SocialLinks from "./SocialLinks";
import LegalLinks from "./LegalLinks";

export default function Footer() {
  // containerRef is taller than the viewport (130vh/140vh below).
  // The extra height is what gives us scroll "room" to drive the
  // reveal — the inner layer stays pinned (sticky) while that room
  // is consumed, then releases naturally once we run out of it.
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // progress = 0 when the container's top edge reaches the bottom
    // of the viewport (i.e. it just starts coming into view),
    // progress = 1 when the container's bottom edge reaches the
    // bottom of the viewport (i.e. fully scrolled through).
    offset: ["start end", "end end"],
  });

  // Smooth out the raw scroll progress so the reveal eases rather
  // than tracking the scrollbar 1:1 — this is what removes any
  // abrupt jumps and gives the buttery, Apple/Linear-style feel.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 0.3,
  });

  // Fade content in during the first ~45% of the reveal, then hold.
  const opacity = useTransform(smoothProgress, [0, 0.45, 1], [0, 1, 1]);

  // Parallax: content starts offset downward and eases up to its
  // resting position slower than the raw scroll — a subtle lag
  // rather than moving 1:1 with the page.
  const y = useTransform(smoothProgress, [0, 1], [60, 0]);

  // Tiny scale-in reinforces the "emerging" feel without being flashy.
  const scale = useTransform(smoothProgress, [0, 1], [0.97, 1]);

  return (
    <div ref={containerRef} className="relative h-[20vh] sm:h-[22vh]">
      <div className="sticky top-0 flex h-[17vh] w-full items-end overflow-hidden bg-black sm:h-[18vh]">
        <motion.div
          style={{ opacity, y, scale }}
          className="flex w-full flex-col justify-end px-5 pb-4 pt-6 sm:px-10 sm:pb-5 sm:pt-7"
        >
          <FooterWordmark />

          <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-3 pt-3 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:pt-4">
            <SocialLinks />

            <div className="sm:absolute sm:left-1/2 sm:-translate-x-1/2">
              <LegalLinks />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
