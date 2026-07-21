import { APP_URL } from "../lib/api"
export async function startConversation(
  currentProfileId: string,
  matchedProfileId: string,
  source: "manual" | "agent" = "manual"
) {
  const response = await fetch(`${APP_URL}/api/chat/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      currentProfileId,
      matchedProfileId,
      source,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to start conversation");
  }

  return await response.json();
}


export async function sendConversationMessage(
  conversationId: string,
  senderProfileId: string,
  message: string,
  isAiGenerated = true
) {
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
}


export async function regenerateConversation(
  conversationId: string
) {
  const response = await fetch(`${APP_URL}/api/chat/regenerate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      conversationId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to regenerate");
  }

  return await response.json();
}


export async function getConversation(
  conversationId: string
) {
  const response = await fetch(
    `${APP_URL}/api/chat/${conversationId}`
  );

  if (!response.ok) {
    throw new Error("Failed to load conversation");
  }

  return await response.json();
}

export async function regenerateAgentIntroduction(
  currentProfileId: string,
  personId: string
) {
  const response = await fetch(
    `${APP_URL}/api/chat/regenerate-agent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentProfileId,
        personId,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to regenerate introduction");
  }

  return response.json();
}