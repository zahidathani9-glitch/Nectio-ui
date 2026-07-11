import { useState } from "react";
import { APP_URL } from "../lib/api";

export function useChat() {
  const [loading, setLoading] = useState(false);

  async function startConversation(
    currentProfileId: string,
    matchedProfileId: string
  ) {
    setLoading(true);

    try {
      const response = await fetch(`${APP_URL}/api/chat/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentProfileId,
          matchedProfileId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to start conversation");
      }

      return await response.json();
    } finally {
      setLoading(false);
    }
  }


const sendMessage = async (
  conversationId: string,
  senderProfileId: string,
  message: string,
  isAiGenerated: boolean
) => {
  const response = await fetch(`${APP_URL}/api/chat/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      conversationId,
      senderProfileId,
      message,
      isAiGenerated,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  return await response.json();
};


const regenerateMessage = async (
  conversationId: string
) => {
  const response = await fetch(
    `${APP_URL}/api/chat/regenerate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversationId,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to regenerate introduction");
  }

  return await response.json();
};

return {
  startConversation,
  sendMessage,
  regenerateMessage,
  loading,
}

}

