import { useParams } from "react-router-dom";
import { useProfile } from "../contexts/ProfileContexts";
import { useConversations } from "../hooks/useConversations";
import { useConversation } from "../hooks/useConversation";
import { useChat } from "../hooks/useChat";
import ConversationList from "../components/chat/conversationList";
import ChatHeader from "../components/chat/chatHeader";
import MessageBubble from "../components/chat/messageBubble";
import MessageInput from "../components/chat/messageInput";
import SuggestedMessage from "../components/chat/suggestedMessage";
import loungeBg from "../Assets/lounge-bg.jpg";

export default function MessagesPage() {
  const { conversationId } = useParams<{ conversationId?: string }>();
  const { profile } = useProfile();

  const {
    conversations,
    loading: conversationsLoading,
    error: conversationsError,
  } = useConversations(profile?.id);

  const {
    conversation,
    messages,
    loading: messageLoading,
    refetch,
  } = useConversation(conversationId);

  const { sendMessage } = useChat();

  const handleSend = async (text: string) => {
    if (!profile?.id || !conversationId) return;
    await sendMessage(conversationId, profile.id, text, false);
    await refetch();
  };

  const activeConversationSummary = conversations.find(
    (c) => c.conversationId === conversationId
  );

  const otherUserName =
    activeConversationSummary?.otherUser.fullName ??
    conversation?.otherUser?.fullName ??
    "";

  const otherUserPhoto =
    activeConversationSummary?.otherUser.photoUrl ??
    conversation?.otherUser?.photoUrl ??
    null;
  const showSuggestion =
    conversation && messages.length === 0 && conversation.firstMessage;

  return (
    <div className="relative flex h-full gap-4 rounded-2xl overflow-hidden">
      {/* Background photo, sharp, no blur */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${loungeBg})` }}
      />
      <div className="absolute inset-0 bg-[#0d0906]/55" />

      <div className="relative z-10 flex w-full gap-4">

        {/* Left: conversation list */}
        <div
          className={`w-full lg:w-[420px] flex-shrink-0 rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(20,14,9,0.6)] backdrop-blur-md p-4 overflow-y-auto ${conversationId ? "hidden lg:block" : "block"
            }`}
        >
          <h2 className="text-lg font-semibold text-[#F3E9DE] mb-4 px-1">
            Messages
          </h2>

          <ConversationList
            conversations={conversations}
            loading={conversationsLoading}
            error={conversationsError}
          />
        </div>

        {/* Right: chat panel */}
        <div
          className={`flex-1 max-w-2xl mx-auto flex-col rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(20,14,9,0.55)] backdrop-blur-md overflow-hidden ${conversationId ? "flex" : "hidden lg:flex"
            }`}
        >
          {!conversationId ? (
            <div className="flex-1 flex items-center justify-center text-[#8A7C6E] text-sm p-8 text-center">
              Select a conversation to start chatting.
            </div>
          ) : messageLoading || !conversation ? (
            <div className="flex-1 flex items-center justify-center text-[#B8AA9C] text-sm">
              Loading conversation...
            </div>
          ) : (
            <>
              <div className="px-5 pt-5">
                <ChatHeader
                  fullName={otherUserName}
                  photoUrl={otherUserPhoto}
                />
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
                {messages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    currentProfileId={profile?.id ?? ""}
                  />
                ))}

                {showSuggestion && (
                  <SuggestedMessage
                    firstMessage={conversation.firstMessage}
                    conversationId={conversationId}
                    onSend={handleSend}
                  />
                )}
              </div>

              <div className="px-5 pb-5">
                <MessageInput onSend={handleSend} />
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}