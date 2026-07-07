import { Routes, Route, Navigate } from "react-router-dom";
import DiscoverPage from "./pages/DiscoverPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/landingPage";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import OnboardingRoute from "./components/onboardingRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/discover" element={<DiscoverPage />} />
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
      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<LoginPage />} />

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