import type { ChatMessage, } from "../types/chat";

export function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function buildGreeting(firstName: string): ChatMessage {
  return {
    id: "greeting",
    role: "assistant",
    content: `Hi ${firstName}! 👋\nI'm your AI networking assistant. I can help you discover and connect with the right people.`,
    prompt: "What would you like to do today?",
    showActions: true,
    timestamp: Date.now(),
  };
}

export function buildUserMessage(text: string): ChatMessage {
  return {
    id: createId(),
    role: "user",
    content: text,
    timestamp: Date.now(),
  };
}




/**
 * Routes a free-text query to a canned response built from the existing
 * feed data. Swap this out for a real endpoint call whenever the AI
 * chat backend is ready — the rest of the UI only depends on ChatMessage.
 */

