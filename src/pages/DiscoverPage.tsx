import { useState } from "react";
import { useSearch } from "../hooks/useSearch";
import { useProfile } from "../contexts/ProfileContexts";

export default function DiscoverPage() {
 const { profile } = useProfile();
const [search, setSearch] = useState("");
const {
    search: searchProfiles,
    results,
    loading,
} = useSearch(profile?.id);


if (loading) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      Loading profiles...
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
  const profile = result.profile;

  return (
    <div
      key={profile.id}
      className="w-80 mx-auto rounded-2xl bg-slate-900 border border-slate-700 shadow-lg p-6"
    >
      <h2 className="text-xl font-bold">
        {profile.full_name}
      </h2>

      <p>{profile.job_title}</p>

      <p className="mt-2">📍 {profile.location}</p>

      <p className="mt-2">🎯 {profile.networking_goal}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {profile.skills.map((skill: any) => (
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
    </div>
  );
})}
    </div>

  </div>
);
}
