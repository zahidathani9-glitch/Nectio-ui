import { useState } from "react";
import { useSearch } from "../hooks/useSearch";
import { useProfile } from "../contexts/ProfileContexts";
import { useNavigate } from "react-router-dom";
import { useChat } from "../hooks/useChat";

export default function DiscoverPage() {
  const { profile } = useProfile();
  const navigate = useNavigate();

  const {
    startConversation,
    loading: chatLoading,
  } = useChat();
  const [search, setSearch] = useState("");
  const {
    search: searchProfiles,
    results,
    loading,
  } = useSearch(profile?.id);


  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Agent is finding the best people for you... <span className="animate-spin">🌀</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-4xl font-bold mb-8">
        Discover People
      </h1>
      <div className="flex gap-3 mb-8">
        <input
          type="text"
          placeholder="Looking for AI founders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
        />

        <button
          onClick={() => searchProfiles(search)}
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {results.map((result: any) => {
          const matchedProfile = result.profile;

          return (
            <div
              key={matchedProfile.id}
              className="w-80 mx-auto rounded-2xl bg-slate-900 border border-slate-700 shadow-lg p-6"
            >
              <h2 className="text-xl font-bold">
                {matchedProfile.full_name}
              </h2>

              <p>{matchedProfile.job_title}</p>

              <p className="mt-2">📍 {matchedProfile.location}</p>

              <p className="mt-2">🎯 {matchedProfile.networking_goal}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {matchedProfile.skills.map((skill: any) => (
                  <span
                    key={skill.id}
                    className="bg-slate-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>

              <div className="mt-4 rounded-lg bg-slate-800 p-3">
                <p className="text-sm text-slate-300">
                  {result.explanation}
                </p>
              </div>

              <div className="mt-6">
                <button
                  onClick={async () => {
                    if (!profile?.id) return;

                    try {
                      const response = await startConversation(
                        profile.id,
                        result.profile.id
                      );

                      navigate(`/message/${response.conversation.id}`, {
                        state: {
                          conversation: response.conversation,
                          firstMessage: response.firstMessage,
                          fullName: result.profile.full_name,
                        },
                      });
                    } catch (error) {
                      console.error(error);
                      alert("Failed to start conversation");
                    }
                  }}
                  className="w-full rounded-xl bg-blue-600 py-3 font-semibold hover:bg-blue-700 transition"
                >
                  {chatLoading ? "Loading..." : "Message"}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
