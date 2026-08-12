/**
 * Neural Anchor hero style: an editorial four-corner viewport composition uses
 * a massive condensed name and an interactive logo badge to eliminate dead space.
 */
import { ArrowDown, ArrowUpRight, Github, Headphones, MapPin, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { BrandMark } from "@/components/portfolio/BrandMark";
import { HoverTooltip } from "@/components/portfolio/HoverTooltip";
import { portfolio } from "@/data/portfolio";

type HeroParticleControlProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

/**
 * A local, portable particle-control primitive.
 * Keeping it beside the hero prevents a case-sensitive external component path
 * from breaking static Linux deployments while retaining the existing effect.
 */
function HeroParticleControl({ children, className = "", type = "button", ...props }: HeroParticleControlProps) {
  return (
    <button className={`hero-particle relative inline-flex items-center justify-center overflow-hidden ${className}`} type={type} {...props}>
      <span aria-hidden="true" className="hero-particle-spark hero-particle-spark-a" />
      <span aria-hidden="true" className="hero-particle-spark hero-particle-spark-b" />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  );
}

export function HeroSection() {
  const { profile } = portfolio;
  const contactHref = profile.email ? `mailto:${profile.email}` : "#contact";
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const startContact = () => {
    if (profile.email) window.location.href = `mailto:${profile.email}`;
    else scrollTo("contact");
  };

  return (
    <section className="hero-shell hero-four-corner signal-grid relative overflow-hidden" id="top">
      <img
        alt=""
        aria-hidden="true"
        className="hero-art pointer-events-none absolute inset-0 h-full w-full object-cover"
        src="/manus-storage/obsidian-signal-hero_8ed4e5dd.jpg"
      />
      <div className="hero-vignette pointer-events-none absolute inset-0" />

      <div className="relative mx-auto flex h-full min-h-[680px] w-full max-w-[1540px] flex-col px-5 py-5 sm:px-8 sm:py-7 lg:min-h-[790px] lg:px-12 lg:py-8">
        <header className="relative z-20 flex items-center justify-between gap-4" aria-label="Primary navigation">
          <HoverTooltip content="Open to work — DM or Book a Call" placement="bottom">
            <a aria-label="Back to the top" className="hero-brand-link group -m-2 flex items-center gap-3 rounded-lg p-2 touch-action-manipulation select-none [-webkit-tap-highlight-color:transparent] transition-colors hover:bg-zinc-800/50" href="#top">
              <BrandMark className="brand-mark-hero h-10 w-10 text-[#f4f2fb] transition-transform duration-300 group-hover:scale-110 sm:h-11 sm:w-11" />
              <span className="brand-wordmark">
                <span className="block text-xs font-extrabold tracking-[-0.05em] text-white sm:text-sm">Muhammad Hazqeel</span>
                <span className="block font-mono text-[0.5rem] font-bold tracking-[0.15em] text-[#aaa6c7] sm:text-[0.56rem]">NEURAL ANCHOR / SYSTEMS</span>
              </span>
            </a>
          </HoverTooltip>

          <nav className="flex items-center gap-3 text-sm font-medium text-slate-300 sm:gap-6" aria-label="Portfolio sections">
            <a className="nav-link hidden min-[560px]:inline-flex" href="#projects">Work</a>
            <a className="nav-link hidden min-[560px]:inline-flex" href="#academics">Academics</a>
            <HoverTooltip content="I run an agency too!" placement="bottom">
              <a className="nav-link hidden sm:inline-flex" href="https://ghmglobalnetworks.vercel.app/" rel="noreferrer" target="_blank">Studio</a>
            </HoverTooltip>
            <a aria-label="Open GitHub profile" className="icon-link hero-icon-link" href={profile.github} rel="noreferrer" target="_blank">
              <Github aria-hidden="true" size={17} strokeWidth={1.8} />
            </a>
            <HeroParticleControl className="hero-book-call hidden min-[740px]:inline-flex" onClick={startContact}>
              <PhoneCall aria-hidden="true" size={14} strokeWidth={1.8} /> BOOK A CALL
            </HeroParticleControl>
          </nav>
        </header>

        <div className="pointer-events-none absolute inset-x-5 top-[18%] z-10 grid min-h-[330px] place-items-center sm:inset-x-8 sm:top-[15%] lg:inset-x-12 lg:top-[12%] lg:min-h-[470px]">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full text-center"
            initial={{ opacity: 0, y: 26 }}
            transition={{ delay: 0.14, stiffness: 145, damping: 22, type: "spring" }}
          >
            <h1 className="hero-display-title text-[#f4f1eb]" aria-label={profile.name}>
              <span className="block">Muhammad</span>
              <span className="block">Hazqeel</span>
            </h1>
            <HoverTooltip className="hero-logo-wrapper pointer-events-auto" content="Open to work — DM or Book a Call" placement="bottom">
              <button aria-label="Open-to-work profile badge" className="hero-logo-badge group" type="button">
                <BrandMark className="h-[58%] w-[58%] text-white transition-all duration-300 group-hover:scale-105 group-hover:invert" />
              </button>
            </HoverTooltip>
          </motion.div>
        </div>

        <div className="relative z-20 mt-auto grid gap-7 pb-3 pt-[23rem] min-[560px]:grid-cols-[minmax(0,1fr)_minmax(230px,0.72fr)] min-[560px]:items-end min-[560px]:gap-10 lg:pb-5 lg:pt-0">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md"
            initial={{ opacity: 0, y: 18 }}
            transition={{ delay: 0.26, stiffness: 170, damping: 24, type: "spring" }}
          >
            <p className="eyebrow flex items-center gap-2"><MapPin aria-hidden="true" size={14} strokeWidth={1.8} /> SYSTEMS BUILDER / UNITED ARAB EMIRATES</p>
            <p className="mt-4 text-lg font-semibold tracking-[-0.045em] text-white sm:text-xl">{profile.role}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <HeroParticleControl className="glass-button glass-button-primary" onClick={() => scrollTo("projects")}>
                View projects <ArrowDown aria-hidden="true" size={17} strokeWidth={1.9} />
              </HeroParticleControl>
              <HeroParticleControl className="glass-button glass-button-secondary" onClick={startContact}>
                Contact me <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.9} />
              </HeroParticleControl>
            </div>
          </motion.div>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="justify-self-start min-[560px]:justify-self-end min-[560px]:text-right"
            initial={{ opacity: 0, y: 18 }}
            transition={{ delay: 0.33, stiffness: 170, damping: 24, type: "spring" }}
          >
            <p className="max-w-[24rem] text-pretty text-[0.92rem] leading-6 text-slate-200 min-[560px]:ml-auto sm:text-base sm:leading-7">{profile.subtitle}</p>
            <HoverTooltip className="mt-5" content="A FEW SONGS I CAN RECOMMEND IF YOU'RE LOOKING FOR SOME FRESH TUNES :)" placement="top">
              <span className="music-signal inline-flex items-center gap-2 rounded-full border border-white/12 px-3 py-2 text-[0.66rem] font-bold tracking-[0.12em] text-slate-300">
                <Headphones aria-hidden="true" size={14} strokeWidth={1.8} /> OFF-HOURS / SOUND CHECK
              </span>
            </HoverTooltip>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
