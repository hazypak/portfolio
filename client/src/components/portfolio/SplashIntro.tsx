/**
 * Neural Anchor style: Anime.js reveals the opening statement in stages while
 * Motion handles the composited blur-and-scale exit into the portfolio.
 */
import { createTimeline, stagger } from "animejs";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const SPLASH_KEY = "neural-anchor-intro-seen";
const splashWords = ["Innovating,", "Empowering,", "Delivering."];

export function SplashIntro() {
  const reduceMotion = useReducedMotion();
  const lineRef = useRef<HTMLParagraphElement>(null);
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem(SPLASH_KEY) !== "true";
  });
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (!isVisible) return undefined;

    const wordTargets = lineRef.current?.querySelectorAll("[data-splash-word]");
    const timeline = createTimeline();
    if (wordTargets?.length) {
      timeline.set(wordTargets, { opacity: 0, translateY: "0.8rem" });
      timeline.add(wordTargets, {
        delay: stagger(reduceMotion ? 0 : 100),
        duration: reduceMotion ? 180 : 680,
        ease: "outExpo",
        opacity: [0, 1],
        translateY: ["0.8rem", "0rem"],
      });
    }

    const exitTimer = window.setTimeout(() => setIsLeaving(true), reduceMotion ? 420 : 1800);
    const removeTimer = window.setTimeout(() => {
      window.sessionStorage.setItem(SPLASH_KEY, "true");
      setIsVisible(false);
    }, reduceMotion ? 620 : 2500);

    return () => {
      timeline.revert();
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
    };
  }, [isVisible, reduceMotion]);

  if (!isVisible) return null;

  return (
    <motion.div
      animate={isLeaving ? { filter: "blur(8px)", opacity: 0, scale: 1.05 } : { filter: "blur(0px)", opacity: 1, scale: 1 }}
      aria-label="Portfolio introduction"
      className="fixed inset-0 z-[110] grid place-items-center bg-[#0d0e13] px-6 text-center"
      initial={{ opacity: 0.98, scale: 1 }}
      transition={{ duration: reduceMotion ? 0.2 : 0.7, ease: [0.77, 0, 0.175, 1] }}
    >
      <div className="relative">
        <p className="intro-kicker">NEURAL ANCHOR / SYSTEMS</p>
        <p className="intro-line mt-4 flex flex-wrap justify-center gap-x-[0.24em] text-balance text-[clamp(2.1rem,5vw,4.75rem)] uppercase leading-[0.84] text-[#f2f0eb]" ref={lineRef}>
          {splashWords.map((word) => <span data-splash-word="true" key={word}>{word}</span>)}
        </p>
        <span aria-hidden="true" className="mx-auto mt-7 block h-px w-16 bg-[#8b7cff]" />
      </div>
    </motion.div>
  );
}
