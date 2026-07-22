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
    return <section className="p-2 text-xs text-[#B8AA9C]">Loading conversations...</section>;
  }

  if (upcoming.length === 0) {
    return (
      <section className="w-full mt-1">
        <div className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(20,14,9,0.4)] p-3 text-center text-xs text-[#B8AA9C]">
          No conversations yet. Ask AI Assistant to find matches.
        </div>
      </section>
    );
  }

  return (
    <section className="w-full mt-1">
      <div className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(20,14,9,0.4)] overflow-hidden">
        {upcoming.map((conversation) => {
          const subtitle = conversation.lastMessage || "Start conversation";

          return (
            <div
              key={conversation.conversationId}
              className="flex items-center justify-between gap-2 border-b border-[rgba(255,255,255,0.06)] p-2.5 last:border-none hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <img
                  src={
                    conversation.otherUser.photoUrl ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      conversation.otherUser.fullName
                    )}`
                  }
                  alt={conversation.otherUser.fullName}
                  className="h-8 w-8 shrink-0 rounded-full object-cover border border-[rgba(255,255,255,0.1)]"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="text-xs font-semibold text-[#F3E9DE] truncate">
                    {conversation.otherUser.fullName}
                  </h3>
                  <p className="text-[11px] text-[#B8AA9C] truncate">
                    {subtitle}
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate(`/message/${conversation.conversationId}`)}
                className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-[#F3E9DE] px-1.5 py-1.5 text-xs font-medium text-[#0d0906] transition hover:bg-white whitespace-nowrap"
              >
                <MessageCircle size={13} />
                Open Message
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-2 flex justify-end px-0.5">
        <button
          onClick={() => navigate("/messages")}
          className="flex items-center gap-1 text-[11px] text-[#F3E9DE]/80 hover:text-[#F3E9DE]"
        >
          View All
          <ArrowRight size={12} />
        </button>
      </div>
    </section>
  );
}