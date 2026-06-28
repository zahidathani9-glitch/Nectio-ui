import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContexts";

export default function DiscoverPage() {

  const { user } = useAuth();


const [profiles, setProfiles] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
const [search, setSearch] = useState("");

const fetchProfiles = async () => {
  const { data, error } = await supabase
    .from("profiles")
    .select(`
      *,
      profile_skills (
        skills (
          name
        )
      )
    `).neq("user_id", user?.id);;

  if (error) {
    console.log(error);
    return;
  }

  setProfiles(data);
  setLoading(false);
};

useEffect(() => {
  if(user) {
  fetchProfiles();
 }
}, [user]);



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
    <input
  type="text"
  placeholder="Search by name..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 mb-8"
/>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

     {profiles
  .filter((profile) =>
    profile.full_name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((profile) => (
<div
  key={profile.id}
  className="w-80 mx-auto rounded-2xl bg-slate-900 border border-slate-700 shadow-lg p-6 flex flex-col items-center"
>

  {profile.profile_visibility !== "anonymous" &&
 profile.photo_url && (
  <img
    src={profile.photo_url}
    alt={profile.full_name}
    className="w-24 h-24 rounded-full object-cover border-4 border-slate-800 mb-4"
  />
)}

<h2 className="text-xl font-bold">
  {profile.profile_visibility === "anonymous"
    ? "Anonymous User"
    : profile.full_name}
</h2>

<p className="text-slate-400">
    {profile.job_title}
</p>

<p className="mt-2">
  📍 {profile.location}
</p>

<p className="text-center mt-2">
  🎯 {profile.networking_goal}
</p>
<div className="mt-4 flex flex-wrap gap-2">

  {profile.profile_skills.map((skill: any) => (

    <span
      key={skill.skills.name}
      className="bg-slate-800 px-3 py-1 rounded-full text-sm"
    >
      {skill.skills.name}
    </span>

  ))}

</div>
        </div>

      ))}

    </div>

  </div>
);
}