import {
  Crown,
  Users,
  Code2,
  GraduationCap,
  CalendarDays,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import ComingSoonModal from "../ui/comingSoonModal";

const opportunities = [
  {
    title: "Upgrade to Nectio+",
    description: "Unlock AI Agent, unlimited AI matching and premium networking.",
    icon: Crown,
    color: "text-yellow-400",
    action: "premium",
  },
  {
    title: "Find Co-Founder",
    description: "Meet ambitious founders looking to build startups together.",
    icon: Users,
    color: "text-purple-400",
    action: "prompt",
    prompt: "Find me startup co-founders.",
  },
  {
    title: "Find AI Engineers",
    description: "Connect with AI, Backend, Frontend and ML engineers building the future.",
    icon: Code2,
    color: "text-pink-400",
    action: "prompt",
    prompt: "Find AI engineers.",
  },
  {
    title: "Find Mentors",
    description: "Connect with experienced professionals and industry experts.",
    icon: GraduationCap,
    color: "text-blue-400",
    action: "prompt",
    prompt: "Find experienced mentors.",
  },
  {
    title: "Networking Events",
    description: "Discover hackathons, meetups and startup events.",
    icon: CalendarDays,
    color: "text-red-400",
    action: "prompt",
    prompt: "Show networking events.",
  },
];

export default function ExploreOpportunities() {
  const navigate = useNavigate();
  const location = useLocation();

  const [modal, setModal] = useState({ open: false, title: "", description: "" });

  const handleClick = (item: (typeof opportunities)[number]) => {
    if (item.action === "premium") {
      setModal({
        open: true,
        title: "🚀 Nectio+",
        description:
          "Nectio+ is coming soon.\n\nYou'll unlock AI Agents, unlimited AI matching, advanced networking insights, and premium features.",
      });
      return;
    }

    if (item.prompt) {
      if (location.pathname !== "/home") {
        navigate("/home");
      }
      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent("nectio-send-prompt", { detail: item.prompt })
        );
      }, 150);
    }
  };

  return (
    <section className="w-full mt-1">
      <div className="mb-2 px-0.5">
        <p className="text-xs text-[#B8AA9C]">
          Grow your career, startup and professional network.
        </p>
      </div>

      <div className="flex flex-col gap-2.5 w-full">
        {opportunities.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              onClick={() => handleClick(item)}
              className="w-full rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(20,14,9,0.6)] backdrop-blur-md p-3.5 text-left transition-all hover:bg-white/[0.04] hover:border-[rgba(255,255,255,0.2)]"
            >
              <Icon className={`${item.color} mb-2`} size={22} />
              <h3 className="text-sm font-semibold text-[#F3E9DE]">
                {item.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-[#B8AA9C]">
                {item.description}
              </p>
            </button>
          );
        })}
      </div>

      <ComingSoonModal
        open={modal.open}
        title={modal.title}
        description={modal.description}
        onClose={() => setModal({ open: false, title: "", description: "" })}
      />
    </section>
  );
}