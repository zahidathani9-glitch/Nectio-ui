import { useEffect, useState } from "react";
import { useChat } from "../../hooks/useChat";
interface SuggestedMessageProps {
  firstMessage: string;
  conversationId: string;
  onSend: (message: string) => Promise<void>;
}

export default function SuggestedMessage({
  firstMessage,
  conversationId,
  onSend
}: SuggestedMessageProps) {
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState(firstMessage);
  const { regenerateMessage } = useChat();
  
  useEffect(() => {
  setMessage(firstMessage);
}, [firstMessage]);

const handleRegenerate = async () => {
  try {
    const data = await regenerateMessage(conversationId);

    setMessage(data.draftMessage);

  } catch (error) {
    console.error(error);
    alert("Failed to regenerate message.");
  }
};

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="text-xl font-semibold mb-6">
        🤖 AI Suggested Message
      </h2>

      {!editing ? (
        <p className="text-slate-200 leading-8 whitespace-pre-wrap">
          {message}
        </p>
      ) : (
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-40 rounded-xl bg-slate-800 border border-slate-700 p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}

      <div className="flex gap-4 mt-8">

        <button
          onClick={() => setEditing(!editing)}
          className="flex-1 rounded-xl bg-slate-800 py-3 font-semibold hover:bg-slate-700 transition"
        >
          {editing ? "Done" : "Edit"}
        </button>

       <button
  onClick={handleRegenerate}
  className="flex-1 rounded-xl bg-slate-800 py-3 font-semibold hover:bg-slate-700 transition"
>
  Regenerate
</button>

        <button
          onClick={() => onSend(message)}
          className="flex-1 rounded-xl bg-blue-600 py-3 font-semibold hover:bg-blue-700 transition"
        >
          Send
        </button>

      </div>

    </div>
  )
}