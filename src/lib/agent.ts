import { APP_URL } from "./api";
import type { ChatMessage, FeedItem } from "../types/chat";

export async function sendMessageToAgent(
  profileId: string,
  message: string
): Promise<ChatMessage> {
  const response = await fetch(`${APP_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      profileId,
      message,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to contact AI Agent");
  }

const result = await response.json();

const messages = result.messages;
const ui = result.ui;
  // --------------------------
  // Find the final assistant message
  // --------------------------

  const assistantMessage = [...messages]
    .reverse()
    .find((m: any) => m.role === "assistant");

  let assistantText = "";

  if (assistantMessage?.content) {
    const textPart = assistantMessage.content.find(
      (c: any) => c.type === "text"
    );

    if (textPart) {
      assistantText = textPart.text;
    }
  }

  // --------------------------
  // Find tool results
  // --------------------------

  let cards: FeedItem[] = [];

  let approval:
  | {
      tool: "generateIntroduction";
      status: "pending";
      payload: {
        draft: string;
        personId: string;
        personName: string;
      };
    }
  | undefined;

// --------------------------
// Extract recommendation cards
// --------------------------

if (ui && Array.isArray(ui.cards)) {
  cards = ui.cards.map((card: any): FeedItem => ({
    profileId: card.profile?.id ?? card.profileId,
    fullName: card.profile?.full_name ?? card.fullName,
    jobTitle: card.profile?.job_title ?? card.jobTitle,
    bio: card.profile?.bio ?? card.bio,
    location: card.profile?.location ?? card.location,
    photoUrl: card.profile?.photo_url ?? card.photoUrl,
    similarity: card.similarity,
    reason: card.explanation ?? card.reason,
  }));

  console.log("Mapped UI cards:", cards);
}

// --------------------------
// Fallback: extract cards directly from recommendPeople tool
// --------------------------

if (cards.length === 0) {
  const recommendTool = messages
    .flatMap((m: any) => m.content || [])
    .find(
      (c: any) =>
        c.type === "tool-result" &&
        c.toolName === "recommendPeople" &&
        c.output?.type === "json"
    );

  if (recommendTool) {
    cards = recommendTool.output.value.map((card: any): FeedItem => ({
      profileId: card.profileId,
      fullName: card.fullName,
      jobTitle: card.jobTitle,
      bio: card.bio,
      location: card.location,
      photoUrl: card.photoUrl,
      similarity: card.similarity,
      reason: card.reason,
    }));

    console.log("Mapped Tool cards:", cards);
  }
}

  const toolMessages = messages.filter((m: any) => m.role === "tool");

for (const toolMessage of toolMessages) {
  if (!toolMessage.content) continue;

  const introductionResult = toolMessage.content.find(
    (c: any) =>
      c.type === "tool-result" &&
      c.toolName === "generateIntroduction" &&
      c.output?.type === "json"
  );

  if (introductionResult) {
    approval = {
      tool: "generateIntroduction",
      status: "pending",
      payload: introductionResult.output.value,
    };
  }

if (approval) {
  assistantText =
    "I've prepared an introduction for review. Please approve, regenerate, or cancel below.";
}

}

  // --------------------------
  // Return UI message
  // --------------------------

return {
  id: crypto.randomUUID(),
  role: "assistant",
  content: assistantText,
  cards,
  approval,
  timestamp: Date.now(),
};
}