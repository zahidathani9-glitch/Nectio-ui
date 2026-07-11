import { useCallback, useEffect, useState } from "react";
import { APP_URL } from "../lib/api";

export function useConversation(conversationId?: string) {
  const [conversation, setConversation] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchConversation = useCallback(async () => {
    if (!conversationId) return;

    try {
      setLoading(true);

      const response = await fetch(
        `${APP_URL}/api/chat/${conversationId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch conversation");
      }

      const data = await response.json();

      setConversation(data.conversation);
      setMessages(data.messages);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [conversationId]);

  useEffect(() => {
    fetchConversation();
  }, [fetchConversation]);

  return {
    conversation,
    messages,
    loading,
    refetch: fetchConversation,
  };
}