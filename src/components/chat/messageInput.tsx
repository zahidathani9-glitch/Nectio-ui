import { useState } from "react";
import { SendHorizontal } from "lucide-react";

interface MessageInputProps {
  onSend: (message: string) => Promise<void>;
}

export default function MessageInput({
  onSend,
}: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    const trimmed = message.trim();

    if (!trimmed) return;

    await onSend(trimmed);

    setMessage("");
  };

  return (
  <div className="mt-6 border-t border-slate-800 pt-6">

    <div className="flex items-end gap-3">

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        rows={1}
        className="
          flex-1
          rounded-2xl
          border
          border-slate-700
          bg-slate-900
          px-5
          py-4
          text-white
          resize-none
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />

      <button
        onClick={handleSend}
        className="
          h-14
          w-14
          rounded-full
          bg-blue-600
          hover:bg-blue-700
          transition
          flex
          items-center
          justify-center
        "
      >
        <SendHorizontal size={22} />
      </button>

    </div>

  </div>
);
}