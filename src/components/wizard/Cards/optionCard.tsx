import QuestionCard from "../questionCard";

interface OptionCardProps {
  title: string;
  subtitle?: string;
  options: string[];
  value: string;
  setValue: (value: string) => void;
}

export default function OptionCard({
  title,
  subtitle,
  options,
  value,
  setValue,
}: OptionCardProps) {
  return (
    <QuestionCard
      title={title}
      subtitle={subtitle}
    >
      <div className="space-y-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => setValue(option)}
            className={`
              w-full
              rounded-2xl
              border
              p-5
              text-left
              transition-all
              ${
                value === option
                  ? "bg-green-600 border-green-600"
                  : "bg-slate-800 border-slate-700 hover:border-green-500"
              }
            `}
          >
            {option}
          </button>
        ))}
      </div>
    </QuestionCard>
  );
}