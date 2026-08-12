/** Obsidian Signal style: compact technical tooltips make hidden context feel intentional. */
import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode, useId, useState } from "react";

interface HoverTooltipProps {
  children: ReactNode;
  content: string;
  className?: string;
  placement?: "top" | "bottom";
}

export function HoverTooltip({ children, content, className = "", placement = "bottom" }: HoverTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipId = useId();
  const placementClass = placement === "top" ? "bottom-[calc(100%+0.75rem)]" : "top-[calc(100%+0.75rem)]";

  return (
    <span
      aria-describedby={isOpen ? tooltipId : undefined}
      className={`relative inline-flex ${className}`}
      onBlur={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {children}
      <AnimatePresence>
        {isOpen ? (
          <motion.span
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className={`pointer-events-none absolute left-1/2 z-40 w-max max-w-[min(19rem,calc(100vw-2rem))] -translate-x-1/2 rounded-lg border border-white/20 bg-[#f2f0f7] px-3 py-2 text-center text-xs font-bold leading-4 text-[#111018] shadow-[0_12px_28px_rgba(0,0,0,0.35)] ${placementClass}`}
            exit={{ opacity: 0, scale: 0.97, y: placement === "top" ? 4 : -4 }}
            id={tooltipId}
            initial={{ opacity: 0, scale: 0.97, y: placement === "top" ? 4 : -4 }}
            role="tooltip"
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
          >
            {content}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </span>
  );
}
