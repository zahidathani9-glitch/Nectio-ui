import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import { useFeed } from "../hooks/useFeed";
import {
  useNotifications,
  type Notification,
} from "../hooks/useNotifications";
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
  notifications: Notification[];

  loading: boolean;

  feedLoading: boolean;
  notificationsLoading: boolean;

  feedError: string | null;
  notificationsError: string | null;

  unreadNotificationCount: number;

  refreshProfile: () => Promise<void>;

  refreshFeed: () => Promise<void>;

  refreshNotifications: () => Promise<void>;

  markNotificationAsRead: (
    notificationId: string
  ) => Promise<void>;
};

const ProfileContext = createContext<ProfileContextType>({
  profile: null,

  feed: [],
  notifications: [],

  unreadNotificationCount: 0,

  loading: true,

  feedLoading: true,
  notificationsLoading: true,

  feedError: null,
  notificationsError: null,

  refreshProfile: async () => { },

  refreshFeed: async () => { },

  refreshNotifications: async () => { },

  markNotificationAsRead: async () => { },
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

  const {
    notifications,
    loading: notificationsLoading,
    error: notificationsError,
    markAsRead,
    refetch: refreshNotifications,
  } = useNotifications(profile?.id);


  const unreadNotificationCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

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

        notifications,
        notificationsLoading,
        notificationsError,

        unreadNotificationCount,

        refreshProfile,
        refreshFeed,

        refreshNotifications,

        markNotificationAsRead: markAsRead,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  return useContext(ProfileContext);
};