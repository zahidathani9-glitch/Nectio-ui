import {
  Flame,
  Heart,
  PartyPopper,
  Sparkles,
  ThumbsUp,
} from "lucide-react";import ProfileMatchCard from "./profileMatchedCard";
import type { ChatMessage, FeedItem } from "../../types/chat";

interface ChatMessageBubbleProps {
  message: ChatMessage;
  onActionClick: (text: string) => void;
  onStartConversation: (item: FeedItem) => void;
  onApprove: (message: ChatMessage) => void;
  onRegenerate: (message: ChatMessage) => void;
  onCancel: (message: ChatMessage) => void;
}

const ACTIONS = ["Show Recommendations", "Search People", "Ask Something"];

const REACTIONS = [
  { icon: ThumbsUp, label: "Helpful" },
  { icon: Heart, label: "Love it" },
  { icon: PartyPopper, label: "Nice" },
  { icon: Flame, label: "Great match" },
];

export default function ChatMessageBubble({
  message,
  onActionClick,
  onStartConversation,
  onApprove,
  onRegenerate,
  onCancel,
}: ChatMessageBubbleProps) {
  const isUser = message.role === "user";
  const hasCards = !!message.cards?.length;
  const hasApproval = !isUser && message.approval?.status === "pending";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className="flex w-full max-w-[85%] flex-col gap-3 sm:max-w-[75%]">
        {!hasCards && (
  <div
    className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
      isUser
        ? "ml-auto bg-[#F3E9DE] text-[#0d0906]"
        : "border border-[rgba(255,255,255,0.08)] bg-[rgba(28,22,18,0.6)] text-[#F3E9DE]"
    }`}
  >
    <p className="whitespace-pre-line">{message.content}</p>

    {message.prompt && (
      <p className="mt-1.5 whitespace-pre-line text-[#B8AA9C]">
        {message.prompt}
      </p>
    )}
  </div>
)}

       {hasCards && (
  <div className="space-y-4">
    {/* AI Recommendation Header */}
    <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(28,22,18,0.6)] p-4">
      <div className="flex items-center gap-2">
        <Sparkles size={16} className="text-amber-300" />
        <h3 className="font-semibold text-[#F3E9DE]">
          AI Recommendations
        </h3>
      </div>

      <p className="mt-2 text-sm text-[#B8AA9C]">
        I found {message.cards?.length} professionals that match your goals.
      </p>
    </div>

    {/* Recommendation Cards */}
    <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
      {message.cards!.map((item, index) => (
        <ProfileMatchCard
          key={`${item.fullName}-${index}`}
          item={item}
          onMessage={() => onStartConversation(item)}
        />
      ))}
    </div>
  </div>
)}

        {hasCards && (
          <div className="flex flex-wrap items-center gap-1.5">
            {REACTIONS.map(({ icon: Icon, label }) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                className="rounded-full border border-[rgba(255,255,255,0.1)] p-2 text-[#B8AA9C] transition hover:border-[rgba(255,255,255,0.3)] hover:text-[#F3E9DE]"
              >
                <Icon size={13} />
              </button>
            ))}
            <button
              type="button"
              onClick={() => onActionClick("Tell me more")}
              className="rounded-full border border-[rgba(255,255,255,0.1)] px-3 py-1.5 text-xs text-[#B8AA9C] transition hover:border-[rgba(255,255,255,0.3)] hover:text-[#F3E9DE]"
            >
              Tell me more
            </button>
          </div>
        )}

        {message.showActions && (
          <div className="flex flex-wrap gap-2">
            {ACTIONS.map((action) => (
              <button
                key={action}
                type="button"
                onClick={() => onActionClick(action)}
                className="rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] px-3.5 py-1.5 text-xs font-medium text-[#F3E9DE] transition hover:border-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.08)]"
              >
                {action}
              </button>
            ))}
          </div>
        )}

        {hasApproval && (
          <div className="flex flex-col gap-2.5 rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(28,22,18,0.6)] px-4 py-3">
<div className="space-y-3">
  <p className="text-xs text-[#B8AA9C]">
    Review this introduction before sending.
  </p>

  <div className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-3 whitespace-pre-wrap text-sm text-[#F3E9DE]">
    {message.approval?.payload.draft}
  </div>
</div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onApprove(message)}
                className="rounded-full border border-[rgba(255,255,255,0.12)] bg-[#F3E9DE] px-3.5 py-1.5 text-xs font-medium text-[#0d0906] transition hover:bg-[#e8dcc9]"
              >
                Approve
              </button>
              <button
                type="button"
                onClick={() => onRegenerate(message)}
                className="rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] px-3.5 py-1.5 text-xs font-medium text-[#F3E9DE] transition hover:border-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.08)]"
              >
                Regenerate
              </button>
              <button
                type="button"
                onClick={() => onCancel(message)}
                className="rounded-full border border-[rgba(255,255,255,0.1)] px-3.5 py-1.5 text-xs font-medium text-[#B8AA9C] transition hover:border-[rgba(255,255,255,0.3)] hover:text-[#F3E9DE]"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}