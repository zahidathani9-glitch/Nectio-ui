import AppLayout from "../components/layout/appLayout";
import ConversationList from "../components/chat/conversationList";
import { useConversations } from "../hooks/useConversations";
import { useProfile } from "../contexts/ProfileContexts";

export default function MessagesPage() {
  const { profile } = useProfile();

  const {
    conversations,
    loading,
    error,
  } = useConversations(profile?.id);

  return (
    <AppLayout>
      <ConversationList
        conversations={conversations}
        loading={loading}
        error={error}
      />
    </AppLayout>
  );
}