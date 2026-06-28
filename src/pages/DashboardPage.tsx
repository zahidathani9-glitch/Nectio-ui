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
const [uploading, setUploading] = useState(false);
const [networkingGoal, setNetworkingGoal] = useState("");
const [profileVisibility, setProfileVisibility] =
  useState("anonymous");
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


const fetchProfile = async () => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user?.id)
    .single();

  if (error || !data) return;

  setFullName(data.full_name || "");
  setDateOfBirth(data.date_of_birth || "");
  setPronouns(data.pronouns || "");
  setLocation(data.location || "");
  setJobTitle(data.job_title || "");
  setPhone(data.phone || "");
  setInstagramUrl(data.instagram_url || "");
  setLinkedinUrl(data.linkedin_url || "");
  setWebsiteUrl(data.website_url || "");
  setPhotoUrl(data.photo_url || "");
  setBio(data.bio || "");
  setNetworkingGoal(data.networking_goal || "");
  setProfileVisibility(
  data.profile_visibility || "anonymous"
);
};

const fetchSelectedSkills = async () => {
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("user_id", user?.id)
    .single();

  if (!profile) return;

  const { data: skillsData } = await supabase
    .from("profile_skills")
    .select("skill_id")
    .eq("profile_id", profile.id);

  if (!skillsData) return;

  setSelectedSkills(
    skillsData.map((row) => String(row.skill_id))
  );
};

 useEffect(() => {
  if (user) {
    fetchProfile();
    fetchSkills();
    fetchSelectedSkills();
 }
 }, [user]);

 const handlePhotoUpload = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  setUploading(true);

  const fileName = `${user?.id}/${Date.now()}-${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from("profile-photos")
    .upload(fileName, file);

  if (uploadError) {
    alert(uploadError.message);
    setUploading(false);
    return;
  }

  const { data } = supabase.storage
    .from("profile-photos")
    .getPublicUrl(fileName);

  setPhotoUrl(data.publicUrl);

  setUploading(false);
};

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

  networking_goal: networkingGoal,

  profile_visibility: profileVisibility,
},
{
  onConflict: "user_id",
}
)
    .select()
    .single();

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error || !data) {
    alert(error?.message || 'Failed to save profile');
    return;
  }
  const profileId = data.id;
  await supabase 
  .from('profile_skills')
  .delete()
  .eq('profile_id', profileId);

 const skillRows = selectedSkills.map((skillId) => ({
  profile_id: profileId,
  skill_id: skillId,
}));

await supabase
  .from("profile_skills")
  .insert(skillRows);

  alert("Profile saved successfully");
};
const calculateAge = (dob: string) => {
  const birthDate = new Date(dob);
  const today = new Date();

  let age =
    today.getFullYear() -
    birthDate.getFullYear();

  const monthDiff =
    today.getMonth() -
    birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 &&
      today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};
{dateOfBirth && (
  <p className="text-sm text-slate-400">
    Age: {calculateAge(dateOfBirth)}
  </p>
)}

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-2xl mx-auto">

        <div className="flex items-center gap-4 mb-8">

  {photoUrl && (
    <img
      src={photoUrl}
      alt="Profile"
      className="w-20 h-20 rounded-full object-cover border-2 border-slate-700"
    />
  )}

  <div>
    <h1 className="text-6xl text-red-500 font-bold">
  Welcome to Nectio
</h1>

    <p className="text-slate-400">
      Logged in as: {user?.email}
    </p>
  </div>

</div>

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

  {dateOfBirth && (
  <p className="text-sm text-slate-400">
    Age: {calculateAge(dateOfBirth)} years
  </p>
)}

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
  <select
  value={networkingGoal}
  onChange={(e) => setNetworkingGoal(e.target.value)}
  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
>
  <option value="">Select Networking Goal</option>
  <option value="cofounder">Find Co-Founder</option>
  <option value="investor">Find Investors</option>
  <option value="developer">Find Developers</option>
  <option value="designer">Find Designers</option>
  <option value="mentor">Find Mentors</option>
  <option value="customers">Find Customers</option>
</select>

<select
  value={profileVisibility}
  onChange={(e) => setProfileVisibility(e.target.value)}
  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
>
  <option value="anonymous">Anonymous</option>
  <option value="partial">Partial</option>
  <option value="public">Public</option>
</select>

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
  
 <div>
  <label className="block mb-2 font-medium">
    Profile Photo
  </label>

  <input
    type="file"
    accept="image/png,image/jpeg,image/webp"
    onChange={handlePhotoUpload}
    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
  />

  {uploading && (
    <p className="text-sm text-slate-400 mt-2">
      Uploading...
    </p>
  )}

  
</div>

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
  onClick={() => navigate("/discover")}
  className="w-full rounded-xl bg-blue-600 py-3 font-semibold hover:bg-blue-500"
>
  Discover People
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