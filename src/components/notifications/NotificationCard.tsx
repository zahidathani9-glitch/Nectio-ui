import { Bell, MessageCircle, Sparkles, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { type Notification } from "../../hooks/useNotifications";

interface NotificationCardProps {
  notification: Notification;
  markAsRead: (notificationId: string) => Promise<void>;
}

export default function NotificationCard({
  notification,
  markAsRead,
}: NotificationCardProps) {
  const navigate = useNavigate();

 const handleClick = async () => {
  if (!notification.isRead) {
    await markAsRead(notification.id);
  }

  if (
    notification.type === "message" &&
    notification.conversationId
  ) {
    navigate(`/message/${notification.conversationId}`);
  }
};
  const formattedTime = new Date(
    notification.createdAt
  ).toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "short",
  });

  const getIcon = () => {
    switch (notification.type) {
      case "message":
        return <MessageCircle size={20} />;

      case "match":
        return <Sparkles size={20} />;

      case "connection":
        return <Users size={20} />;

      default:
        return <Bell size={20} />;
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full rounded-xl border border-slate-800 bg-slate-900 p-4 text-left transition hover:border-slate-700 hover:bg-slate-800"
    >
      <div className="flex items-start gap-4">
        <div className="mt-1 rounded-full bg-green-500/20 p-3 text-green-400">
          {getIcon()}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">
              {notification.title}
            </h3>

            <span className="text-xs text-slate-400">
              {formattedTime}
            </span>
          </div>

          <p className="mt-2 text-sm text-slate-400">
            {notification.body}
          </p>
        </div>

        {!notification.isRead && (
          <div className="h-3 w-3 rounded-full bg-green-500" />
        )}
      </div>
    </button>
  );
}