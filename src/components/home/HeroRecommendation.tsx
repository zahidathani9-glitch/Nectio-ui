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
      <section className="rounded-3xl border border-[rgba(255,255,255,0.1)] bg-[rgba(20,14,9,0.6)] backdrop-blur-md p-6 sm:p-10">
        <p className="text-[#B8AA9C]">Finding your AI matches...</p>
      </section>
    );
  }

  if (!currentMatch) {
    return (
      <section className="rounded-3xl border border-[rgba(255,255,255,0.1)] bg-[rgba(20,14,9,0.6)] backdrop-blur-md p-6 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#F3E9DE]">No AI Matches Yet</h2>
        <p className="mt-4 text-[#B8AA9C]">
          As more professionals join Nectio, your AI-powered recommendations will appear here.
        </p>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-3xl border border-[rgba(255,255,255,0.1)] bg-[rgba(20,14,9,0.6)] backdrop-blur-md p-5 sm:p-8 lg:p-10 shadow-xl">
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[rgba(255,255,255,0.04)] blur-3xl" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        {/* Left */}
        <div className="max-w-2xl">
          <div className="mb-5 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.06)] px-4 py-2">
            <Sparkles size={18} className="text-[#F3E9DE]" />
            <span className="text-sm font-semibold text-[#F3E9DE]">
              AI Powered Recommendations
            </span>
          </div>

          <h1 className="min-h-[40px] sm:min-h-[64px] font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#F3E9DE]">
            Meet {currentMatch.fullName}
          </h1>

          <p className="mt-3 text-[#F3E9DE]/70 font-medium">
            Recommendation {currentIndex + 1} of {feed.length}
          </p>

          <p className="mt-5 sm:mt-6 max-w-xl text-base sm:text-lg leading-7 sm:leading-8 text-[#B8AA9C]">
            We analyzed your profile, interests and skills to
            recommend professionals who can help you grow your
            career and build meaningful relationships.
          </p>

          {/* Stats */}
          <div className="mt-8 sm:mt-10 flex gap-6 sm:gap-10">
            <div>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#F3E9DE]">{feed.length}</h2>
              <p className="mt-1 text-sm sm:text-base text-[#8A7C6E]">AI Matches</p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#F3E9DE]">
                {Math.round(currentMatch.similarity * 100)}%
              </h2>
              <p className="mt-1 text-sm sm:text-base text-[#8A7C6E]">Match Score</p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#F3E9DE]">{feed.length}</h2>
              <p className="mt-1 text-sm sm:text-base text-[#8A7C6E]">New Today</p>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={() => navigate("/discover")}
            className="mt-8 sm:mt-10 inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-2xl bg-[#F3E9DE] px-6 sm:px-7 py-3.5 sm:py-4 text-base sm:text-lg font-semibold text-[#0d0906] transition hover:scale-105"
          >
            <Users size={20} />
            View AI Matches
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Right */}
        <div className="w-full lg:w-auto lg:max-w-xs rounded-3xl border border-[rgba(255,255,255,0.1)] bg-[rgba(28,22,18,0.6)] p-6 sm:p-8 backdrop-blur">
          <div className="mb-6 flex items-center gap-4">
            <img
              src={currentMatch.photoUrl || "https://placehold.co/80x80?text=User"}
              alt={currentMatch.fullName}
              className="h-14 w-14 sm:h-16 sm:w-16 rounded-full object-cover border border-[rgba(255,255,255,0.15)]"
            />

            <div>
              <h4 className="text-lg font-semibold text-[#F3E9DE]">
                {currentMatch.fullName}
              </h4>
              <p className="text-[#B8AA9C]">{currentMatch.jobTitle}</p>
              <span className="mt-2 inline-flex rounded-full bg-[rgba(255,255,255,0.1)] px-3 py-1 text-sm font-semibold text-[#F3E9DE]">
                {Math.round(currentMatch.similarity * 100)}% Match
              </span>
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-semibold text-[#F3E9DE]">
            Why AI Recommended This Person
          </h3>

          <p className="mt-4 sm:mt-5 leading-7 sm:leading-8 text-[#B8AA9C]">
            {currentMatch.reason}
          </p>

          <div className="mt-8 flex items-center justify-between">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((i) => i - 1)}
              className="rounded-full border border-[rgba(255,255,255,0.15)] p-3 text-[#F3E9DE] transition hover:border-[#F3E9DE] disabled:opacity-30"
            >
              <ArrowLeft size={18} />
            </button>

            <span className="text-[#B8AA9C]">
              {currentIndex + 1} / {feed.length}
            </span>

            <button
              disabled={currentIndex === feed.length - 1}
              onClick={() => setCurrentIndex((i) => i + 1)}
              className="rounded-full border border-[rgba(255,255,255,0.15)] p-3 text-[#F3E9DE] transition hover:border-[#F3E9DE] disabled:opacity-30"
            >
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            <span className="rounded-full bg-[rgba(255,255,255,0.06)] px-4 py-2 text-sm text-[#F3E9DE]">
              {currentMatch.jobTitle}
            </span>
            <span className="rounded-full bg-[rgba(255,255,255,0.06)] px-4 py-2 text-sm text-[#F3E9DE]">
              {currentMatch.location}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}