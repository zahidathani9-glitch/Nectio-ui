import AppLayout from "../components/layout/appLayout";
import NotificationList from "../components/notifications/NotificationList";
import { useProfile } from "../contexts/ProfileContexts";

export default function NotificationsPage() {

 const {
  notifications,
  notificationsLoading,
  notificationsError,
  markNotificationAsRead,
} = useProfile();

  return (
    <AppLayout>
  <NotificationList
  notifications={notifications}
  loading={notificationsLoading}
  error={notificationsError}
  markAsRead={markNotificationAsRead}
/>
    </AppLayout>
  );
}