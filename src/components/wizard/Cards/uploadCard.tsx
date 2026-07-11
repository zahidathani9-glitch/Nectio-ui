import QuestionCard from "../questionCard";
import type { NavProps } from "../types";
import type { ChangeEvent } from "react";

interface Props {
  uploading: boolean;
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  /** Injected by Wizard — not passed by ProfilePage. */
  nav?: NavProps;
}

export default function UploadCard({ uploading, onUpload, nav }: Props) {
  return (
    <QuestionCard
      title="Upload your profile photo"
      subtitle="This helps people recognize you."
      nav={nav}
    >
      <input
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={onUpload}
        className="
          w-full
          rounded-2xl
          border
          border-white/10
          bg-white/[0.04]
          p-5
          text-sm
          text-white/60
          transition-all
          duration-200
          hover:border-white/20
          file:mr-4
          file:rounded-xl
          file:border-0
          file:bg-[#E8934A]
          file:px-4
          file:py-2.5
          file:text-sm
          file:font-medium
          file:text-white
          file:transition-all
          file:duration-200
          hover:file:brightness-110
        "
      />

      {uploading && (
        <p className="mt-4 text-sm text-white/50">Uploading...</p>
      )}
    </QuestionCard>
  );
}
