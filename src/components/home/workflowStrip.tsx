import {
  ArrowRight,
  Hand,
  HelpCircle,
  MessageSquareHeart,
  Rocket,
  Search,
  Sparkles,
  Users,
} from "lucide-react";

const STEPS = [
  { label: "Say Hello", icon: Hand },
  { label: "AI Greets You", icon: Sparkles },
  { label: "Ask or Search", icon: HelpCircle },
  { label: "AI Searches + Matches", icon: Search },
  { label: "View Recommendations", icon: Users },
  { label: "React / Reply", icon: MessageSquareHeart },
  { label: "Start Conversation", icon: Rocket },
];

export default function WorkflowStrip() {
  return (
    <div className="flex items-center gap-2 overflow-x-auto rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(20,14,9,0.6)] px-4 py-3.5 backdrop-blur-md sm:px-6">
      <span className="shrink-0 text-xs font-semibold text-[#F3E9DE]">Workflow:</span>
      {STEPS.map((step, index) => {
        const Icon = step.icon;
        const isLast = index === STEPS.length - 1;
        return (
          <div key={step.label} className="flex shrink-0 items-center gap-2">
            <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[rgba(255,255,255,0.08)] px-3 py-1.5 text-xs text-[#B8AA9C] transition hover:border-[rgba(255,255,255,0.2)] hover:text-[#F3E9DE]">
              <Icon size={13} />
              {step.label}
            </span>
            {!isLast && <ArrowRight size={13} className="shrink-0 text-[#8A7C6E]" />}
          </div>
        );
      })}
    </div>
  );
}
