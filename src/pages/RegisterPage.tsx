import { useState } from "react";
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

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

  return (

  <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
    <div className="w-full max-w-5xl grid md:grid-cols-2 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">

  {/* Left Side */}
  <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-slate-900 to-slate-800">
    
  </div>

  {/* Right Side */}
  <div className="p-8 md:p-12 flex flex-col justify-center">

    <h2 className="text-3xl font-bold text-white mb-2">
      Create Account
    </h2>

    <div className="space-y-5">

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-green-500"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-green-500"
      />

      <button
        onClick={handleRegister}
        className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-500 transition"
      >
        Create Account
      </button>

      <div className="text-center text-sm">
        <span className="text-slate-400">
          Already have an account?{" "}
        </span>

        <Link
          to="/login"
          className="text-green-400 hover:text-green-300"
        >
          Login
        </Link>
      </div>

    </div>

  </div>

</div>

  </div>
);
}