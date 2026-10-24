/** The Neural Anchor mark, drawn in frost with glacier nodes. */
interface BrandMarkProps {
  className?: string;
  title?: string;
}

export function BrandMark({ className = "", title }: BrandMarkProps) {
  return (
    <svg
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={`shrink-0 ${className}`}
      fill="none"
      role={title ? "img" : undefined}
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M28 104V68a36 36 0 0 1 72 0v36" strokeWidth="8" />
        <path
          d="M40 104V68a24 24 0 0 1 48 0v36"
          stroke="#8FD3CB"
          strokeWidth="6"
        />
        <path
          d="M64 44V16M53 47 35 29M44 57 20 57M75 47 93 29M84 57 108 57M47 48 31 20M81 48 97 20"
          strokeWidth="6"
        />
        <circle cx="64" cy="48" fill="#080B0D" r="12" strokeWidth="7" />
        {[
          [64, 12],
          [31, 27],
          [19, 57],
          [97, 27],
          [109, 57],
          [29, 18],
          [99, 18],
        ].map(([cx, cy]) => (
          <circle
            cx={cx}
            cy={cy}
            fill="#8FD3CB"
            key={`${cx}-${cy}`}
            r="5"
            strokeWidth="5"
          />
        ))}
      </g>
      <path d="M12 105h32M84 105h32" stroke="currentColor" strokeWidth="8" />
    </svg>
  );
}
