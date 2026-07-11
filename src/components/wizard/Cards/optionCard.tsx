import QuestionCard from "../questionCard";
import type { NavProps } from "../types";

interface OptionCardProps {
  title: string;
  subtitle?: string;
  options: string[];
  value: string;
  setValue: (value: string) => void;
  /** Injected by Wizard — not passed by ProfilePage. */
  nav?: NavProps;
}

export default function OptionCard({
  title,
  subtitle,
  options,
  value,
  setValue,
  nav,
}: OptionCardProps) {
  return (
    <QuestionCard title={title} subtitle={subtitle} nav={nav}>
      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = value === option;

          return (
            <button
              key={option}
              onClick={() => setValue(option)}
              className={`
                w-full
                rounded-2xl
                border
                p-5
                text-left
                text-white
                transition-all
                duration-200
                ${
                  isSelected
                    ? "border-transparent"
                    : "border-white/10 bg-white/[0.03] hover:border-[#E8934A]/40 hover:bg-white/[0.05]"
                }
              `}
              style={
                isSelected
                  ? {
                      backgroundColor: "#E8934A",
                      boxShadow: "0 8px 24px -10px rgba(232,147,74,0.55)",
                    }
                  : undefined
              }
            >
              {option}
            </button>
          );
        })}
      </div>
    </QuestionCard>
  );
}
