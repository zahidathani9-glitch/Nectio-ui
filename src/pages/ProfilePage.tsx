import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContexts";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { APP_URL } from "../lib/api";
import { useProfile } from "../contexts/ProfileContexts";

import Wizard from "../components/wizard/wizard";
import TextCard from "../components/wizard/Cards/textCard";
import DateCard from "../components/wizard/Cards/dateCard";
import OptionCard from "../components/wizard/Cards/optionCard";
import MultiSelectCard from "../components/wizard/Cards/multiSelectCard";
import UploadCard from "../components/wizard/Cards/uploadCard";
import TextAreaCard from "../components/wizard/Cards/textAreaCard";

export default function ProfilePage() {
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


  const { refreshProfile } = useProfile();

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
      .maybeSingle();

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
      .maybeSingle();

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
    console.log("🔥 handleSaveProfile CALLED");
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

    console.log("1️⃣ Profile saved:", profileId);

    const { error: deleteError } = await supabase
      .from("profile_skills")
      .delete()
      .eq("profile_id", profileId);

    console.log("2️⃣ Delete Error:", deleteError);

    console.log("Selected Skills:", selectedSkills);
    console.log("Selected Skills Length:", selectedSkills.length);

    const skillRows = selectedSkills.map((skillId) => ({
      profile_id: profileId,
      skill_id: skillId,
    }));
    console.log("Skill Rows:", skillRows);

    const { error: insertError } = await supabase
      .from("profile_skills")
      .insert(skillRows);

    console.log("3️⃣ Insert Error:", insertError);

    console.log("4️⃣ Calling sync-ai...");

    const response = await fetch(`${APP_URL}/api/profile/sync-ai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        profileId,
      }),
    });

    console.log("5️⃣ Sync Status:", response.status);

    const result = await response.json();

    console.log("6️⃣ Sync Response:", result);

    if (!response.ok) {
      alert(result.error ?? "Failed to sync AI profile.");
      return;
    }

    console.log("7️⃣ Refreshing profile...");

    await refreshProfile();

    console.log("8️⃣ Navigating home...");

    navigate("/home");
  }
  return (
    <div
      className="min-h-screen relative overflow-hidden text-white px-6 py-10"
      style={{ background: "#0a0806" }}
    >
      {/* Ambient amber glows — same warm palette as the Landing/Login pages */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 900px 550px at 12% 8%, rgba(232,147,74,0.16), transparent 60%),
            radial-gradient(ellipse 800px 650px at 88% 92%, rgba(232,147,74,0.13), transparent 60%),
            radial-gradient(ellipse 600px 500px at 50% 45%, rgba(232,147,74,0.05), transparent 70%)
          `,
        }}
      />

      <div className="relative z-10 mb-12 text-center">
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white">
          Complete Your Profile
        </h1>

        <p className="mt-4 text-white/50 max-w-md mx-auto">
          Help AI understand who you are to recommend meaningful connections.
        </p>

      </div>

      <div className="relative z-10">
        <Wizard onFinish={handleSaveProfile}>

          <TextCard
            title="What's your full name?"
            subtitle="This is how people will know you."
            placeholder="John Doe"
            value={fullName}
            setValue={setFullName}
          />

          <DateCard
            title="When were you born?"
            subtitle="We'll automatically calculate your age."
            value={dateOfBirth}
            setValue={setDateOfBirth}
          />

          <OptionCard
            title="Choose your pronouns"
            subtitle="Optional"
            options={[
              "he/him",
              "she/her",
              "they/them",
              "prefer_not_to_say",
            ]}
            value={pronouns}
            setValue={setPronouns}
          />

          <TextCard
            title="Where are you located?"
            subtitle="City or Country"
            placeholder="Bangalore"
            value={location}
            setValue={setLocation}
          />

          <TextCard
            title="What's your profession?"
            subtitle="Tell everyone what you do."
            placeholder="Software Engineer"
            value={jobTitle}
            setValue={setJobTitle}
          />

          <OptionCard
            title="What are you looking for?"
            subtitle="Choose one."
            options={[
              "cofounder",
              "investor",
              "developer",
              "designer",
              "mentor",
              "customers",
            ]}
            value={networkingGoal}
            setValue={setNetworkingGoal}
          />

          <OptionCard
            title="Profile Visibility"
            subtitle="Who should see your profile?"
            options={[
              "anonymous",
              "partial",
              "public",
            ]}
            value={profileVisibility}
            setValue={setProfileVisibility}
          />
          <TextCard
            title="What's your phone number?"
            subtitle="Optional"
            placeholder="+91 9876543210"
            value={phone}
            setValue={setPhone}
          />

          <TextCard
            title="Instagram Profile"
            subtitle="Optional"
            placeholder="https://instagram.com/username"
            value={instagramUrl}
            setValue={setInstagramUrl}
          />

          <TextCard
            title="LinkedIn Profile"
            subtitle="Optional"
            placeholder="https://linkedin.com/in/username"
            value={linkedinUrl}
            setValue={setLinkedinUrl}
          />

          <TextCard
            title="Personal Website"
            subtitle="Optional"
            placeholder="https://yourwebsite.com"
            value={websiteUrl}
            setValue={setWebsiteUrl}
          />

          <UploadCard
            uploading={uploading}
            onUpload={handlePhotoUpload}
          />

          <TextAreaCard
            title="Tell us about yourself"
            subtitle="Help people understand who you are."
            placeholder="I love building AI products..."
            value={bio}
            setValue={setBio}
          />

          <MultiSelectCard
            title="Choose your interests"
            subtitle="Select everything that represents you."
            skills={skills}
            selected={selectedSkills}
            setSelected={setSelectedSkills}
          />

        </Wizard>
      </div>

    </div>
  );
}
