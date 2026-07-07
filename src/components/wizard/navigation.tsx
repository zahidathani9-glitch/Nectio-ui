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

    <div className="flex justify-between mt-8">

      <button
        onClick={onBack}
        disabled={current === 0}
        className="
        rounded-xl
        px-6
        py-3
        bg-slate-800
        disabled:opacity-30
        "
      >
        ← Back
      </button>

      <button
        onClick={onNext}
        className="
        rounded-xl
        px-6
        py-3
        bg-green-600
        hover:bg-green-500
        "
      >
        {current === total - 1
          ? "Finish"
          : "Next →"}
      </button>

    </div>

  );
}