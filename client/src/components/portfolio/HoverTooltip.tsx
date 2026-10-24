/** Small tooltip shown on hover or keyboard focus of its child. */
import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, useId, useState } from "react";

interface HoverTooltipProps {
  children: ReactNode;
  content: string;
  className?: string;
  placement?: "top" | "bottom";
}

export function HoverTooltip({
  children,
  content,
  className = "",
  placement = "bottom",
}: HoverTooltipProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const offset = placement === "top" ? 4 : -4;

  return (
    <span
      aria-describedby={open ? id : undefined}
      className={`relative inline-flex ${className}`}
      onBlur={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
      <AnimatePresence>
        {open ? (
          <motion.span
            animate={{ opacity: 1, y: 0 }}
            className={`pointer-events-none absolute left-1/2 z-40 w-max max-w-[min(18rem,calc(100vw-2rem))] -translate-x-1/2 rounded-md border border-line bg-basalt px-2.5 py-1.5 font-mono text-[0.7rem] text-frost shadow-xl ${placement === "top" ? "bottom-[calc(100%+0.6rem)]" : "top-[calc(100%+0.6rem)]"}`}
            exit={{ opacity: 0, y: offset }}
            id={id}
            initial={{ opacity: 0, y: offset }}
            role="tooltip"
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            {content}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </span>
  );
}
