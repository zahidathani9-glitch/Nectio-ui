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
    return <section className="mt-8 sm:mt-10 text-[#F3E9DE]">Loading conversations...</section>;
  }

  if (upcoming.length === 0) {
    return (
      <section className="mt-8 sm:mt-10">
        <div className="rounded-3xl border border-[rgba(255,255,255,0.1)] bg-[rgba(20,14,9,0.6)] backdrop-blur-md p-8 text-center text-[#B8AA9C]">
          No conversations yet. Start one from Discover.
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8 sm:mt-10">
      <div className="mb-6 sm:mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F3E9DE]">
            Upcoming Conversations
          </h2>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-[#B8AA9C]">
            Conversations recommended and managed by AI.
          </p>
        </div>

        <button
          onClick={() => navigate("/messages")}
          className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base text-[#F3E9DE]/80 hover:text-[#F3E9DE] flex-shrink-0"
        >
          <span className="hidden sm:inline">View All</span>
          <ArrowRight size={18} />
        </button>
      </div>

      <div className="rounded-3xl border border-[rgba(255,255,255,0.1)] bg-[rgba(20,14,9,0.6)] backdrop-blur-md">
        {upcoming.map((conversation) => (
          <div
            key={conversation.conversationId}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.08)] p-4 sm:p-6 last:border-none"
          >
            <div className="flex items-center gap-4 sm:gap-5 min-w-0">
              <img
                src={
                  conversation.otherUser.photoUrl ??
                  "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(conversation.otherUser.fullName)
                }
                alt={conversation.otherUser.fullName}
                className="h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0 rounded-full object-cover border border-[rgba(255,255,255,0.1)]"
              />

              <div className="min-w-0">
                <h3 className="font-semibold text-[#F3E9DE] truncate">
                  {conversation.otherUser.fullName}
                </h3>
                <p className="mt-1 text-sm text-[#B8AA9C] truncate">
                  {conversation.lastMessage || "Start your conversation"}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:flex-col sm:items-end flex-shrink-0">
              <p className="text-sm text-[#8A7C6E]">
                {new Date(conversation.lastMessageAt).toLocaleDateString()}
              </p>

              <button
                onClick={() => navigate(`/message/${conversation.conversationId}`)}
                className="mt-0 sm:mt-3 inline-flex items-center gap-2 rounded-xl bg-[#F3E9DE] px-4 sm:px-5 py-2 text-sm sm:text-base font-medium text-[#0d0906] transition hover:bg-white"
              >
                <MessageCircle size={16} />
                <span className="hidden sm:inline">Open Message</span>
                <span className="sm:hidden">Open</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}