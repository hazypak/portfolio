/** SVG drawings for each plate of the exploded AI system (360×360 space). */
import type { FocusEvent, PointerEvent } from "react";
import { PLATE, type NodeSpec } from "@/data/neural-specs";

type Point = readonly [number, number];

function ring(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  n: number,
  from = 0,
  to = Math.PI * 2
): Point[] {
  const closed = to - from >= Math.PI * 2 - 1e-6;
  return Array.from({ length: n }, (_, i) => {
    const a = from + ((to - from) * i) / (closed ? n : n - 1);
    return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)] as const;
  });
}

// Stylised facial landmarks: jaw/outline, brows, eyes, nose, mouth, cheeks.
const facePoints: Point[] = [
  ...ring(180, 185, 112, 148, 26),
  ...ring(138, 140, 30, 10, 5, Math.PI * 1.1, Math.PI * 1.9),
  ...ring(222, 140, 30, 10, 5, Math.PI * 1.1, Math.PI * 1.9),
  ...ring(138, 160, 24, 10, 8),
  ...ring(222, 160, 24, 10, 8),
  [138, 160],
  [222, 160],
  [180, 168],
  [180, 190],
  [180, 212],
  [180, 234],
  [164, 244],
  [196, 244],
  ...ring(180, 272, 42, 13, 10),
  [118, 220],
  [242, 220],
  [150, 110],
  [210, 110],
  [180, 92],
];

// Connect each point to its two nearest neighbours to form the mesh.
const faceEdges: [Point, Point][] = (() => {
  const seen = new Set<string>();
  const edges: [Point, Point][] = [];
  facePoints.forEach((p, i) => {
    facePoints
      .map((q, j) => ({ j, d: Math.hypot(p[0] - q[0], p[1] - q[1]) }))
      .filter(({ j }) => j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 3)
      .forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!seen.has(key)) {
          seen.add(key);
          edges.push([p, facePoints[j]]);
        }
      });
  });
  return edges;
})();

export function FaceSvg() {
  return (
    <svg
      aria-hidden="true"
      height={PLATE}
      viewBox={`0 0 ${PLATE} ${PLATE}`}
      width={PLATE}
    >
      <defs>
        <radialGradient cx="50%" cy="45%" id="face-glow" r="55%">
          <stop offset="0" stopColor="#40e0f0" stopOpacity="0.18" />
          <stop offset="1" stopColor="#40e0f0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="180" cy="185" fill="url(#face-glow)" rx="140" ry="170" />
      <g stroke="#40e0f0" strokeOpacity="0.28" strokeWidth="0.8">
        {faceEdges.map(([a, b]) => (
          <line
            key={`${a[0]},${a[1]}-${b[0]},${b[1]}`}
            x1={a[0]}
            x2={b[0]}
            y1={a[1]}
            y2={b[1]}
          />
        ))}
      </g>
      <g fill="#9ff3fb">
        {facePoints.map(([x, y]) => (
          <circle className="lm-dot" cx={x} cy={y} key={`${x},${y}`} r="2.2" />
        ))}
      </g>
      <text
        fill="#8a97a8"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="10"
        letterSpacing="2"
        x="20"
        y="340"
      >
        LANDMARKS · 68 PTS
      </text>
    </svg>
  );
}

// Deterministic attention pattern: strong diagonal with a few long-range hits.
const attention = Array.from({ length: 64 }, (_, k) => {
  const i = Math.floor(k / 8);
  const j = k % 8;
  if (j > i) return 0.04;
  const base =
    i === j ? 0.95 : 0.15 + 0.5 * Math.abs(Math.sin(i * 3.1 + j * 1.7));
  return Math.min(1, base);
});

export function MatrixSvg() {
  const cell = 24;
  const ox = 24;
  const oy = 54;
  return (
    <svg
      aria-hidden="true"
      height={PLATE}
      viewBox={`0 0 ${PLATE} ${PLATE}`}
      width={PLATE}
    >
      <text
        fill="#c4b5fd"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="10"
        letterSpacing="2"
        x="24"
        y="34"
      >
        MULTI-HEAD ATTENTION
      </text>
      {attention.map((v, k) => (
        <rect
          fill={v > 0.6 ? "#40e0f0" : "#a78bfa"}
          fillOpacity={v}
          height={cell - 3}
          key={k}
          rx="3"
          width={cell - 3}
          x={ox + (k % 8) * cell}
          y={oy + Math.floor(k / 8) * cell}
        />
      ))}
      {(["Q", "K", "V"] as const).map((label, i) => (
        <g key={label}>
          <rect
            fill="#a78bfa"
            fillOpacity="0.12"
            height="40"
            rx="6"
            stroke="#a78bfa"
            strokeOpacity="0.6"
            width="76"
            x="252"
            y={62 + i * 58}
          />
          <text
            fill="#e8f0f4"
            fontFamily="IBM Plex Mono, monospace"
            fontSize="13"
            textAnchor="middle"
            x="290"
            y={87 + i * 58}
          >
            W_{label}
          </text>
          <path
            d={`M252 ${82 + i * 58} C 236 ${82 + i * 58}, 236 ${150}, 222 150`}
            fill="none"
            stroke="#40e0f0"
            strokeDasharray="3 4"
            strokeOpacity="0.55"
          />
        </g>
      ))}
      <g
        fontFamily="IBM Plex Mono, monospace"
        fontSize="10.5"
        textAnchor="middle"
      >
        {[
          ["QKᵀ/√d", 74],
          ["softmax", 180],
          ["· V", 286],
        ].map(([label, x]) => (
          <g key={label}>
            <rect
              fill="#05070b"
              height="30"
              rx="15"
              stroke="#40e0f0"
              strokeOpacity="0.5"
              width="84"
              x={Number(x) - 42}
              y="297"
            />
            <text fill="#9ff3fb" x={x} y="316">
              {label}
            </text>
          </g>
        ))}
        <path
          d="M116 312 H138 M222 312 H244"
          stroke="#40e0f0"
          strokeOpacity="0.7"
        />
      </g>
    </svg>
  );
}

const sparkline = [12, 18, 15, 24, 22, 30, 27, 34, 31, 38, 36, 41]
  .map((v, i) => `${120 + i * 11},${336 - v}`)
  .join(" ");

/** Router, wiring and telemetry; tiles and KV bars are separate animated elements. */
export function ComputeSvg() {
  const tileCenters: Point[] = [
    [68, 68],
    [292, 68],
    [68, 292],
    [292, 292],
  ];
  return (
    <svg
      aria-hidden="true"
      height={PLATE}
      viewBox={`0 0 ${PLATE} ${PLATE}`}
      width={PLATE}
    >
      <g stroke="#40e0f0" strokeOpacity="0.4">
        {tileCenters.map(([x, y]) => (
          <path
            d={`M180 180 L${x} ${y}`}
            key={`${x}-${y}`}
            strokeDasharray="4 5"
          />
        ))}
      </g>
      <circle
        cx="180"
        cy="180"
        fill="#05070b"
        r="34"
        stroke="#40e0f0"
        strokeWidth="1.5"
      />
      <circle cx="180" cy="180" fill="#40e0f0" fillOpacity="0.15" r="22" />
      <text
        fill="#e8f0f4"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="9"
        textAnchor="middle"
        x="180"
        y="183"
      >
        ROUTER
      </text>
      <polyline
        fill="none"
        points={sparkline}
        stroke="#5fd39a"
        strokeWidth="1.5"
      />
      <text
        fill="#8a97a8"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="9"
        x="120"
        y="350"
      >
        TOK/S · LATENCY · MEM
      </text>
    </svg>
  );
}

export function TileChip({ index }: { index: number }) {
  return (
    <svg aria-hidden="true" height="80" viewBox="0 0 80 80" width="80">
      <rect
        fill="#0b0f17"
        height="56"
        rx="8"
        stroke="#a78bfa"
        strokeOpacity="0.8"
        width="56"
        x="12"
        y="12"
      />
      <rect
        fill="#a78bfa"
        fillOpacity="0.18"
        height="28"
        rx="4"
        width="28"
        x="26"
        y="26"
      />
      <g stroke="#a78bfa" strokeOpacity="0.6">
        {[22, 34, 46, 58].map(p => (
          <path d={`M${p} 4V12M${p} 68V76M4 ${p}H12M68 ${p}H76`} key={p} />
        ))}
      </g>
      <text
        fill="#e8f0f4"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="9"
        textAnchor="middle"
        x="40"
        y="44"
      >
        TU{index}
      </text>
    </svg>
  );
}

export interface HotspotHandlers {
  onShow: (spec: NodeSpec, el: HTMLElement) => void;
  onHide: () => void;
}

export function Hotspot({
  spec,
  onShow,
  onHide,
}: { spec: NodeSpec } & HotspotHandlers) {
  const show = (
    event: PointerEvent<HTMLButtonElement> | FocusEvent<HTMLButtonElement>
  ) => onShow(spec, event.currentTarget);
  return (
    <button
      aria-label={`Inspect ${spec.title}`}
      className="node-hit absolute grid h-6 w-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
      onBlur={onHide}
      onFocus={show}
      onPointerEnter={show}
      onPointerLeave={onHide}
      style={{ left: spec.x, top: spec.y }}
      type="button"
    >
      <span className="absolute inset-0 rounded-full border border-glacier/70 shadow-[0_0_14px_rgba(64,224,240,0.7)]" />
      <span className="h-1.5 w-1.5 rounded-full bg-glacier" />
    </button>
  );
}
