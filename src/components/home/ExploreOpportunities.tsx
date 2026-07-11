import {
  Crown,
  Users,
  Code2,
  GraduationCap,
  CalendarDays,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ComingSoonModal from "../ui/comingSoonModal";

const opportunities = [
  {
    title: "Upgrade to Nectio+",
    description:
      "Unlock AI Agent, unlimited AI matching and premium networking.",
    icon: Crown,
    color: "text-yellow-400",
    action: "premium",
  },
  {
    title: "Find Co-Founder",
    description:
      "Meet ambitious founders looking to build startups together.",
    icon: Users,
    color: "text-purple-400",
    action: "discover",
  },
  {
    title: "Find AI Engineers",
    description:
      "Connect with AI, Backend, Frontend and ML engineers building the future.",
    icon: Code2,
    color: "text-pink-400",
    action: "discover",
  },
  {
    title: "Find Mentors",
    description:
      "Connect with experienced professionals and industry experts.",
    icon: GraduationCap,
    color: "text-blue-400",
    action: "discover",
  },
  {
    title: "Networking Events",
    description:
      "Discover hackathons, meetups and startup events.",
    icon: CalendarDays,
    color: "text-red-400",
    action: "events",
  },
];

export default function ExploreOpportunities() {
  const navigate = useNavigate();

  const [modal, setModal] = useState({
    open: false,
    title: "",
    description: "",
  });


  const handleClick = (action: string) => {
    switch (action) {
      case "discover":
        navigate("/discover");
        break;

      case "premium":
        setModal({
          open: true,
          title: "🚀 Nectio+",
          description:
            "Nectio+ is coming soon.\n\nYou'll unlock AI Agents, unlimited AI matching, advanced networking insights, and premium features.",
        });
        break;

      case "events":
        setModal({
          open: true,
          title: "📅 Networking Events",
          description:
            "No upcoming networking events.\n\nWe're working on bringing hackathons, meetups, startup events, and community gatherings to Nectio soon.",
        });
        break;
    }
  };
  return (
    <section className="mt-10">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold text-white">
            Explore Opportunities
          </h2>

          <p className="mt-2 text-slate-400">
            Grow your career, startup and professional network.
          </p>

        </div>

      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">

        {opportunities.map((item) => {

          const Icon = item.icon;

          return (

            <button
              key={item.title}
              onClick={() => handleClick(item.action)}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-left transition-all hover:-translate-y-1 hover:border-green-500 hover:shadow-xl"
            >

              <Icon
                className={`${item.color} mb-5`}
                size={34}
              />

              <h3 className="text-lg font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
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
        onClose={() =>
          setModal({
            open: false,
            title: "",
            description: "",
          })
        }
      />

    </section>
  );
}