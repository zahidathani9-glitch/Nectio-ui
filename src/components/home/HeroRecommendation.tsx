import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../contexts/ProfileContexts";
import ChatPanel from "./chatPanel";
import { buildGreeting, buildUserMessage } from "../../lib/chatEngine";
import type { ChatMessage, FeedItem } from "../../types/chat";
import { sendMessageToAgent } from "../../lib/agent";
import {
  startConversation,
  sendConversationMessage,
  regenerateAgentIntroduction,
} from "../../lib/chat";

export default function HeroRecommendation() {
  const { feedLoading, profile } = useProfile();
  const navigate = useNavigate();

  const firstName = profile?.full_name?.trim()?.split(" ")[0] || "there";
  const STORAGE_KEY = profile
    ? `agent-chat-${profile.id}`
    : "agent-chat";

  const [messages, setMessages] = useState<ChatMessage[]>(() => [buildGreeting(firstName)]);
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    if (!profile) return;

    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, [profile, STORAGE_KEY]);

  useEffect(() => {
    if (!profile) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages, profile, STORAGE_KEY]);

  const handleSend = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      setMessages((prev) => [
        ...prev,
        buildUserMessage(text),
      ]);

      setIsThinking(true);

      try {
        const assistantMessage = await sendMessageToAgent(
          profile!.id,
          text
        );

        setMessages((prev) => [
          ...prev,
          assistantMessage,
        ]);
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content:
              "Something went wrong.",
            timestamp: Date.now(),
          },
        ]);
      }

      setIsThinking(false);
    },
    [profile]
  );

  const handleNewChat = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setMessages([buildGreeting(firstName)]);
    setIsThinking(false);
  }, [firstName, STORAGE_KEY]);

  // Listen to events from layout sidebar
  useEffect(() => {
    const handleNewChatEvent = () => {
      handleNewChat();
    };

    const handleSendPromptEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        handleSend(customEvent.detail);
      }
    };

    window.addEventListener("nectio-new-chat", handleNewChatEvent);
    window.addEventListener("nectio-send-prompt", handleSendPromptEvent);

    return () => {
      window.removeEventListener("nectio-new-chat", handleNewChatEvent);
      window.removeEventListener("nectio-send-prompt", handleSendPromptEvent);
    };
  }, [handleNewChat, handleSend]);

  const handleStartConversation = useCallback(
    async (item: FeedItem) => {
      if (!profile) return;

      try {
        const conversation = await startConversation(
          profile.id,
          item.profileId,
          "manual"
        );

        navigate(`/message/${conversation.conversation.id}`);
      } catch (err) {
        console.error("Failed to start conversation:", err);
      }
    },
    [profile, navigate]
  );

  const handleApprove = useCallback(async (message: ChatMessage) => {
    if (!profile) return;
    if (!message.approval) return;

    try {
      const conversation = await startConversation(
        profile.id,
        message.approval.payload.personId,
        "agent"
      );

      console.log(conversation);

      await sendConversationMessage(
        conversation.conversation.id,
        profile.id,
        message.approval.payload.draft,
        true
      );

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === message.id
            ? {
                ...msg,
                approval: undefined,
                content: "✅ Introduction sent successfully.",
              }
            : msg
        )
      );

      navigate(`/message/${conversation.conversation.id}`);
    } catch (err) {
      console.error(err);
    }
  }, [profile, navigate]);

  const handleRegenerate = useCallback(
    async (message: ChatMessage) => {
      if (!profile) return;
      if (!message.approval) return;

      try {
        const result = await regenerateAgentIntroduction(
          profile.id,
          message.approval.payload.personId
        );

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === message.id
              ? {
                  ...msg,
                  approval: {
                    ...msg.approval!,
                    payload: {
                      ...msg.approval!.payload,
                      draft: result.draft,
                    },
                  },
                }
              : msg
          )
        );
      } catch (err) {
        console.error(err);
      }
    },
    [profile]
  );

  const handleCancel = useCallback((message: ChatMessage) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === message.id
          ? {
              ...msg,
              approval: undefined,
              content: "❌ Introduction cancelled.",
            }
          : msg
      )
    );
  }, []);

  return (
    <div className="flex-1 flex flex-col min-h-0 h-full w-full">
      <ChatPanel
        messages={messages}
        isThinking={isThinking}
        loadingFeed={feedLoading}
        onSend={handleSend}
        onStartConversation={handleStartConversation}
        onApprove={handleApprove}
        onRegenerate={handleRegenerate}
        onCancel={handleCancel}
      />
    </div>
  );
}