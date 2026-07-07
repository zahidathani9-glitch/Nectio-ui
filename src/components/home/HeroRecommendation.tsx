import { Sparkles, ArrowRight, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../contexts/ProfileContexts";


export default function HeroRecommendation() {

  const { feed, feedLoading } = useProfile();
  const bestMatch = feed[0];
  const navigate = useNavigate();

  if (feedLoading) {
    return (
      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-10">
        <p className="text-slate-400">
          Finding your AI matches...
        </p>
      </section>
    );
  }

  if (!bestMatch) {
    return (
      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-10">
        <h2 className="text-3xl font-bold text-white">
          No AI Matches Yet
        </h2>

        <p className="mt-4 text-slate-400">
          As more professionals join Nectio, your AI-powered recommendations will appear here.
        </p>
      </section>
    );
  }


  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-10 shadow-xl">

      {/* Background Glow */}
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />

      <div className="relative z-10 flex items-center justify-between">

        {/* Left */}

        <div className="max-w-2xl">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2">

            <Sparkles
              size={18}
              className="text-green-400"
            />

            <span className="text-sm font-semibold text-green-400">
              AI Powered Recommendations
            </span>

          </div>

          <h1 className="font-display text-5xl font-bold leading-tight text-white">
            Meet {bestMatch.fullName}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">

            We analyzed your profile, interests and skills to
            recommend professionals who can help you grow your
            career and build meaningful relationships.

          </p>

          {/* Stats */}

          <div className="mt-10 flex gap-10">

            <div>

              <h2 className="text-4xl font-bold text-white">
                {feed.length}
              </h2>

              <p className="mt-1 text-slate-400">
                AI Matches
              </p>

            </div>

            <div>

              <h2 className="text-4xl font-bold text-white">
                {Math.round(bestMatch.similarity * 100)}%
              </h2>

              <p className="mt-1 text-slate-400">
                Best Match
              </p>

            </div>

            <div>

              <h2 className="text-4xl font-bold text-white">
                {feed.length}
              </h2>

              <p className="mt-1 text-slate-400">
                New Today
              </p>

            </div>

          </div>

          {/* Button */}

          <button
            onClick={() => navigate("/discover")}
            className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-green-500 px-7 py-4 text-lg font-semibold text-white transition hover:scale-105"
          >
            <Users size={20} />

            View AI Matches

            <ArrowRight size={18} />

          </button>

        </div>

        {/* Right */}

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 backdrop-blur">

          <div className="mb-6 flex items-center gap-4">

            <img
              src={
                bestMatch.photoUrl ||
                "https://placehold.co/80x80?text=User"
              }
              alt={bestMatch.fullName}
              className="h-16 w-16 rounded-full object-cover border border-slate-700"
            />

            <div>

              <h4 className="text-lg font-semibold text-white">
                {bestMatch.fullName}
              </h4>

              <p className="text-slate-400">
                {bestMatch.jobTitle}
              </p>

              <span className="mt-2 inline-flex rounded-full bg-green-500/20 px-3 py-1 text-sm font-semibold text-green-400">
                {Math.round(bestMatch.similarity * 100)}% Match
              </span>

            </div>

          </div>

          <h3 className="text-xl font-semibold text-white">
            Why AI Recommended This Person
          </h3>

          <p className="mt-5 max-w-xs leading-8 text-slate-400">
            {bestMatch.reason}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">

            <span className="rounded-full bg-slate-800 px-4 py-2 text-sm text-white">
              {bestMatch.jobTitle}
            </span>

            <span className="rounded-full bg-slate-800 px-4 py-2 text-sm text-white">
              {bestMatch.location}
            </span>

          </div>

        </div>

      </div>

    </section>
  );
}