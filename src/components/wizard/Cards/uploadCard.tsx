import QuestionCard from "../questionCard";
import type { ChangeEvent } from "react";

interface Props {
  uploading: boolean;
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadCard({
  uploading,
  onUpload,
}: Props) {
  return (
    <QuestionCard
      title="Upload your profile photo"
      subtitle="This helps people recognize you."
    >
      <input
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={onUpload}
        className="
        w-full
        rounded-2xl
        bg-slate-800
        border
        border-slate-700
        p-5
        "
      />

      {uploading && (
        <p className="mt-4 text-slate-400">
          Uploading...
        </p>
      )}
    </QuestionCard>
  );
}