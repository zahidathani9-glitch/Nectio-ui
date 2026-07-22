import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/landingPage";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import OnboardingRoute from "./components/onboardingRoute";
import MessagesPage from "./pages/MessagesPage";
import NotificationsPage from "./pages/NotificationPage";
import AuthCallback from "./pages/AuthCallback";

export default function App() {
  return (
    <Routes>
      <Route
        path="/home"
  element={
    <ProtectedRoute>
      <OnboardingRoute>
        <HomePage />
      </OnboardingRoute>
    </ProtectedRoute>
  }
/>
<Route
  path="/messages"
  element={
    <ProtectedRoute>
      <OnboardingRoute>
        <MessagesPage />
      </OnboardingRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/notifications"
  element={
    <ProtectedRoute>
      <OnboardingRoute>
        <NotificationsPage />
      </OnboardingRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/message/:conversationId"
  element={
    <ProtectedRoute>
      <OnboardingRoute>
        <MessagesPage />
      </OnboardingRoute>
    </ProtectedRoute>
  }
/>

      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route
  path="/auth/callback"
  element={<AuthCallback />}
/>

      <Route path="/register" element={<RegisterPage />} />

     <Route
    path="/profile"
     element={
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  }
/>


      <Route
        path="/forgot-password"
        element={<ForgotPasswordPage />}
      />

      <Route
        path="/reset-password"
        element={<ResetPasswordPage />}
      />

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
}