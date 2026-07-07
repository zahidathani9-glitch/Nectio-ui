import QuestionCard from "../questionCard";

interface DateCardProps {
  title: string;
  subtitle?: string;
  value: string;
  setValue: (value: string) => void;
}

export default function DateCard({
  title,
  subtitle,
  value,
  setValue,
}: DateCardProps) {
  return (
    <QuestionCard
      title={title}
      subtitle={subtitle}
    >
      <input
        type="date"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="
        w-full
        rounded-2xl
        bg-slate-800
        border
        border-slate-700
        px-5
        py-4
        text-lg
        outline-none
        focus:border-green-500
        "
      />
    </QuestionCard>
  );
}