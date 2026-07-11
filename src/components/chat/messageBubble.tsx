interface MessageBubbleProps {
  message: {
    id: string;
    content: string;
    sender_profile_id: string;
    is_ai_generated: boolean;
    created_at: string;
  };

  currentProfileId: string;
}

export default function MessageBubble({
  message,
  currentProfileId,
}: MessageBubbleProps) {
  const isMine =
    message.sender_profile_id === currentProfileId;

  return (
    <div
      className={`flex ${
        isMine ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-xl rounded-2xl px-5 py-4 ${
          isMine
            ? "bg-blue-600 text-white"
            : "bg-slate-800 text-white"
        }`}
      >
        <p className="whitespace-pre-wrap leading-7">
          {message.content}
        </p>

        <div className="mt-2 flex items-center justify-between text-xs opacity-70">
          <span>
            {message.is_ai_generated ? "🤖 AI" : "You"}
          </span>

          <span>
            {new Date(message.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}