import { useNavigate } from "react-router-dom";
import { type ConversationSummary } from "../../hooks/useConversations";

interface ConversationCardProps {
  conversation: ConversationSummary;
}

export default function ConversationCard({
  conversation,
}: ConversationCardProps) {
  const navigate = useNavigate();

  const formattedTime = new Date(
    conversation.lastMessageAt
  ).toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "short",
  });

  return (
    <button
      onClick={() =>
        navigate(`/message/${conversation.conversationId}`)
      }
      className="w-full rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] p-4 transition hover:border-[rgba(255,255,255,0.25)] hover:bg-[rgba(255,255,255,0.08)]"
    >
      <div className="flex items-center gap-4">
        <img
          src={
            conversation.otherUser.photoUrl ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              conversation.otherUser.fullName
            )}`
          }
          alt={conversation.otherUser.fullName}
          className="h-14 w-14 flex-shrink-0 rounded-full object-cover border border-[rgba(255,255,255,0.1)]"
        />

        <div className="min-w-0 flex-1 text-left">
          <div className="flex items-center justify-between gap-2">
            <h3 className="min-w-0 truncate font-semibold text-[#F3E9DE]">
              {conversation.otherUser.fullName}
            </h3>

            <span className="flex-shrink-0 text-xs text-[#8A7C6E]">
              {formattedTime}
            </span>
          </div>

          <p className="mt-1 truncate text-sm text-[#B8AA9C]">
            {conversation.lastMessage}
          </p>
        </div>

        {conversation.unreadCount > 0 && (
          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#F3E9DE] text-xs font-semibold text-[#0d0906]">
            {conversation.unreadCount}
          </div>
        )}
      </div>
    </button>
  );
}