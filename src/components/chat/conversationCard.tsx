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
      className="w-full rounded-xl border border-slate-800 bg-slate-900 p-4 transition hover:border-slate-700 hover:bg-slate-800"
    >
      <div className="flex items-center gap-4">
        <img
          src={
            conversation.otherUser.photoUrl ??
            "https://placehold.co/100x100"
          }
          alt={conversation.otherUser.fullName}
          className="h-14 w-14 rounded-full object-cover"
        />

        <div className="flex-1 text-left">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">
              {conversation.otherUser.fullName}
            </h3>

            <span className="text-xs text-slate-400">
              {formattedTime}
            </span>
          </div>

          <p className="mt-1 truncate text-sm text-slate-400">
            {conversation.lastMessage}
          </p>
        </div>

        {conversation.unreadCount > 0 && (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
            {conversation.unreadCount}
          </div>
        )}
      </div>
    </button>
  );
}