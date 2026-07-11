import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "../lib/supabase";
import background from "../Assets/background_img.jpeg";
import Footer from "./footer/Footer";

export default function LandingPage() {
  const navigate = useNavigate();
  useEffect(() => {
  const checkSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return;

    const { data: profile } = await supabase
      .from("profiles")
      .select("onboarding_completed")
      .eq("user_id", session.user.id)
      .maybeSingle();

    if (!profile) {
      navigate("/profile", { replace: true });
      return;
    }

    if (profile.onboarding_completed) {
      navigate("/home", { replace: true });
    } else {
      navigate("/profile", { replace: true });
    }
  };

  checkSession();
}, [navigate]);

  return (
    <div className="bg-black">
      {/* Hero — sits above the footer (higher z-index) so it visually
          covers it until the user scrolls far enough to reveal it. */}
      <div
        className="relative z-10 min-h-screen overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/70" />

        {/* Content */}
        <div className="relative z-10 flex min-h-screen flex-col">
          {/* Navbar */}
          <nav className="relative z-50 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-10 sm:py-8">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm font-bold text-black sm:h-10 sm:w-10 sm:rounded-xl sm:text-base">
                N
              </div>

              <span className="font-display text-lg font-bold tracking-wide text-white sm:text-2xl">
                Nectio
              </span>
            </div>

            <div className="flex gap-2 sm:gap-4">
              <Link
                to="/login"
                className="flex h-9 items-center justify-center rounded-xl border border-white/25 bg-white/10 px-4 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 sm:h-12 sm:w-32 sm:rounded-2xl sm:px-0 sm:text-lg"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="flex h-9 items-center justify-center rounded-xl bg-white px-4 text-sm font-medium text-black transition-all duration-300 hover:scale-105 sm:h-12 sm:w-32 sm:rounded-2xl sm:px-0 sm:text-lg"
              >
                Sign Up
              </Link>
            </div>
          </nav>

          {/* Hero copy */}
          <div className="relative z-10 animate-fade-in mx-auto flex w-full max-w-7xl flex-1 flex-col items-start justify-center gap-10 px-5 sm:px-10 lg:-mt-20 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
            {/* Left */}
            <div className="max-w-3xl">
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-gray-300 sm:text-sm">
                AI POWERED PROFESSIONAL NETWORKING
              </p>

              <h1 className="font-display text-3xl font-bold leading-[1.1] text-white sm:text-4xl md:text-5xl lg:text-6xl">
                Find the people
                <br />
                who change
                <br />
                your journey.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-gray-300 sm:mt-8 sm:text-lg sm:leading-8 md:text-xl">
                Connect with founders, developers, designers and ambitious
                professionals. Build relationships that create opportunities.
              </p>
            </div>

            {/* Right Quote */}
            <div className="hidden max-w-md rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl lg:block">
              <h2 className="text-3xl font-semibold text-white">
                Meaningful networking.
              </h2>

              <p className="mt-5 text-lg leading-8 text-gray-300">
                No endless scrolling.
                <br />
                No vanity metrics.
                <br />
                Just genuine people and real conversations.
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="relative z-20 mt-8 flex justify-center px-5 pb-10 sm:absolute sm:bottom-12 sm:right-12 sm:mt-0 sm:block sm:px-0 sm:pb-0">
            <button
              onClick={() => navigate("/login")}
              className="w-full rounded-full bg-white px-8 py-3.5 text-base font-semibold text-black shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-white/20 sm:w-auto sm:px-12 sm:py-5 sm:text-xl"
            >
              Start Connecting →
            </button>
          </div>
        </div>
      </div>

      {/* Sticky-reveal footer */}
      <Footer />
    </div>
  );
}