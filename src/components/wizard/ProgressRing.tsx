interface Props {
  current: number; // 1-indexed
  total: number;
}

const SIZE = 30;
const STROKE = 2;
const RADIUS = (SIZE - STROKE) / 2;
const CIRC = 2 * Math.PI * RADIUS;

/**
 * Compact "2 / 14" ring badge. Sits top-right, well clear of the title
 * (see the padding in questionCard.tsx). Purely presentational.
 */
export default function ProgressRing({ current, total }: Props) {
  const percent = total > 0 ? current / total : 0;
  const offset = CIRC - percent * CIRC;

  return (
    <div
      className="
        absolute top-6 right-6 z-20
        flex items-center gap-1.5
        rounded-full border border-white/[0.08]
        bg-white/[0.03] backdrop-blur-md
        pl-1.5 pr-2.5 py-1
      "
    >
      <svg width={SIZE} height={SIZE} className="-rotate-90 shrink-0">
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke="rgba(255,255,255,0.10)"
          strokeWidth={STROKE}
          fill="none"
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke="#E8934A"
          strokeWidth={STROKE}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={CIRC}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 320ms cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </svg>
      <span className="text-[11px] font-medium tracking-wide text-white/50 tabular-nums">
        {current}/{total}
      </span>
    </div>
  );
}
