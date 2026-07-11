import { useCallback, useEffect, useState } from "react";
import { APP_URL } from "../lib/api";

export interface ConversationSummary {
  conversationId: string;

  otherUser: {
    id: string;
    fullName: string;
    photoUrl: string | null;
  };

  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

export function useConversations(profileId?: string) {
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchConversations = useCallback(async () => {
    if (!profileId) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${APP_URL}/api/conversations/${profileId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch conversations");
      }

      const data = await response.json();

      setConversations(data);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch conversations"
      );
    } finally {
      setLoading(false);
    }
  }, [profileId]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  return {
    conversations,
    loading,
    error,
    refetch: fetchConversations,
  };
}