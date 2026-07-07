import {
  MessageCircle,
  ArrowRight,
} from "lucide-react";

const conversations = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Backend Engineer",
    status: "AI Introduction Ready",
    time: "Today • 5:30 PM",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
  },
  {
    id: 2,
    name: "Ahmed Khan",
    role: "Startup Founder",
    status: "Waiting for your response",
    time: "Tomorrow • 11:00 AM",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "ML Engineer",
    status: "Conversation Scheduled",
    time: "Friday • 4:00 PM",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
  },
];

export default function UpcomingConversations() {
  return (
    <section className="mt-10">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold text-white">
            Upcoming Conversations
          </h2>

          <p className="mt-2 text-slate-400">
            Conversations recommended and managed by AI.
          </p>

        </div>

        <button className="flex items-center gap-2 text-green-400 hover:text-green-300">

          View All

          <ArrowRight size={18} />

        </button>

      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900">

        {conversations.map((person) => (

          <div
            key={person.id}
            className="flex items-center justify-between border-b border-slate-800 p-6 last:border-none"
          >

            <div className="flex items-center gap-5">

              <img
                src={person.avatar}
                className="h-14 w-14 rounded-full object-cover"
              />

              <div>

                <h3 className="font-semibold text-white">
                  {person.name}
                </h3>

                <p className="text-sm text-slate-400">
                  {person.role}
                </p>

                <p className="mt-1 text-sm text-green-400">
                  {person.status}
                </p>

              </div>

            </div>

            <div className="text-right">

              <p className="text-sm text-slate-400">
                {person.time}
              </p>

              <button className="mt-3 inline-flex items-center gap-2 rounded-xl bg-green-500 px-5 py-2 font-medium text-white transition hover:bg-green-600">

                <MessageCircle size={16} />

                Open Chat

              </button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}