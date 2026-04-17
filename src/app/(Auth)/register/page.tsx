import AuthTransition from "@/components/AuthTransition/AuthTransition";
import RegisterForm from "./RegisterForm";

export default function Page() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* CLEAN BACKGROUND (NO BLUR) */}
      <div className="absolute inset-0 bg-[url('/images/auth-bg.png')] bg-cover bg-center" />

      {/* LIGHT OVERLAY ONLY */}
      <div className="absolute inset-0 bg-black/20" />

      {/* CONTENT */}
      <AuthTransition>
        <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-6">
          {/* LEFT SIDE (branding) */}
          <div className="hidden lg:block text-white">
            <h1 className="text-5xl font-bold leading-tight">
              Join Aurora Market
            </h1>
            <p className="mt-4 text-lg text-white/80">
              Discover a premium shopping experience with modern design and
              seamless checkout.
            </p>
          </div>

          {/* RIGHT SIDE (CARD) */}
          <div
            className="
    relative w-full

    bg-white/40
    backdrop-blur-xl
    border border-white/40
    rounded-3xl
    p-8
    shadow-[0_25px_80px_rgba(0,0,0,0.25)]
    transition-all duration-300
  "
          >
            {/* soft glass highlight */}
            <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-white/50 via-white/10 to-transparent opacity-60 pointer-events-none" />

            <div className="relative">
              <h2 className="text-3xl font-bold text-[#5a4030] mb-2">
                Create Account
              </h2>

              <p className="text-[#6b4f3b]/70 mb-6">
                Start your journey with us
              </p>

              <RegisterForm />
            </div>
          </div>
        </div>
      </AuthTransition>
    </div>
  );
}
