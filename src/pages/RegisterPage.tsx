import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Account created successfully");
    navigate("/login");
  };

  const handleGoogleSignUp = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          prompt: "select_account",
        },
      },
    });

    if (error) {
      alert(error.message);
    }
    // Supabase redirects on success, so no navigate() call needed here.
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[linear-gradient(160deg,#14100c_0%,#1c1712_40%,#0e0b08_100%)]">
      {/* Ambient amber glows, matching the landing page */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(180,120,50,0.35), transparent 45%)," +
            "radial-gradient(circle at 80% 10%, rgba(160,100,40,0.25), transparent 40%)," +
            "radial-gradient(circle at 60% 80%, rgba(140,90,40,0.3), transparent 45%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-black/45" />

      {/* Logo mark — links back to the landing page */}
      <Link
        to="/"
        aria-label="Go to homepage"
        className="absolute top-7 left-10 z-20 flex h-[30px] w-[30px] items-center justify-center rounded-[7px] bg-white text-[13px] font-bold text-[#14100c]"
      >
        N
      </Link>

      <div className="relative z-10 w-full max-w-[360px] rounded-2xl border border-white/[0.07] bg-[#18130f]/60 px-[30px] pb-[26px] pt-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-2.5 text-center text-[10px] font-medium uppercase tracking-[1.5px] text-[#e8934a]/75">
          Get started
        </div>
        <h1 className="mb-1 text-center text-[19px] font-semibold text-white">
          Create your account
        </h1>
        <p className="mb-[22px] text-center text-[12.5px] text-white/50">
          Join the people building their next move.
        </p>

        <button
          type="button"
          onClick={handleGoogleSignUp}
          className="mb-[18px] flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-white text-[13px] font-medium text-[#1c1712]"
        >
          <svg viewBox="0 0 48 48" width="15" height="15" aria-hidden="true">
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3C33.7 32.5 29.3 35.5 24 35.5c-6.4 0-11.5-5.1-11.5-11.5S17.6 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l6-6C33.9 6.1 29.2 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.5 16 18.9 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l6-6C33.9 6.1 29.2 4 24 4c-7.4 0-13.8 4-17.7 10.7z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.4-4.6 2.3-7.2 2.3-5.3 0-9.7-3.6-11.3-8.4l-6.5 5C9.9 39.6 16.4 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.1 5.6l6.2 5.2C40.6 36 44 30.6 44 24c0-1.2-.1-2.4-.4-3.5z"
            />
          </svg>
          Continue with Google
        </button>

        <div className="mb-[18px] flex items-center gap-2.5">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[11px] text-white/35">or</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="mb-3.5">
          <label
            htmlFor="email"
            className="mb-1.5 block text-[11.5px] text-white/55"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-[38px] w-full rounded-lg border border-white/10 bg-white/[0.05] px-3 text-[13px] text-white outline-none focus:border-[#e8934a] focus:bg-white/[0.08]"
          />
        </div>

        <div className="mb-3.5">
          <label
            htmlFor="password"
            className="mb-1.5 block text-[11.5px] text-white/55"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-[38px] w-full rounded-lg border border-white/10 bg-white/[0.05] px-3 text-[13px] text-white outline-none focus:border-[#e8934a] focus:bg-white/[0.08]"
          />
        </div>

        <button
          type="button"
          onClick={handleRegister}
          className="mb-[18px] mt-1.5 h-10 w-full rounded-lg bg-[#d9662b] text-[13px] font-medium text-white transition hover:bg-[#c95c26]"
        >
          Create account →
        </button>

        <div className="text-center text-xs text-white/45">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-white">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}