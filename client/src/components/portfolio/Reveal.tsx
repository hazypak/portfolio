/** One-time scroll entrance; renders static content when reduced motion is requested. */
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
}

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Tag = as === "li" ? motion.li : motion.div;

  return (
    <Tag
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ amount: 0.15, once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </Tag>
  );
}
