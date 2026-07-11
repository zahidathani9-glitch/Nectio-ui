interface Props {
  current: number;
  total: number;

  onNext: () => void;
  onBack: () => void;
}

export default function Navigation({
  current,
  total,

  onNext,
  onBack,
}: Props) {
  return (
    <div className="flex justify-between gap-4">
      <button
        onClick={onBack}
        disabled={current === 0}
        className="
          rounded-xl
          border
          border-white/15
          bg-transparent
          px-6
          py-3
          text-sm
          font-medium
          text-white/80
          transition-all
          duration-200
          hover:bg-white/5
          hover:border-white/25
          disabled:opacity-30
          disabled:hover:bg-transparent
        "
      >
        ← Back
      </button>

      <button
        onClick={onNext}
        className="
          rounded-xl
          px-7
          py-3
          text-sm
          font-semibold
          text-white
          shadow-[0_8px_24px_-8px_rgba(232,147,74,0.55)]
          transition-all
          duration-200
          hover:brightness-110
          active:scale-[0.98]
        "
        style={{ backgroundColor: "#E8934A" }}
      >
        {current === total - 1 ? "Finish" : "Next →"}
      </button>
    </div>
  );
}
