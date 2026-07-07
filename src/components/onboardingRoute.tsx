import { Navigate } from "react-router-dom";
import { useProfile } from "../contexts/ProfileContexts";

export default function OnboardingRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile, loading } = useProfile();

  if (loading) {
    return <div>Loading...</div>;
  }

  // No profile yet → send to onboarding
  if (!profile) {
    return <Navigate to="/profile" replace />;
  }

  // Profile exists but onboarding isn't finished
  if (!profile.onboarding_completed) {
    return <Navigate to="/profile" replace />;
  }

  return <>{children}</>;
}