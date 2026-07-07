import QuestionCard from "../questionCard";

interface TextCardProps {
  title: string;
  subtitle?: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
}

export default function TextCard({
  title,
  subtitle,
  placeholder,
  value,
  setValue,
}: TextCardProps) {
  return (
    <QuestionCard
      title={title}
      subtitle={subtitle}
    >
      <input
        type="text"
        value={value}
        placeholder={placeholder}
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