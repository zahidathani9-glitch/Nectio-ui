import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContexts";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
const [fullName, setFullName] = useState("");
const [dateOfBirth, setDateOfBirth] = useState("");
const [pronouns, setPronouns] = useState("");
const [location, setLocation] = useState("");
const [jobTitle, setJobTitle] = useState("");

const [phone, setPhone] = useState("");
const [instagramUrl, setInstagramUrl] = useState("");
const [linkedinUrl, setLinkedinUrl] = useState("");
const [websiteUrl, setWebsiteUrl] = useState("");

const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState<any[]>([]);
const [photoUrl, setPhotoUrl] = useState("");
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
    .upsert(
{
  user_id: user?.id,

  nectio_id: `NECTIO-${user?.id?.slice(0, 8)}`,

  full_name: fullName,

  date_of_birth: dateOfBirth,

  pronouns: pronouns,

  location: location,

  job_title: jobTitle,

  email: user?.email,

  phone: phone,

  instagram_url: instagramUrl,

  linkedin_url: linkedinUrl,

  website_url: websiteUrl,

  bio: bio,

  photo_url: photoUrl,

  onboarding_completed: true,
},
{
  onConflict: "user_id",
}
)
    .select()
    .single();

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
    placeholder="Full Name"
    value={fullName}
    onChange={(e) => setFullName(e.target.value)}
    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
  />

  <input
    type="date"
    value={dateOfBirth}
    onChange={(e) => setDateOfBirth(e.target.value)}
    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
  />

  <select
    value={pronouns}
    onChange={(e) => setPronouns(e.target.value)}
    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
  >
    <option value="">Select Pronouns</option>
    <option value="he/him">He / Him</option>
    <option value="she/her">She / Her</option>
    <option value="they/them">They / Them</option>
    <option value="prefer_not_to_say">
      Prefer Not To Say
    </option>
  </select>

  <input
    type="text"
    placeholder="Location"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
  />

  <input
    type="text"
    placeholder="Job Title / Profession"
    value={jobTitle}
    onChange={(e) => setJobTitle(e.target.value)}
    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
  />

  <input
    type="tel"
    placeholder="Phone Number"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
  />

  <input
    type="url"
    placeholder="Instagram URL (Optional)"
    value={instagramUrl}
    onChange={(e) => setInstagramUrl(e.target.value)}
    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
  />

  <input
    type="url"
    placeholder="LinkedIn URL (Optional)"
    value={linkedinUrl}
    onChange={(e) => setLinkedinUrl(e.target.value)}
    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
  />

  <input
    type="url"
    placeholder="Website URL (Optional)"
    value={websiteUrl}
    onChange={(e) => setWebsiteUrl(e.target.value)}
    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
  />
  
  <input
  type="url"
  placeholder="Profile Photo URL"
  value={photoUrl}
  onChange={(e) => setPhotoUrl(e.target.value)}
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
      Choose Interests That Represent You
    </h3>

    <div className="grid grid-cols-2 gap-2">
      {skills.map((skill) => (
        <label
          key={skill.id}
          className="flex items-center gap-2"
        >
          <input
            type="checkbox"
            checked={selectedSkills.includes(String(skill.id))}
            onChange={() => {
              if (selectedSkills.includes(String(skill.id))) {
                setSelectedSkills(
                  selectedSkills.filter(
                    (id) => id !== String(skill.id)
                  )
                );
              } else {
                setSelectedSkills([
                  ...selectedSkills,
                  String(skill.id),
                ]);
              }
            }}
          />
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