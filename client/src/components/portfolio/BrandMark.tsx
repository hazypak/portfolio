/** Obsidian Signal style: the supplied Neural Anchor mark anchors the technical identity. */
interface BrandMarkProps {
  className?: string;
}

export function BrandMark({ className = "" }: BrandMarkProps) {
  return (
    <svg
      aria-label="Neural Anchor logo"
      className={`h-10 w-10 shrink-0 ${className}`}
      fill="none"
      role="img"
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M28 104V68a36 36 0 0 1 72 0v36" strokeWidth="8" />
        <path d="M40 104V68a24 24 0 0 1 48 0v36" stroke="#8B7CFF" strokeWidth="6" />
        <path d="M64 44V16M53 47 35 29M44 57 20 57M75 47 93 29M84 57 108 57M47 48 31 20M81 48 97 20" strokeWidth="6" />
        <circle cx="64" cy="48" fill="#030303" r="12" strokeWidth="7" />
        <circle cx="64" cy="12" fill="#8B7CFF" r="5" strokeWidth="5" />
        <circle cx="31" cy="27" fill="#8B7CFF" r="5" strokeWidth="5" />
        <circle cx="19" cy="57" fill="#8B7CFF" r="5" strokeWidth="5" />
        <circle cx="97" cy="27" fill="#8B7CFF" r="5" strokeWidth="5" />
        <circle cx="109" cy="57" fill="#8B7CFF" r="5" strokeWidth="5" />
        <circle cx="29" cy="18" fill="#8B7CFF" r="5" strokeWidth="5" />
        <circle cx="99" cy="18" fill="#8B7CFF" r="5" strokeWidth="5" />
      </g>
      <path d="M12 105h32M84 105h32" stroke="currentColor" strokeWidth="8" />
    </svg>
  );
}
