import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContexts";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [role, setRole] = useState("");
  const [industry, setIndustry] = useState("");
  const [experience, setExperience] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState<any[]>([]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const fetchSkills = async () => {
  const { data, error } = await supabase
    .from("skills")
    .select("*");

  if (error) {
    console.log(error);
    return;
  }

  setSkills(data);
};

 useEffect(() => {
  fetchSkills();
}, []);

 const handleSaveProfile = async () => {
  console.log("USER:", user);
  console.log("USER ID:", user?.id);

  const { data, error } = await supabase
    .from("profiles")
    .upsert({
      user_id: user?.id,
      nectio_id: `NECTIO-${Date.now()}`,
      role,
      industry,
      experience,
      bio,
      onboarding_completed: true,
    },
    { onConflict: "user_id",

    })
    .select();

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Profile saved successfully");
};

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-2xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          Welcome to Nectio
        </h1>

        <p className="text-slate-400 mb-8">
          Logged in as: {user?.email}
        </p>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Role (Founder, Developer, Investor...)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
          />

          <input
            type="text"
            placeholder="Industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
          />

          <input
            type="text"
            placeholder="Experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
          />

          <textarea
            placeholder="Tell us about yourself"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 h-32"
          />
          <div>
      <h3 className="text-lg font-semibold mb-2">
    Skills
     </h3>

    <div className="grid grid-cols-2 gap-2">
    {skills.map((skill) => (
      <label
        key={skill.id}
        className="flex items-center gap-2"
      >
        <input type="checkbox" />
        {skill.name}
      </label>
    ))}
  </div>
      </div>

          <button
            onClick={handleSaveProfile}
            className="w-full rounded-xl bg-green-600 py-3 font-semibold hover:bg-green-500"
          >
            Save Profile
          </button>

          <button
            onClick={handleLogout}
            className="w-full rounded-xl bg-red-600 py-3 font-semibold hover:bg-red-500"
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  );
}