import QuestionCard from "../questionCard";

interface TextAreaCardProps {
  title: string;
  subtitle?: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
}

export default function TextAreaCard({
  title,
  subtitle,
  placeholder,
  value,
  setValue,
}: TextAreaCardProps) {
  return (
    <QuestionCard
      title={title}
      subtitle={subtitle}
    >
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        rows={6}
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
          resize-none
          focus:border-green-500
        "
      />
    </QuestionCard>
  );
}