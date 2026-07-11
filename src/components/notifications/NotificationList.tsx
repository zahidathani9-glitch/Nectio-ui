import NotificationCard from "./NotificationCard";
import { type Notification } from "../../hooks/useNotifications";

interface NotificationListProps {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
   markAsRead: (notificationId: string) => Promise<void>;
}

export default function NotificationList({
  notifications,
  loading,
  error,
  markAsRead,
}: NotificationListProps) {
  if (loading) {
    return (
      <div className="p-6 text-slate-400">
        Loading notifications...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        {error}
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="p-6 text-slate-400">
        No notifications yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {notifications.map((notification) => (
       <NotificationCard
  key={notification.id}
  notification={notification}
  markAsRead={markAsRead}
/>
      ))}
    </div>
  );
}