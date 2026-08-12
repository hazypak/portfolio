/** Obsidian Signal style: a direct, dark fallback route preserves the portfolio's editorial confidence. */
import { ArrowUpRight, Orbit, Home } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <main className="signal-grid flex min-h-screen items-center justify-center bg-[#030303] px-5 text-white sm:px-8">
      <section aria-labelledby="not-found-title" className="relative w-full max-w-2xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:p-12">
        <div aria-hidden="true" className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-[#8b7cff]/30" />
        <div aria-hidden="true" className="absolute -right-2 top-7 h-24 w-24 rounded-full border border-[#8b7cff]/20" />
        <div className="relative">
          <Orbit aria-hidden="true" className="h-8 w-8 text-[#b9b0ff]" strokeWidth={1.5} />
          <p className="eyebrow mt-8">Route unresolved / 404</p>
          <h1 className="mt-3 text-balance text-5xl font-semibold tracking-[-0.07em] text-white sm:text-7xl" id="not-found-title">This path has no deployed system.</h1>
          <p className="mt-6 max-w-lg text-pretty text-base leading-7 text-slate-300">The address may be outdated, or the route may not exist. Return to the portfolio index to continue exploring shipped systems.</p>
          <button className="glass-button glass-button-primary mt-8" onClick={handleGoHome} type="button"><Home aria-hidden="true" size={17} /> Return to the portfolio <ArrowUpRight aria-hidden="true" size={16} /></button>
        </div>
      </section>
    </main>
  );
}
