import { MessageCircle, ArrowRight } from "lucide-react";
import { useProfile } from "../../contexts/ProfileContexts";
import { useConversations } from "../../hooks/useConversations";
import { useNavigate } from "react-router-dom";

export default function UpcomingConversations() {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const { conversations, loading } = useConversations(profile?.id);
  const upcoming = conversations.slice(0, 3);

  if (loading) {
    return <section className="mt-6 text-sm text-[#F3E9DE]">Loading conversations...</section>;
  }

  if (upcoming.length === 0) {
    return (
      <section className="mt-6">
        <div className="rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(20,14,9,0.6)] backdrop-blur-md p-6 text-center text-sm text-[#B8AA9C]">
          No conversations yet. Start one from Discover.
        </div>
      </section>
    );
  }

  return (
    <section className="mt-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#F3E9DE]">
            Upcoming Conversations
          </h2>
          <p className="mt-1 text-xs text-[#B8AA9C]">
            Conversations recommended and managed by AI.
          </p>
        </div>

        <button
          onClick={() => navigate("/messages")}
          className="flex items-center gap-1.5 text-xs text-[#F3E9DE]/80 hover:text-[#F3E9DE]"
        >
          View All
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(20,14,9,0.6)] backdrop-blur-md">
        {upcoming.map((conversation) => (
          <div
            key={conversation.conversationId}
            className="flex items-center justify-between gap-3 border-b border-[rgba(255,255,255,0.08)] p-4 last:border-none"
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={
                  conversation.otherUser.photoUrl ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    conversation.otherUser.fullName
                  )}`
                }
                alt={conversation.otherUser.fullName}
                className="h-9 w-9 flex-shrink-0 rounded-full object-cover border border-[rgba(255,255,255,0.1)]"
              />

              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-[#F3E9DE] truncate">
                  {conversation.otherUser.fullName}
                </h3>
                <p className="text-xs text-[#B8AA9C] truncate">
                  {conversation.lastMessage || "Start your conversation"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <p className="hidden sm:block text-xs text-[#8A7C6E]">
                {new Date(conversation.lastMessageAt).toLocaleDateString()}
              </p>

              <button
                onClick={() => navigate(`/message/${conversation.conversationId}`)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#F3E9DE] px-3 py-1.5 text-xs font-medium text-[#0d0906] transition hover:bg-white"
              >
                <MessageCircle size={13} />
                Open Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}