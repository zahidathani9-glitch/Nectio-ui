interface Props {

  current: number;
  total: number;

}

export default function ProgressBar({

  current,
  total,

}: Props) {

  const percent =
    (current / total) * 100;

  return (

    <div className="mb-8">

      <div className="flex justify-between text-sm text-slate-400 mb-2">

        <span>

          Step {current}

        </span>

        <span>

          {total}

        </span>

      </div>

      <div className="h-2 rounded-full bg-slate-800">

        <div
          className="h-2 rounded-full bg-green-500 transition-all"
          style={{
            width: `${percent}%`,
          }}
        />

      </div>

    </div>

  );
}