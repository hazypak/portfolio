/**
 * Obsidian Signal style: a dark frosted panel whose contained signal glow follows
 * the pointer through CSS variables rather than React state updates.
 */
import { type CSSProperties, type PointerEvent, type ReactNode, useRef } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

type SpotlightStyle = CSSProperties & {
  "--mouse-x": string;
  "--mouse-y": string;
};

export function SpotlightCard({ children, className = "" }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  function updateSpotlightPosition(event: PointerEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card || event.pointerType === "touch") return;

    const bounds = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${event.clientX - bounds.left}px`);
    card.style.setProperty("--mouse-y", `${event.clientY - bounds.top}px`);
  }

  const style: SpotlightStyle = { "--mouse-x": "50%", "--mouse-y": "50%" };

  return (
    <div
      ref={cardRef}
      className={`spotlight-card glass-card relative overflow-hidden ${className}`}
      onPointerMove={updateSpotlightPosition}
      style={style}
    >
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
