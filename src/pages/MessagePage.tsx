import { useParams } from "react-router-dom";
import { useConversation } from "../hooks/useConversation";
import ChatHeader from "../components/chat/chatHeader";
import SuggestedMessage from "../components/chat/suggestedMessage";
import { useChat } from "../hooks/useChat";
import { useProfile } from "../contexts/ProfileContexts";
import MessageBubble from "../components/chat/messageBubble";
import MessageInput from "../components/chat/messageInput";


export default function MessagePage() {

  const { profile } = useProfile();
  const { conversationId } = useParams();



  const {
    conversation,
    messages,
    loading,
    refetch,
  } = useConversation(conversationId);

  const hasMessages = messages.length > 0;

  const { sendMessage } = useChat();


  const handleSend = async (message: string) => {
    console.log("========== HANDLE SEND ==========");
    console.log("Conversation:", conversation);
    console.log("Profile:", profile);
    console.log("Message:", message);

    try {
      if (!conversation) {
        console.log("Conversation is missing");
        return;
      }

      if (!profile) {
        console.log("Profile is missing");
        return;
      }

      await sendMessage(
        conversation.id,
        profile.id,
        message,
        true
      );

      console.log("Message sent successfully");

      await refetch();

      console.log("Conversation refreshed");

    } catch (error) {
      console.error(error);
    }
  };


  const handleUserMessage = async (message: string) => {
    try {
      if (!conversation || !profile) return;

      await sendMessage(
        conversation.id,
        profile.id,
        message,
        false
      );

      await refetch();

    } catch (error) {
      console.error(error);
    }
  };

  // If the user directly visits this URL without navigation state,
  // send them back to Discover for now.

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading conversation...
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Conversation not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-8">

        <ChatHeader fullName="Conversation" />

        <div className="mt-8">
          {!hasMessages ? (
            <SuggestedMessage
              firstMessage={conversation.draft_message ?? ""}
              conversationId={conversation.id}
              onSend={handleSend}
            />
          ) : (
            <div className="space-y-4">

              {messages.map((message: any) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  currentProfileId={profile?.id ?? ""}
                />
              ))}

              <MessageInput
                onSend={handleUserMessage}
              />

            </div>
          )}
        </div>

      </div>
    </div>
  );
}