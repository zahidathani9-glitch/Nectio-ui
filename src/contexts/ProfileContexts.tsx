import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import { useFeed } from "../hooks/useFeed";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContexts";

type Profile = {
  id: string;
  user_id: string;
  full_name: string | null;
  job_title: string | null;
  bio: string | null;
  location: string | null;
  photo_url: string | null;
  onboarding_completed: boolean;
};

type FeedCard = {
  profileId: string;
  fullName: string;
  jobTitle: string;
  bio: string;
  location: string;
  photoUrl: string | null;
  similarity: number;
  reason: string;
};

type ProfileContextType = {
  profile: Profile | null;

  feed: FeedCard[];

  loading: boolean;

  feedLoading: boolean;

  feedError: string | null;

  refreshProfile: () => Promise<void>;

  refreshFeed: () => Promise<void>;
};

const ProfileContext = createContext<ProfileContextType>({
  profile: null,

  feed: [],

  loading: true,

  feedLoading: true,

  feedError: null,

  refreshProfile: async () => {},

  refreshFeed: async () => {},
});

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user, loading: authLoading } = useAuth();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

 const {
  feed,
  loading: feedLoading,
  error: feedError,
  refreshFeed,
} = useFeed(profile?.id);

  const refreshProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      console.error("Failed to fetch profile:", error.message);
      setProfile(null);
    } else {
      setProfile(data);
    }

    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (!authLoading) {
      refreshProfile();
    }
  }, [authLoading, refreshProfile]);

  return (
   <ProfileContext.Provider
  value={{
    profile,
    loading,

    feed,
    feedLoading,
    feedError,

    refreshProfile,
    refreshFeed,
  }}
>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  return useContext(ProfileContext);
};