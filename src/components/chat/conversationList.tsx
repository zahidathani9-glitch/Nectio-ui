import ConversationCard from "./conversationCard";
import { type ConversationSummary } from "../../hooks/useConversations";

interface ConversationListProps {
  conversations: ConversationSummary[];
  loading: boolean;
  error: string | null;
}

export default function ConversationList({
  conversations,
  loading,
  error,
}: ConversationListProps) {
  if (loading) {
    return (
      <div className="p-6 text-[#8f8579]">
        Loading conversations...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        {error}
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="p-6 text-[#8f8579]">
        No conversations yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {conversations.map((conversation) => (
        <ConversationCard
          key={conversation.conversationId}
          conversation={conversation}
        />
      ))}
    </div>
  );
}