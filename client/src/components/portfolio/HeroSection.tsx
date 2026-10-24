/**
 * Full-height hero: masked grid, drifting glows and a live node field behind a
 * two-line gradient name of equal weight, with the family name underneath.
 */
import { ArrowDownRight, ArrowUpRight, Check, Copy } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ParticleField } from "@/components/portfolio/ParticleField";
import { profile, projectCount, specSheet } from "@/data/portfolio";
import { useCopyEmail } from "@/hooks/useCopyEmail";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const { copied, copy } = useCopyEmail();
  const enter = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.8, ease },
        };

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
      id="top"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="hero-grid absolute inset-0" />
        <div className="glow glow-cyan -right-24 top-10 h-[28rem] w-[28rem]" />
        <div className="glow glow-violet -left-32 bottom-0 h-[30rem] w-[30rem]" />
        <ParticleField className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-5 pb-16 pt-24 sm:px-8 lg:px-12">
        <motion.p
          className="inline-flex items-center gap-2.5 rounded-full border border-line bg-basalt/60 px-3.5 py-1.5 font-mono text-[0.72rem] text-frost backdrop-blur"
          {...enter(0)}
        >
          <span aria-hidden="true" className="status-dot" />
          {profile.role} · {profile.location}
        </motion.p>

        <h1 className="mt-7 sm:mt-9" id="hero-title">
          <span className="display-name block">
            <span className="name-line gradient-text block">
              {profile.firstName}
            </span>
            <span className="sr-only"> </span>
            <span className="name-line name-line--2 gradient-text block">
              {profile.lastName}
            </span>
          </span>
          <span className="sr-only"> </span>
          <span className="family-name mt-5 flex items-center gap-4 sm:mt-6">
            <span
              aria-hidden="true"
              className="h-px w-10 bg-gradient-to-r from-transparent to-glacier sm:w-16"
            />
            {profile.familyName}
          </span>
        </h1>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-12">
          <motion.div className="lg:col-span-6" {...enter(0.35)}>
            <p className="max-w-xl text-pretty text-lg leading-relaxed text-frost/85 sm:text-xl sm:leading-relaxed">
              {profile.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="btn btn-primary" href="#work">
                See the work
                <ArrowDownRight
                  aria-hidden="true"
                  className="btn-arrow"
                  size={17}
                />
              </a>
              <a className="btn btn-ghost" href="#contact">
                Start a project
                <ArrowUpRight
                  aria-hidden="true"
                  className="btn-arrow"
                  size={17}
                />
              </a>
              <button
                aria-live="polite"
                className="btn btn-ghost"
                onClick={copy}
                type="button"
              >
                {copied ? (
                  <>
                    <Check aria-hidden="true" size={16} /> Email copied
                  </>
                ) : (
                  <>
                    <Copy aria-hidden="true" size={16} /> Copy email
                  </>
                )}
              </button>
            </div>
            <p className="mt-8 font-mono text-xs text-mist">
              {projectCount} systems shipped across client work, products, AI
              and game infrastructure.
            </p>
          </motion.div>

          <motion.aside
            aria-label="What I'm working on"
            className="glass p-5 sm:p-6 lg:col-span-5 lg:col-start-8"
            {...enter(0.5)}
          >
            <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
              <p className="eyebrow">Spec sheet</p>
              <p className="flex items-center gap-2 font-mono text-[0.7rem] text-patina">
                <span aria-hidden="true" className="status-dot" /> Online
              </p>
            </div>
            <dl className="divide-y divide-line">
              {specSheet.map(row => (
                <div
                  className="grid grid-cols-[6.5rem_1fr] gap-4 py-3.5 text-sm"
                  key={row.label}
                >
                  <dt className="font-mono text-xs leading-5 text-mist">
                    {row.label}
                  </dt>
                  <dd className="leading-5 text-frost">
                    {row.href ? (
                      <a
                        className="text-link"
                        href={row.href}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
