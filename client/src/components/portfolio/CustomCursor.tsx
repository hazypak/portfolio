/**
 * Obsidian Signal style: desktop pointers become an inverted signal lens; touch
 * and coarse-pointer devices retain their native cursor and interaction model.
 */
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [isFinePointer, setIsFinePointer] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const smoothX = useSpring(cursorX, { damping: 28, mass: 0.12, stiffness: 560 });
  const smoothY = useSpring(cursorY, { damping: 28, mass: 0.12, stiffness: 560 });

  useEffect(() => {
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateCapability = () => {
      const enabled = pointerQuery.matches;
      setIsFinePointer(enabled);
      document.documentElement.classList.toggle("cursor-active", enabled);
    };
    const updatePosition = (event: PointerEvent) => {
      cursorX.set(event.clientX - 15);
      cursorY.set(event.clientY - 15);
    };

    updateCapability();
    pointerQuery.addEventListener("change", updateCapability);
    window.addEventListener("pointermove", updatePosition, { passive: true });

    return () => {
      pointerQuery.removeEventListener("change", updateCapability);
      window.removeEventListener("pointermove", updatePosition);
      document.documentElement.classList.remove("cursor-active");
    };
  }, [cursorX, cursorY]);

  if (!isFinePointer) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="custom-cursor fixed left-0 top-0 z-[100] h-[30px] w-[30px] rounded-full bg-white pointer-events-none"
      style={{ x: smoothX, y: smoothY }}
    />
  );
}
