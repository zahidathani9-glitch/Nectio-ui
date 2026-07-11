import { useCallback, useEffect, useState } from "react";
import { APP_URL } from "../lib/api";

export interface Notification {
  id: string;

  profileId: string;

  type: "message" | "match" | "connection" | "system";

  title: string;

  body: string;

  conversationId: string | null;

  isRead: boolean;

  createdAt: string;
}

export function useNotifications(profileId?: string) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async () => {
    if (!profileId) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${APP_URL}/api/notifications/${profileId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data = await response.json();

      setNotifications(data);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch notifications"
      );
    } finally {
      setLoading(false);
    }
  }, [profileId]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markAsRead = async (notificationId: string) => {
  try {
    const response = await fetch(
      `${APP_URL}/api/notifications/${notificationId}/read`,
      {
        method: "PATCH",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to mark notification as read");
    }

    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === notificationId
          ? {
              ...notification,
              isRead: true,
            }
          : notification
      )
    );
  } catch (error) {
    console.error(error);
  }
};

  return {
    notifications,
    loading,
    error,
    refetch: fetchNotifications,
    markAsRead,
  };
}

