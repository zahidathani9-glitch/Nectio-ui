import { ArrowUp } from "lucide-react";
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
      className="flex items-end gap-2 rounded-2xl border border-white/10 bg-white/[0.02] shadow-xl shadow-black/30 p-2 md:p-2.5 transition-all duration-200 focus-within:border-[#E8934A]/40 focus-within:bg-white/[0.04]"
    >
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        placeholder="Ask me anything or find people..."
        className="max-h-32 flex-1 resize-none bg-transparent px-2.5 py-2 text-sm text-[#F3E9DE] placeholder:text-[#8A7C6E] focus:outline-none"
      />

      <button
        type="submit"
        disabled={!value.trim()}
        aria-label="Send message"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F3E9DE] text-[#0d0906] transition-all hover:scale-105 active:scale-95 disabled:opacity-20 disabled:hover:scale-100 disabled:hover:bg-[#F3E9DE] disabled:cursor-not-allowed"
      >
        <ArrowUp size={16} />
      </button>
    </form>
  );
}
