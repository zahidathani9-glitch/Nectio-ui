import QuestionCard from "../questionCard";
import type { NavProps } from "../types";

interface Skill {
  id: number;
  name: string;
}

interface Props {
  title: string;
  subtitle?: string;
  skills: Skill[];
  selected: string[];
  setSelected: (value: string[]) => void;
  /** Injected by Wizard — not passed by ProfilePage. */
  nav?: NavProps;
}

export default function MultiSelectCard({
  title,
  subtitle,
  skills,
  selected,
  setSelected,
  nav,
}: Props) {
  const toggleSkill = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <QuestionCard title={title} subtitle={subtitle} nav={nav}>
      <div className="flex flex-wrap gap-2.5">
        {skills.map((skill) => {
          const isSelected = selected.includes(String(skill.id));

          return (
            <button
              key={skill.id}
              onClick={() => toggleSkill(String(skill.id))}
              className={`
                rounded-full
                border
                px-5
                py-3
                text-sm
                font-medium
                text-white
                transition-all
                duration-200
                ${
                  isSelected
                    ? "border-transparent"
                    : "border-white/10 bg-white/[0.03] hover:border-[#E8934A]/40 hover:bg-white/[0.06]"
                }
              `}
              style={
                isSelected
                  ? {
                      backgroundColor: "#E8934A",
                      boxShadow: "0 6px 18px -8px rgba(232,147,74,0.55)",
                    }
                  : undefined
              }
            >
              {skill.name}
            </button>
          );
        })}
      </div>
    </QuestionCard>
  );
}
