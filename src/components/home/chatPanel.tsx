import { RotateCcw, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import ChatInput from "./chatInput";
import ChatMessageBubble from "./chatMessageBubble";
import type { ChatMessage, FeedItem } from "../../types/chat";

interface ChatPanelProps {
  messages: ChatMessage[];
  isThinking: boolean;
  loadingFeed: boolean;
  onSend: (text: string) => void;
  onNewChat: () => void;
  onStartConversation: (item: FeedItem) => void;
  onApprove: (message: ChatMessage) => void;
  onRegenerate: (message: ChatMessage) => void;
  onCancel: (message: ChatMessage) => void;
}

export default function ChatPanel({
  messages,
  isThinking,
  loadingFeed,
  onSend,
  onNewChat,
  onStartConversation,
  onApprove,
  onRegenerate,
  onCancel,
}: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isThinking]);

  return (
    <section className="flex h-[75vh] min-h-[520px] flex-col overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(20,14,9,0.6)] backdrop-blur-md lg:h-[calc(100vh-11rem)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(255,255,255,0.08)] text-[#F3E9DE]">
            <Sparkles size={16} />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-[#F3E9DE]">AI Agent</h1>
            <p className="text-xs text-[#8A7C6E]">Your smart networking assistant</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onNewChat}
          className="flex items-center gap-1.5 rounded-full border border-[rgba(255,255,255,0.12)] px-3 py-1.5 text-xs font-medium text-[#B8AA9C] transition hover:border-[rgba(255,255,255,0.3)] hover:text-[#F3E9DE]"
        >
          <RotateCcw size={13} />
          New Chat
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-5 overflow-y-auto px-4 py-5 sm:px-6">
        {loadingFeed && <p className="text-xs text-[#8A7C6E]">Finding your AI matches...</p>}

        {messages.map((message) => (
          <ChatMessageBubble
            key={message.id}
            message={message}
            onActionClick={onSend}
            onStartConversation={onStartConversation}
            onApprove={onApprove}
            onRegenerate={onRegenerate}
            onCancel={onCancel}
          />
        ))}

        {isThinking && (
          <div className="flex items-center gap-2 text-xs text-[#8A7C6E]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#F3E9DE]/60" />
            <span
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#F3E9DE]/60"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#F3E9DE]/60"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-[rgba(255,255,255,0.08)] px-4 py-4 sm:px-6">
        <ChatInput onSend={onSend} />
        <p className="mt-2 text-center text-[11px] text-[#8A7C6E]">
          AI can make mistakes. Please verify important information.
        </p>
      </div>
    </section>
  );
}