import { type ReactNode } from "react";
import Navigation from "./navigation";
import type { NavProps } from "./types";

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
  /** Injected by Wizard via cloneElement — not passed by ProfilePage. */
  nav?: NavProps;
}

export default function QuestionCard({ title, subtitle, children, nav }: Props) {
  return (
    <div
      className="
        relative
        w-full
        min-h-[380px]
        max-h-[58vh]
        rounded-[28px]
        border
        border-white/10
        flex
        flex-col
        overflow-hidden
        transition-all
        duration-300
      "
      style={{
        background: "rgba(28,22,18,0.78)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        boxShadow:
          "0 30px 90px -20px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.03) inset",
      }}
    >
      {/* Scrollable content — nav footer below stays fixed, scrollbar hidden */}
      <div
        className="
          flex-1
          overflow-y-auto
          px-9
          sm:px-12
          pt-16
          sm:pt-20
          pb-4
          [scrollbar-width:none]
          [-ms-overflow-style:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        <h1
          className="font-display text-[32px] sm:text-[38px] font-semibold leading-[1.18] tracking-tight text-white mb-4"
          style={{ textWrap: "balance" as any }}
        >
          {title}
        </h1>

        {subtitle && (
          <p className="text-[15px] leading-6 text-white/45 mb-8 max-w-md">
            {subtitle}
          </p>
        )}

        {children}
      </div>

      {/* Nav lives inside the card now — no separate footer bar */}
      {nav && (
        <div className="shrink-0 px-9 sm:px-12 pt-4 pb-7 border-t border-white/[0.06]">
          <Navigation
            current={nav.current}
            total={nav.total}
            onNext={nav.onNext}
            onBack={nav.onBack}
          />
        </div>
      )}
    </div>
  );
}
