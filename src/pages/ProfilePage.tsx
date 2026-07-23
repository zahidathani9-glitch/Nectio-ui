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
import {
  sanitizeString,
  sanitizeDate,
  validateOnboardingData,
} from "../utils/sanitization";

export default function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [location, setLocation] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const [phone, setPhone] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState<any[]>([]);
  const [photoUrl, setPhotoUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [networkingGoal, setNetworkingGoal] = useState("");

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
    setLinkedinUrl(data.linkedin_url || "");
    setPhotoUrl(data.photo_url || "");
    setBio(data.bio || "");
    setNetworkingGoal(data.networking_goal || "");
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
    if (!user?.id) {
      alert("Authentication session lost. Please log in again.");
      return;
    }

    // 1. Validate required fields before submitting to Supabase
    const validationError = validateOnboardingData({
      fullName,
      dateOfBirth,
      location,
      jobTitle,
      networkingGoal,
      photoUrl,
      selectedSkills,
    });

    if (validationError) {
      alert(validationError);
      return;
    }

    // 2. Sanitize all required and optional fields
    const sanitizedFullName = sanitizeString(fullName)!;
    const sanitizedDob = sanitizeDate(dateOfBirth)!;
    const sanitizedLocation = sanitizeString(location)!;
    const sanitizedJobTitle = sanitizeString(jobTitle)!;
    const sanitizedNetworkingGoal = sanitizeString(networkingGoal)!;

    // Optional fields: converted to null if empty
    const sanitizedPronouns = sanitizeString(pronouns);
    const sanitizedPhone = sanitizeString(phone);
    const sanitizedLinkedin = sanitizeString(linkedinUrl);
    const sanitizedBio = sanitizeString(bio);
    const sanitizedPhotoUrl = sanitizeString(photoUrl);

    try {
      // 3. Upsert sanitized profile data to Supabase
      const { data, error } = await supabase
        .from("profiles")
        .upsert(
          {
            user_id: user.id,
            nectio_id: `NECTIO-${user.id.slice(0, 8)}`,
            full_name: sanitizedFullName,
            date_of_birth: sanitizedDob,
            pronouns: sanitizedPronouns,
            location: sanitizedLocation,
            job_title: sanitizedJobTitle,
            email: user.email || null,
            phone: sanitizedPhone,
            linkedin_url: sanitizedLinkedin,
            bio: sanitizedBio,
            photo_url: sanitizedPhotoUrl,
            onboarding_completed: true,
            networking_goal: sanitizedNetworkingGoal,
          },
          {
            onConflict: "user_id",
          }
        )
        .select()
        .single();

      if (error || !data) {
        console.error("Supabase profile save error:", error);
        alert("Failed to save profile. Please verify your information and try again.");
        return;
      }

      const profileId = data.id;

      // 4. Update profile skills
      const { error: deleteError } = await supabase
        .from("profile_skills")
        .delete()
        .eq("profile_id", profileId);

      if (deleteError) {
        console.error("Error deleting old profile skills:", deleteError);
      }

      const skillRows = selectedSkills.map((skillId) => ({
        profile_id: profileId,
        skill_id: skillId,
      }));

      const { error: insertError } = await supabase
        .from("profile_skills")
        .insert(skillRows);

      if (insertError) {
        console.error("Error inserting profile skills:", insertError);
        alert("Failed to update skills. Please try again.");
        return;
      }

      // 5. Sync AI Profile
      const response = await fetch(`${APP_URL}/api/profile/sync-ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profileId,
        }),
      });

      if (!response.ok) {
        let errorMsg = "Failed to sync AI profile.";
        try {
          const result = await response.json();
          if (result.error) errorMsg = result.error;
        } catch (_) {}
        alert(errorMsg);
        return;
      }

      // 6. Refresh profile in Context
      await refreshProfile();

      // 7. Navigate Home
      navigate("/home");
    } catch (err) {
      console.error("Unexpected error during profile save:", err);
      alert("An unexpected error occurred while saving your profile. Please try again.");
    }
  };
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
              "prefer not to say",
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

          <TextCard
            title="What's your phone number?"
            subtitle="Optional"
            placeholder="+91 9876543210"
            value={phone}
            setValue={setPhone}
          />

          <TextCard
            title="LinkedIn Profile"
            subtitle="Optional"
            placeholder="https://linkedin.com/in/username"
            value={linkedinUrl}
            setValue={setLinkedinUrl}
          />

          <UploadCard
            uploading={uploading}
            photoUrl={photoUrl}
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
