import { Sparkles, ArrowRight, Users, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../contexts/ProfileContexts";
import { useState } from "react";

export default function HeroRecommendation() {
  const { feed, feedLoading } = useProfile();
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentMatch = feed[currentIndex];
  const navigate = useNavigate();

  if (feedLoading) {
    return (
      <section className="rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(20,14,9,0.6)] backdrop-blur-md p-6">
        <p className="text-[#B8AA9C]">Finding your AI matches...</p>
      </section>
    );
  }

  if (!currentMatch) {
    return (
      <section className="rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(20,14,9,0.6)] backdrop-blur-md p-6">
        <h2 className="text-xl font-bold text-[#F3E9DE]">No AI Matches Yet</h2>
        <p className="mt-3 text-sm text-[#B8AA9C]">
          As more professionals join Nectio, your AI-powered recommendations will appear here.
        </p>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(20,14,9,0.6)] backdrop-blur-md p-5 sm:p-6 lg:p-7">
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left */}
        <div className="max-w-xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.06)] px-3 py-1.5">
            <Sparkles size={14} className="text-[#F3E9DE]" />
            <span className="text-xs font-semibold text-[#F3E9DE]">
              AI Powered Recommendations
            </span>
          </div>

          <h1 className="min-h-[36px] font-display text-2xl sm:text-3xl font-bold leading-tight text-[#F3E9DE]">
            Meet {currentMatch.fullName}
          </h1>

          <p className="mt-2 text-sm text-[#F3E9DE]/70 font-medium">
            Recommendation {currentIndex + 1} of {feed.length}
          </p>

          <p className="mt-4 max-w-lg text-sm leading-6 text-[#B8AA9C]">
            We analyzed your profile, interests and skills to
            recommend professionals who can help you grow your
            career and build meaningful relationships.
          </p>

          {/* Stats */}
          <div className="mt-6 flex gap-6">
            <div>
              <h2 className="text-2xl font-bold text-[#F3E9DE]">{feed.length}</h2>
              <p className="mt-0.5 text-xs text-[#8A7C6E]">AI Matches</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#F3E9DE]">
                {Math.round(currentMatch.similarity * 100)}%
              </h2>
              <p className="mt-0.5 text-xs text-[#8A7C6E]">Match Score</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#F3E9DE]">{feed.length}</h2>
              <p className="mt-0.5 text-xs text-[#8A7C6E]">New Today</p>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={() => navigate("/discover")}
            className="mt-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#F3E9DE] px-5 py-2.5 text-sm font-semibold text-[#0d0906] transition hover:scale-105"
          >
            <Users size={16} />
            View AI Matches
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Right */}
        <div className="w-full lg:w-auto lg:max-w-xs rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(28,22,18,0.5)] p-5">
          <div className="mb-4 flex items-center gap-3">
            <img
              src={currentMatch.photoUrl || "https://placehold.co/56x56?text=User"}
              alt={currentMatch.fullName}
              className="h-12 w-12 rounded-full object-cover border border-[rgba(255,255,255,0.15)]"
            />

            <div>
              <h4 className="text-sm font-semibold text-[#F3E9DE]">
                {currentMatch.fullName}
              </h4>
              <p className="text-xs text-[#B8AA9C]">{currentMatch.jobTitle}</p>
              <span className="mt-1 inline-flex rounded-full bg-[rgba(255,255,255,0.1)] px-2.5 py-0.5 text-[11px] font-semibold text-[#F3E9DE]">
                {Math.round(currentMatch.similarity * 100)}% Match
              </span>
            </div>
          </div>

          <h3 className="text-sm font-semibold text-[#F3E9DE]">
            Why AI Recommended This Person
          </h3>

          <p className="mt-2 text-xs leading-5 text-[#B8AA9C]">
            {currentMatch.reason}
          </p>

          <div className="mt-5 flex items-center justify-between">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((i) => i - 1)}
              className="rounded-full border border-[rgba(255,255,255,0.15)] p-2 text-[#F3E9DE] transition hover:border-[#F3E9DE] disabled:opacity-30"
            >
              <ArrowLeft size={15} />
            </button>

            <span className="text-xs text-[#B8AA9C]">
              {currentIndex + 1} / {feed.length}
            </span>

            <button
              disabled={currentIndex === feed.length - 1}
              onClick={() => setCurrentIndex((i) => i + 1)}
              className="rounded-full border border-[rgba(255,255,255,0.15)] p-2 text-[#F3E9DE] transition hover:border-[#F3E9DE] disabled:opacity-30"
            >
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="mt-5 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-[rgba(255,255,255,0.06)] px-3 py-1 text-xs text-[#F3E9DE]">
              {currentMatch.jobTitle}
            </span>
            <span className="rounded-full bg-[rgba(255,255,255,0.06)] px-3 py-1 text-xs text-[#F3E9DE]">
              {currentMatch.location}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}