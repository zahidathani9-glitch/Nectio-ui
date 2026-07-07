import { Link, useNavigate } from "react-router-dom";
import background from "../Assets/background_img.jpeg";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      {/* Dark Overlay */}
     <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/70" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Navbar */}
      <nav className="relative z-50 mx-auto flex w-full max-w-7xl items-center justify-between px-10 py-8">
         <div className="flex items-center gap-3">
  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white font-bold text-black">
    N
  </div>

  <span className="font-display text-2xl font-bold tracking-wide text-white">
    Nectio
  </span>
</div>

          <div className="flex gap-4">
            <Link
              to="/login"
               className="flex h-12 w-32 items-center justify-center rounded-2xl border border-white/25 bg-white/10 text-lg font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
               >
                      Login
              </Link>

            <Link
             to="/register"
            className="flex h-12 w-32 items-center justify-center rounded-2xl bg-white text-lg font-medium text-black transition-all duration-300 hover:scale-105"
            >
                  Sign Up 
              </Link>
          </div>
        </nav>

        {/* Hero */}
      <div className="relative z-10 animate-fade-in mx-auto flex w-full max-w-7xl flex-1 items-center justify-between px-10 -mt-20">
          {/* Left */}
          {/* Left */}
   <div className="max-w-3xl">

  <p className="mb-6 text-sm uppercase tracking-[0.35em] text-gray-300">
    AI POWERED PROFESSIONAL NETWORKING
  </p>

 <h1 className="font-display text-4xl font-bold leading-[1.05] text-white md:text-5xl lg:text-6xl">
    Find the people
    <br />
    who change
    <br />
    your journey.
  </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-gray-300 md:text-xl">
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
       {/* Bottom CTA */}
<div className="absolute bottom-12 right-12 z-20">
  <button
    onClick={() => navigate("/login")}
    className="rounded-full bg-white px-12 py-5 text-xl font-semibold text-black shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-white/20"
  >
    Start Connecting →
  </button>
</div>
      </div>
    </div>
  );
}