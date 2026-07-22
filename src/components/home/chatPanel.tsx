import { useEffect, useRef, useState } from "react";
import ChatInput from "./chatInput";
import ChatMessageBubble from "./chatMessageBubble";
import ProfileDetailDrawer from "./profileDetailDrawer";
import type { ChatMessage, FeedItem } from "../../types/chat";
import { AnimatePresence } from "framer-motion";

interface ChatPanelProps {
  messages: ChatMessage[];
  isThinking: boolean;
  loadingFeed: boolean;
  onSend: (text: string) => void;
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
  onStartConversation,
  onApprove,
  onRegenerate,
  onCancel,
}: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Profile Detail Drawer State
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<FeedItem | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isThinking]);

  const handleViewProfile = (item: FeedItem) => {
    setSelectedProfile(item);
    setDrawerOpen(true);
  };

  const handleDrawerMessage = () => {
    if (selectedProfile) {
      onStartConversation(selectedProfile);
      setDrawerOpen(false);
    }
  };

  return (
    <section className="flex-1 flex flex-col min-h-0 h-full w-full overflow-hidden bg-transparent">
      {/* Scrollable Conversation Container */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto w-full px-4 py-6 md:py-8 space-y-6 scroll-smooth"
      >
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-6">
          {loadingFeed && (
            <div className="flex items-center gap-2.5 text-xs text-[#8A7C6E] animate-pulse">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F3E9DE]/60 animate-bounce" />
              <span>Finding your AI matches...</span>
            </div>
          )}

          {messages.map((message) => (
            <ChatMessageBubble
              key={message.id}
              message={message}
              onActionClick={onSend}
              onStartConversation={onStartConversation}
              onApprove={onApprove}
              onRegenerate={onRegenerate}
              onCancel={onCancel}
              onViewProfile={handleViewProfile}
            />
          ))}

          {isThinking && (
            <div className="flex items-center gap-2 text-xs text-[#8A7C6E] pl-2">
              <span className="h-2 w-2 animate-bounce rounded-full bg-[#F3E9DE]/50" style={{ animationDelay: "0ms" }} />
              <span className="h-2 w-2 animate-bounce rounded-full bg-[#F3E9DE]/50" style={{ animationDelay: "150ms" }} />
              <span className="h-2 w-2 animate-bounce rounded-full bg-[#F3E9DE]/50" style={{ animationDelay: "300ms" }} />
            </div>
          )}
        </div>
      </div>

      {/* Floating Bottom Fixed Input Section */}
      <div className="w-full px-4 pb-6 pt-3 bg-gradient-to-t from-[#0d0906] via-[#0d0906]/95 to-transparent border-t border-white/5">
        <div className="max-w-3xl mx-auto w-full">
          <ChatInput onSend={onSend} />
          <p className="mt-2 text-center text-[10px] text-[#8A7C6E] tracking-wide">
            AI can make mistakes. Please verify important information.
          </p>
        </div>
      </div>

      {/* Profile detail sliding drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <ProfileDetailDrawer
            isOpen={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            item={selectedProfile}
            onMessage={handleDrawerMessage}
          />
        )}
      </AnimatePresence>
    </section>
  );
}