import { useCallback, useEffect, useState } from "react";
import { APP_URL } from "../lib/api";

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

export function useFeed(profileId?: string){
  
  const [feed, setFeed] = useState<FeedCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshFeed = useCallback(async () => {
   if (!profileId) {
  setFeed([]);
  setLoading(false);
  return;
}

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${APP_URL}/api/feed`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profileId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch AI feed.");
      }

      const data = await response.json();
     console.log("Feed Response:", data);

      setFeed(data.feed);

      setFeed(data.feed);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }, [profileId]);

  useEffect(() => {
    refreshFeed();
  }, [refreshFeed]);

  return {
    feed,
    loading,
    error,
    refreshFeed,
  };
}