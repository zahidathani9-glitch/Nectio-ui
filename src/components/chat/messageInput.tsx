import { useState } from "react";
import { SendHorizontal } from "lucide-react";

interface MessageInputProps {
  onSend: (message: string) => Promise<void>;
}

export default function MessageInput({
  onSend,
}: MessageInputProps) {
  const [message, setMessage] = useState("");
  const hasText = message.trim().length > 0;

  const handleSend = async () => {
    const trimmed = message.trim();

    if (!trimmed) return;

    await onSend(trimmed);

    setMessage("");
  };

  return (
    <div className="border-t border-[rgba(255,255,255,0.1)] pt-4">

      <div className="flex items-end gap-3">

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Type a message..."
          rows={1}
          className="
            flex-1
            rounded-2xl
            border
            border-[rgba(255,255,255,0.12)]
            bg-[rgba(255,255,255,0.05)]
            px-5
            py-4
            text-[#F3E9DE]
            placeholder:text-[#8A7C6E]
            resize-none
            focus:outline-none
            focus:border-[rgba(255,255,255,0.3)]
          "
        />

        <button
          onClick={handleSend}
          disabled={!hasText}
          className={`
            h-14
            w-14
            rounded-full
            flex
            items-center
            justify-center
            transition
            ${
              hasText
                ? "bg-[#F3E9DE] text-[#0d0906] cursor-pointer hover:bg-white"
                : "bg-[rgba(255,255,255,0.06)] text-[#5A5145] cursor-not-allowed"
            }
          `}
        >
          <SendHorizontal size={22} />
        </button>

      </div>

    </div>
  );
}