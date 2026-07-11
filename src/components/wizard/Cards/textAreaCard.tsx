import QuestionCard from "../questionCard";
import type { NavProps } from "../types";

interface TextAreaCardProps {
  title: string;
  subtitle?: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  /** Injected by Wizard — not passed by ProfilePage. */
  nav?: NavProps;
}

export default function TextAreaCard({
  title,
  subtitle,
  placeholder,
  value,
  setValue,
  nav,
}: TextAreaCardProps) {
  return (
    <QuestionCard title={title} subtitle={subtitle} nav={nav}>
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        rows={6}
        className="
          w-full
          rounded-2xl
          border
          border-white/10
          bg-white/[0.04]
          px-5
          py-4
          text-lg
          text-white
          placeholder:text-white/25
          outline-none
          resize-none
          transition-all
          duration-200
          focus:border-[#E8934A]/60
          focus:bg-white/[0.06]
          focus:ring-4
          focus:ring-[#E8934A]/10
        "
      />
    </QuestionCard>
  );
}
