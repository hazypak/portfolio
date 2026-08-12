/** Obsidian Signal style: credentials appear as concise, illuminated technical records. */
import { Award, GraduationCap, Sparkles } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/portfolio/Reveal";
import { SpotlightCard } from "@/components/portfolio/SpotlightCard";

export function AcademicsSection() {
  const { academics } = portfolio;

  return (
    <section aria-labelledby="academics-heading" className="section-shell" id="academics">
      <Reveal>
        <div className="mb-8 grid gap-5 border-t border-white/10 pt-5 md:grid-cols-[auto_1fr] md:items-end md:gap-8">
          <span className="font-mono text-xs tracking-[0.2em] text-[#8b7cff]">04</span>
          <div className="max-w-2xl">
            <p className="eyebrow">Education & credentials</p>
            <h2 className="mt-2 text-balance text-3xl font-semibold tracking-[-0.055em] text-white sm:text-4xl" id="academics-heading">
              Learning in public. Building in production.
            </h2>
          </div>
        </div>
      </Reveal>
      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        <Reveal delay={0.04}>
          <SpotlightCard className="min-h-[270px] p-7 sm:p-8">
            <GraduationCap aria-hidden="true" className="text-[#b5afff]" size={28} strokeWidth={1.45} />
            <p className="eyebrow mt-14">Current track</p>
            <p className="mt-3 max-w-lg text-pretty text-2xl font-semibold tracking-[-0.045em] text-white">{academics.currentTrack}</p>
            <p className="mt-5 max-w-lg text-pretty text-sm leading-6 text-slate-400">{academics.targetInstitution}</p>
          </SpotlightCard>
        </Reveal>
        <Reveal delay={0.1}>
          <SpotlightCard className="min-h-[270px] p-7 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <Award aria-hidden="true" className="text-[#b5afff]" size={28} strokeWidth={1.45} />
              <Sparkles aria-hidden="true" className="text-slate-500" size={19} strokeWidth={1.5} />
            </div>
            <p className="eyebrow mt-14">Certification</p>
            <p className="mt-3 max-w-lg text-pretty text-2xl font-semibold tracking-[-0.045em] text-white">OCI AI Foundations Associate</p>
            <p className="mt-5 max-w-lg text-pretty text-sm leading-6 text-slate-400">{academics.certification}</p>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
