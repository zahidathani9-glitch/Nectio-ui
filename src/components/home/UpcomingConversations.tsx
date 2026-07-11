import {
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { useProfile } from "../../contexts/ProfileContexts";
import { useConversations } from "../../hooks/useConversations";
import { useNavigate } from "react-router-dom";


export default function UpcomingConversations() {
  const navigate = useNavigate();

  const { profile } = useProfile();

  const {
    conversations,
    loading,
  } = useConversations(profile?.id);
  const upcoming = conversations.slice(0, 3);


  if (loading) {
    return (
      <section className="mt-10 text-white">
        Loading conversations...
      </section>
    );
  }

  if (upcoming.length === 0) {
    return (
      <section className="mt-10">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
          No conversations yet. Start one from Discover.
        </div>
      </section>
    );
  }

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

        <button
          onClick={() => navigate("/messages")}
          className="flex items-center gap-2 text-green-400 hover:text-green-300"
        >
          View All
          <ArrowRight size={18} />
        </button>

      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900">

        {upcoming.map((conversation) => (

          <div
            key={conversation.conversationId}
            className="flex items-center justify-between border-b border-slate-800 p-6 last:border-none"
          >

            <div className="flex items-center gap-5">

              <img
  src={
    conversation.otherUser.photoUrl ??
    "https://ui-avatars.com/api/?name=" +
      encodeURIComponent(conversation.otherUser.fullName)
  }
  alt={conversation.otherUser.fullName}
  className="h-14 w-14 rounded-full object-cover"
/>

              <div>

                <h3 className="font-semibold text-white">
                  {conversation.otherUser.fullName}
                </h3>


                <p className="mt-1 text-sm text-green-400">
                  {conversation.lastMessage ||
                    "Start your conversation"}
                </p>

              </div>

            </div>

            <div className="text-right">

              <p className="text-sm text-slate-400">
                {new Date(
                  conversation.lastMessageAt
                ).toLocaleDateString()}
              </p>

              <button
                onClick={() =>
                  navigate(`/message/${conversation.conversationId}`)
                }
                className="mt-3 inline-flex items-center gap-2 rounded-xl bg-green-500 px-5 py-2 font-medium text-white transition hover:bg-green-600"
              >
                <MessageCircle size={16} />
                Open Message
              </button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}