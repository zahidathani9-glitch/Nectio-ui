import { ArrowUp, Globe, Mic, Paperclip } from "lucide-react";
import { useState, type FormEvent, type KeyboardEvent } from "react";

interface ChatInputProps {
  onSend: (text: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [value, setValue] = useState("");

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-1.5 rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(28,22,18,0.5)] px-3 py-2.5 transition focus-within:border-[rgba(255,255,255,0.25)]"
    >
      <button
        type="button"
        aria-label="Attach a file"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#8A7C6E] transition hover:text-[#F3E9DE]"
      >
        <Paperclip size={16} />
      </button>

      <button
        type="button"
        aria-label="Search the web"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#8A7C6E] transition hover:text-[#F3E9DE]"
      >
        <Globe size={16} />
      </button>

      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        placeholder="Ask me anything or find people..."
        className="max-h-32 flex-1 resize-none bg-transparent py-1.5 text-sm text-[#F3E9DE] placeholder:text-[#8A7C6E] focus:outline-none"
      />

      <button
        type="button"
        aria-label="Voice input — coming soon"
        disabled
        className="flex h-8 w-8 shrink-0 cursor-not-allowed items-center justify-center rounded-full text-[#8A7C6E]/50"
      >
        <Mic size={16} />
      </button>

      <button
        type="submit"
        disabled={!value.trim()}
        aria-label="Send message"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F3E9DE] text-[#0d0906] transition hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
      >
        <ArrowUp size={16} />
      </button>
    </form>
  );
}
