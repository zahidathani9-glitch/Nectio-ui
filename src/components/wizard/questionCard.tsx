import { type ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function QuestionCard({
  title,
  subtitle,
  children,
}: Props) {

  return (
    <div
  className="
      min-h-[520px]
      rounded-3xl
      border
      border-white/10
      bg-slate-900/70
      backdrop-blur-xl
      p-10
      shadow-[0_25px_80px_rgba(0,0,0,0.45)]
      flex
      flex-col
      justify-center
      transition-all
      duration-300
"
>

      <h1 className="text-4xl font-bold mb-2">

        {title}

      </h1>

      {subtitle && (

        <p className="text-slate-400 mb-8">

          {subtitle}

        </p>

      )}

      {children}

    </div>
  );
}