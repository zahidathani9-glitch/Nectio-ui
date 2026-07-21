// Shape of a recommended profile as returned by useProfile()'s `feed`.
// Adjust this to match your actual ProfileContexts type if it differs —
// it only needs to be structurally compatible.
export interface FeedItem {
  profileId: string;
  fullName: string;
  jobTitle?: string;
  bio?: string;
  location?: string;
  photoUrl?: string;
  reason?: string;
  similarity: number;
}

export type ChatRole = "assistant" | "user";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  /** Secondary line shown under content, e.g. "What would you like to do today?" */
  prompt?: string;
  /** Profile cards rendered inside this message */
  cards?: FeedItem[];
  /** Show the Show Recommendations / Search People / Ask Something chips */
  showActions?: boolean;
  timestamp: number;
approval?: {
  tool: "generateIntroduction";
  status: "pending";
  payload: {
    draft: string;
    personId: string;
    personName: string;
  };
};
}
