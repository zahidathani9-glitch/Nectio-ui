import { Lightbulb, Lock, MessageCircle, Search } from "lucide-react";

interface InfoSidebarProps {
  onPromptClick: (prompt: string) => void;
}

const HOW_IT_WORKS = [
  "Say hello to start a conversation",
  "Ask for recommendations or search people",
  "Review matches and connect",
];

const EXAMPLE_PROMPTS = [
  "Show me recommendations",
  "Find people with experience in React",
  "Who can help me with startup ideas?",
  "People working in Bangalore",
];

const CAPABILITIES = [
  "Find people based on skills, experience and interests",
  "Search across our network and the web",
  "Recommend the best matches for you",
  "Help you connect and start conversations",
];

export default function InfoSidebar({ onPromptClick }: InfoSidebarProps) {
  return (
    <aside className="w-full flex flex-col gap-4 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(20,14,9,0.4)] p-3.5 backdrop-blur-md mt-1">
      <section>
        <h3 className="flex items-center gap-2 text-xs font-semibold text-[#F3E9DE]">
          <MessageCircle size={14} />
          How it works
        </h3>
        <ol className="mt-2 space-y-1.5 text-[11px] leading-relaxed text-[#B8AA9C]">
          {HOW_IT_WORKS.map((step, index) => (
            <li key={step}>
              {index + 1}. {step}
            </li>
          ))}
        </ol>
      </section>

      <div className="border-t border-[rgba(255,255,255,0.06)]" />

      <section>
        <h3 className="flex items-center gap-2 text-xs font-semibold text-[#F3E9DE]">
          <Search size={14} />
          You can try
        </h3>
        <div className="mt-2 flex flex-col gap-1.5">
          {EXAMPLE_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => onPromptClick(prompt)}
              className="w-full rounded-lg border border-[rgba(255,255,255,0.08)] px-2.5 py-1.5 text-left text-[11px] text-[#B8AA9C] transition hover:border-[rgba(255,255,255,0.2)] hover:text-[#F3E9DE] truncate"
            >
              "{prompt}"
            </button>
          ))}
        </div>
      </section>

      <div className="border-t border-[rgba(255,255,255,0.06)]" />

      <section>
        <h3 className="flex items-center gap-2 text-xs font-semibold text-[#F3E9DE]">
          <Lightbulb size={14} />
          What I can do
        </h3>
        <ul className="mt-2 space-y-1.5 text-[11px] leading-relaxed text-[#B8AA9C]">
          {CAPABILITIES.map((item) => (
            <li key={item} className="flex gap-1.5">
              <span className="text-[#8A7C6E]">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-1 flex items-center gap-2 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-3 py-2 text-[11px] text-[#B8AA9C]">
        <Lock size={13} className="shrink-0 text-[#8A7C6E]" />
        Your conversations are private and secure
      </div>
    </aside>
  );
}
