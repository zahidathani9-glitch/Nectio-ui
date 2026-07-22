import {
  Flame,
  Heart,
  PartyPopper,
  Sparkles,
  ThumbsUp,
} from "lucide-react";
import ProfileMatchCard from "./profileMatchedCard";
import type { ChatMessage, FeedItem } from "../../types/chat";
import { motion } from "framer-motion";

interface ChatMessageBubbleProps {
  message: ChatMessage;
  onActionClick: (text: string) => void;
  onStartConversation: (item: FeedItem) => void;
  onApprove: (message: ChatMessage) => void;
  onRegenerate: (message: ChatMessage) => void;
  onCancel: (message: ChatMessage) => void;
  onViewProfile: (item: FeedItem) => void;
}

const ACTIONS = ["Show Recommendations"];

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
  onViewProfile,
}: ChatMessageBubbleProps) {
  const isUser = message.role === "user";
  const hasCards = !!message.cards?.length;
  const hasApproval = !isUser && message.approval?.status === "pending";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`flex w-full max-w-[85%] flex-col gap-3.5 ${isUser ? "items-end" : "items-start"}`}>
        {!hasCards && (
          message.id === "greeting" ? (
            <div className="rounded-2xl border border-white/5 bg-white/[0.025] text-[#F3E9DE] rounded-tl-none px-5 py-4 text-[14px] leading-relaxed shadow-sm tracking-wide max-w-md w-full space-y-4">
              {/* Greeting */}
              <div>
                <p className="text-base font-bold text-[#F3E9DE] whitespace-pre-line leading-snug">
                  {message.content.split("\n")[0]}
                </p>
                <p className="text-xs text-[#B8AA9C] mt-1.5 leading-relaxed">
                  {message.content.split("\n").slice(1).join(" ").trim()}
                </p>
              </div>

              {/* How it works */}
              <div className="space-y-1">
                <h4 className="text-[10px] font-semibold text-[#F3E9DE] uppercase tracking-widest">How it works</h4>
                <p className="text-xs text-[#B8AA9C]">Ask &rarr; Discover &rarr; Connect</p>
              </div>

              {/* Try */}
              <div className="space-y-1">
                <h4 className="text-[10px] font-semibold text-[#F3E9DE] uppercase tracking-widest">Try</h4>
                <ul className="text-xs text-[#B8AA9C] space-y-0.5 leading-relaxed">
                  <li>&bull;&nbsp;Show me recommendations</li>
                  <li>&bull;&nbsp;Find React developers</li>
                  <li>&bull;&nbsp;Startup founders</li>
                  <li>&bull;&nbsp;People in Bangalore</li>
                </ul>
              </div>

              {/* I can help you */}
              <div className="space-y-1">
                <h4 className="text-[10px] font-semibold text-[#F3E9DE] uppercase tracking-widest">I can help you</h4>
                <ul className="text-xs text-[#B8AA9C] space-y-0.5 leading-relaxed">
                  <li>&bull;&nbsp;Find the right people</li>
                  <li>&bull;&nbsp;Recommend great matches</li>
                  <li>&bull;&nbsp;Explain recommendations</li>
                  <li>&bull;&nbsp;Start conversations</li>
                </ul>
              </div>
            </div>
          ) : (
            <div
              className={`rounded-2xl px-5 py-3.5 text-[14px] leading-relaxed shadow-sm tracking-wide ${
                isUser
                  ? "bg-[#F3E9DE] text-[#0d0906] rounded-tr-none"
                  : "border border-white/5 bg-white/[0.025] text-[#F3E9DE] rounded-tl-none"
              }`}
            >
              <p className="whitespace-pre-line leading-relaxed">{message.content}</p>

              {message.prompt && (
                <p className="mt-2 text-xs font-semibold text-[#B8AA9C] border-t border-white/5 pt-2">
                  {message.prompt}
                </p>
              )}
            </div>
          )
        )}

        {hasCards && (
          <div className="w-full space-y-4">
            {/* AI Recommendation Header */}
            <div className="rounded-2xl border border-[#E8934A]/25 bg-gradient-to-r from-[#E8934A]/10 to-transparent p-4 flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#E8934A]/15 text-[#E8934A]">
                <Sparkles size={16} />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-[#F3E9DE]">
                  AI Recommendations
                </h3>
                <p className="text-xs text-[#B8AA9C] mt-0.5">
                  I found {message.cards?.length} professionals that match your goals.
                </p>
              </div>
            </div>

            {/* Recommendation Cards Grid */}
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
              {message.cards!.map((item, index) => (
                <ProfileMatchCard
                  key={`${item.profileId || item.fullName}-${index}`}
                  item={item}
                  onMessage={() => onStartConversation(item)}
                  onViewProfile={onViewProfile}
                />
              ))}
            </div>
          </div>
        )}

        {hasCards && (
          <div className="flex flex-wrap items-center gap-1.5 pl-1">
            {REACTIONS.map(({ icon: Icon, label }) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                className="rounded-full border border-white/10 p-2 text-[#B8AA9C] hover:border-white/30 hover:bg-white/5 hover:text-[#F3E9DE] transition-all"
              >
                <Icon size={12} />
              </button>
            ))}
            <button
              type="button"
              onClick={() => onActionClick("Tell me more")}
              className="rounded-full border border-white/10 px-3.5 py-1.5 text-xs text-[#B8AA9C] hover:border-white/30 hover:bg-white/5 hover:text-[#F3E9DE] transition-all font-medium"
            >
              Tell me more
            </button>
          </div>
        )}

        {message.showActions && (
          <div className="flex flex-wrap gap-2 pl-1">
            {ACTIONS.map((action) => (
              <button
                key={action}
                type="button"
                onClick={() => onActionClick(action)}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-semibold text-[#F3E9DE] hover:border-white/20 hover:bg-white/[0.06] transition-all active:scale-[0.98]"
              >
                {action}
              </button>
            ))}
          </div>
        )}

        {hasApproval && (
          <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 w-full">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-[#B8AA9C]">
                Review this introduction before sending:
              </p>
              <div className="rounded-xl border border-white/5 bg-white/[0.01] p-3.5 whitespace-pre-wrap text-sm text-[#F3E9DE] leading-relaxed">
                {message.approval?.payload.draft}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onApprove(message)}
                className="rounded-xl bg-[#F3E9DE] px-4 py-2 text-xs font-semibold text-[#0d0906] hover:bg-white transition-all active:scale-95 shadow-sm"
              >
                Approve
              </button>
              <button
                type="button"
                onClick={() => onRegenerate(message)}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-[#F3E9DE] hover:border-white/20 hover:bg-white/[0.08] transition-all active:scale-95"
              >
                Regenerate
              </button>
              <button
                type="button"
                onClick={() => onCancel(message)}
                className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-[#B8AA9C] hover:border-white/20 hover:text-[#F3E9DE] transition-all active:scale-95"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}