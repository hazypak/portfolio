/**
 * Left-weighted hero: the name stretches to full width on load (see
 * .display-name in index.css), and a spec sheet states what's live right now.
 */
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { profile, projectCount, specSheet } from "@/data/portfolio";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const enter = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.8, ease },
        };

  return (
    <section aria-labelledby="hero-title" className="relative" id="top">
      <div className="mx-auto w-full max-w-[1440px] px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-24">
        <motion.p className="eyebrow" {...enter(0)}>
          {profile.firstName} · {profile.role} · {profile.location}
        </motion.p>
        <h1
          className="display-name mt-5 pb-[0.06em] text-frost sm:mt-7"
          id="hero-title"
        >
          <span className="sr-only">{profile.firstName} </span>
          {profile.lastName}
        </h1>
        <div
          aria-hidden="true"
          className="name-rule mt-6 h-px w-full bg-gradient-to-r from-glacier/70 via-glacier/20 to-transparent sm:mt-8"
        />

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-12">
          <motion.div className="lg:col-span-6" {...enter(0.35)}>
            <p className="max-w-xl text-pretty text-xl leading-relaxed text-frost/90 sm:text-2xl sm:leading-relaxed">
              {profile.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="btn btn-primary" href="#work">
                See the work{" "}
                <ArrowDownRight
                  aria-hidden="true"
                  className="btn-arrow"
                  size={17}
                />
              </a>
              <a className="btn btn-ghost" href="#contact">
                Start a project{" "}
                <ArrowUpRight
                  aria-hidden="true"
                  className="btn-arrow"
                  size={17}
                />
              </a>
            </div>
            <p className="mt-8 font-mono text-xs text-mist">
              {projectCount} systems shipped across client work, products and
              game infrastructure.
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
                <span aria-hidden="true" className="status-dot" /> Active
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
