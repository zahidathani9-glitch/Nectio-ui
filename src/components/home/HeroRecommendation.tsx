import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../contexts/ProfileContexts";
import ChatPanel from "./chatPanel";
import InfoSidebar from "./infoSidebar";
import WorkflowStrip from "./workflowStrip";
import { buildGreeting, buildUserMessage } from "../../lib/chatEngine";
import type { ChatMessage, FeedItem } from "../../types/chat";
import { sendMessageToAgent } from "../../lib/agent";
import {
  startConversation,
  sendConversationMessage,
} from "../../lib/chat";
// Component name kept as HeroRecommendation so existing imports/routes
// don't need to change — it now renders the AI networking agent chat
// instead of the old single-recommendation hero.
export default function HeroRecommendation() {
  const { feedLoading, profile } = useProfile();
  const navigate = useNavigate();

  const firstName = profile?.full_name?.trim()?.split(" ")[0] || "there";

  const [messages, setMessages] = useState<ChatMessage[]>(() => [buildGreeting(firstName)]);
  const [isThinking, setIsThinking] = useState(false);

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

setMessages(prev => [
    ...prev,
    assistantMessage
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
    setMessages([buildGreeting(firstName)]);
    setIsThinking(false);
  }, [firstName]);

  const handleViewProfile = useCallback(
    (_item: FeedItem) => {
      navigate("/discover");
    },
    [navigate]
  );

  // Temporary handlers for approval actions. These are placeholders only —
  // wiring them up to real backend logic is out of scope for now.
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


setMessages(prev =>
  prev.map(msg =>
    msg.id === message.id
      ? {
          ...msg,
          approval: undefined,
          content: "✅ Introduction sent successfully."
        }
      : msg
  )
);

navigate(`/message/${conversation.conversation.id}`);

  } catch (err) {
    console.error(err);
  }
}, [profile]);
  const handleRegenerate = useCallback((message: ChatMessage) => {
    console.log("regenerate", message);
  }, []);

  const handleCancel = useCallback((message: ChatMessage) => {
    console.log("cancel", message);
  }, []);

  return (
    <section className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px] lg:items-start">
        <ChatPanel
          messages={messages}
          isThinking={isThinking}
          loadingFeed={feedLoading}
          onSend={handleSend}
          onNewChat={handleNewChat}
          onViewProfile={handleViewProfile}
          onApprove={handleApprove}
          onRegenerate={handleRegenerate}
          onCancel={handleCancel}
        />
        <InfoSidebar onPromptClick={handleSend} />
      </div>

      <WorkflowStrip />
    </section>
  );
}