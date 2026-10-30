/**
 * Canvas node network for the hero: drifting nodes, links between near
 * neighbours, and a gentle pull toward the pointer. Pauses off-screen and in
 * hidden tabs; draws a single still frame under reduced motion.
 */
import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  violet: boolean;
}

const LINK_DISTANCE = 140;
const LINK_DISTANCE_SQ = LINK_DISTANCE * LINK_DISTANCE;
const LINK_BUCKETS = 4;

export function ParticleField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const pointer = { x: -9999, y: -9999 };
    let nodes: Node[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = canvas!.clientWidth;
      height = canvas!.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(70, (width * height) / 18000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
        violet: Math.random() < 0.3,
      }));
    }

    // Links are bucketed by opacity so each frame strokes a handful of paths
    // instead of one per pair, and squared distances skip the sqrt for pairs
    // that are too far apart. Canvas shadowBlur is avoided: it is rasterised
    // on the CPU and was the most expensive part of every frame.
    const buckets: Path2D[] = [];
    function draw() {
      const c = ctx!;
      c.clearRect(0, 0, width, height);
      for (let k = 0; k < LINK_BUCKETS; k++) buckets[k] = new Path2D();
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 >= LINK_DISTANCE_SQ) continue;
          const strength = 1 - Math.sqrt(d2) / LINK_DISTANCE;
          const k = Math.min(
            LINK_BUCKETS - 1,
            Math.floor(strength * LINK_BUCKETS)
          );
          buckets[k].moveTo(a.x, a.y);
          buckets[k].lineTo(b.x, b.y);
        }
      }
      c.lineWidth = 1;
      for (let k = 0; k < LINK_BUCKETS; k++) {
        c.strokeStyle = `rgb(${colorA} / ${(0.16 * (k + 0.5)) / LINK_BUCKETS})`;
        c.stroke(buckets[k]);
      }

      for (const n of nodes) {
        const dx = n.x - pointer.x;
        const dy = n.y - pointer.y;
        const near = dx * dx + dy * dy < 160 * 160;
        const rgb = n.violet ? colorB : colorA;
        if (near) {
          // A cheap halo in place of shadowBlur.
          c.fillStyle = `rgb(${rgb} / 0.18)`;
          c.beginPath();
          c.arc(n.x, n.y, n.r * 4.5, 0, Math.PI * 2);
          c.fill();
        }
        c.fillStyle = `rgb(${rgb} / ${n.violet ? 0.9 : 0.85})`;
        c.beginPath();
        c.arc(n.x, n.y, near ? n.r * 1.8 : n.r, 0, Math.PI * 2);
        c.fill();
      }
    }

    function step() {
      for (const n of nodes) {
        const dx = pointer.x - n.x;
        const dy = pointer.y - n.y;
        const d = Math.hypot(dx, dy);
        if (d < 200 && d > 1) {
          n.vx += (dx / d) * 0.012;
          n.vy += (dy / d) * 0.012;
        }
        n.vx *= 0.985;
        n.vy *= 0.985;
        n.x += n.vx + (Math.random() - 0.5) * 0.05;
        n.y += n.vy + (Math.random() - 0.5) * 0.05;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        n.x = Math.max(0, Math.min(width, n.x));
        n.y = Math.max(0, Math.min(height, n.y));
      }
      draw();
      frame = requestAnimationFrame(loop);
    }

    function loop() {
      if (visible && !document.hidden) step();
      else frame = 0;
    }

    function start() {
      if (!reduceMotion && !frame && visible && !document.hidden) {
        frame = requestAnimationFrame(loop);
      }
    }

    const onPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    // Node colours come from CSS (--particle-a/b) so they follow the theme.
    let colorA = "64 224 240";
    let colorB = "167 139 250";
    const readColors = () => {
      const style = getComputedStyle(document.documentElement);
      colorA = style.getPropertyValue("--particle-a").trim() || colorA;
      colorB = style.getPropertyValue("--particle-b").trim() || colorB;
      draw();
    };
    readColors();
    window.addEventListener("themechange", readColors);

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw();
    });

    resize();
    draw();
    observer.observe(canvas);
    resizeObserver.observe(canvas);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", start);
    start();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("themechange", readColors);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", start);
    };
  }, []);

  return (
    <canvas
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      ref={canvasRef}
    />
  );
}
