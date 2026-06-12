import { useState } from "react";
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleReset = async () => {
  alert("Reset password functionality disabled for UI testing");
};

  return (

  <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
    <div className="w-full max-w-5xl grid md:grid-cols-2 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">

  {/* Left Side */}
  <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-slate-900 to-slate-800">

    <p className="text-slate-300 text-lg mb-8">
      Secure account recovery and password management.
    </p>


  </div>

  {/* Right Side */}
  <div className="p-8 md:p-12 flex flex-col justify-center">

    <h2 className="text-3xl font-bold text-white mb-2">
      Forgot Password
    </h2>

    <p className="text-slate-400 mb-8">
      Enter your email and we'll send a reset link.
    </p>

    <div className="space-y-5">

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-green-500"
      />

      <button
        onClick={handleReset}
        className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-500 transition"
      >
        Send Reset Link
      </button>

      <div className="text-center text-sm">
        <Link
          to="/login"
          className="text-green-400 hover:text-green-300"
        >
          Back to Login
        </Link>
      </div>

    </div>

  </div>

</div>

  </div>
);
}