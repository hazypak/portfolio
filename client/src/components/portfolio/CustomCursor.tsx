/**
 * Inverted circular cursor for fine pointers. Touch devices and visitors who
 * prefer reduced motion keep their native cursor.
 */
import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

const QUERY =
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, { damping: 30, mass: 0.12, stiffness: 560 });
  const smoothY = useSpring(y, { damping: 30, mass: 0.12, stiffness: 560 });

  useEffect(() => {
    const query = window.matchMedia(QUERY);
    const sync = () => {
      setEnabled(query.matches);
      document.documentElement.classList.toggle("cursor-active", query.matches);
    };
    const move = (event: PointerEvent) => {
      x.set(event.clientX - 12);
      y.set(event.clientY - 12);
    };

    sync();
    query.addEventListener("change", sync);
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      query.removeEventListener("change", sync);
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("cursor-active");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="custom-cursor pointer-events-none fixed left-0 top-0 z-[100] h-6 w-6 rounded-full bg-white"
      style={{ x: smoothX, y: smoothY }}
    />
  );
}
