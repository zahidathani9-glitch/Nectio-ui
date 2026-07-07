import QuestionCard from "../questionCard";

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
}

export default function MultiSelectCard({
  title,
  subtitle,
  skills,
  selected,
  setSelected,
}: Props) {
  const toggleSkill = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <QuestionCard
      title={title}
      subtitle={subtitle}
    >
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <button
            key={skill.id}
            onClick={() => toggleSkill(String(skill.id))}
            className={`
              rounded-full
              px-5
              py-3
              transition-all
              ${
                selected.includes(String(skill.id))
                  ? "bg-green-600"
                  : "bg-slate-800 hover:bg-slate-700"
              }
            `}
          >
            {skill.name}
          </button>
        ))}
      </div>
    </QuestionCard>
  );
}