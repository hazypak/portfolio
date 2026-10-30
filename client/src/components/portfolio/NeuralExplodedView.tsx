/**
 * Scroll-driven exploded view of an AI system, choreographed with anime.js.
 *
 * anime.js animates plain state objects on one paused timeline; scroll
 * position (eased toward its target) seeks that timeline, and `render` turns
 * the state into 3D transforms. Owning the transform strings keeps the
 * composition order (translate → rotate → scale) predictable.
 */
import { animate, createTimeline, stagger } from "animejs";
import { useEffect, useRef, useState } from "react";
import {
  ComputeSvg,
  FaceSvg,
  Hotspot,
  MatrixSvg,
  TileChip,
  type HotspotHandlers,
} from "@/components/portfolio/NeuralLayers";
import {
  PLATE,
  nodeSpecs,
  stages,
  type LayerId,
  type NodeSpec,
} from "@/data/neural-specs";

const HALF = PLATE / 2;
const TILE_BASES = [
  [28, 28],
  [252, 28],
  [28, 252],
  [252, 252],
] as const;
const TILE_SPREAD = [
  [-95, -95],
  [95, -95],
  [-95, 95],
  [95, 95],
] as const;
const KV_BARS = [0.55, 0.8, 1, 0.7, 0.9];

type Tip = { spec: NodeSpec; x: number; y: number } | null;

function specsFor(layer: LayerId) {
  return nodeSpecs.filter(spec => spec.layer === layer);
}

export default function NeuralExplodedView() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const faceLRef = useRef<HTMLDivElement>(null);
  const faceRRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);
  const computeRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const kvRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);
  const [stage, setStage] = useState(1);
  const [tip, setTip] = useState<Tip>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stageEl = stageRef.current;
    if (!section || !stageEl) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // State objects anime.js tweens.
    const world = { rx: 0, rz: 0 };
    const faceL = { x: 0, z: 0, ry: 0, opacity: 1 };
    const faceR = { x: 0, z: 0, ry: 0, opacity: 1 };
    const matrix = { z: -60, scale: 0.86, opacity: 0 };
    const compute = { z: -120, opacity: 0 };
    const tiles = TILE_BASES.map(() => ({ x: 0, y: 0, z: 0 }));
    const kv = { h: 0.25 };
    let scale = 1;

    const place = (
      el: HTMLElement | null,
      transform: string,
      opacity?: number
    ) => {
      if (!el) return;
      el.style.transform = transform;
      if (opacity !== undefined) {
        el.style.opacity = String(opacity);
        el.style.pointerEvents = opacity > 0.45 ? "auto" : "none";
      }
    };

    function render() {
      place(
        worldRef.current,
        `scale(${scale}) rotateX(${world.rx}deg) rotateZ(${world.rz}deg)`
      );
      place(
        faceLRef.current,
        `translate3d(${-HALF + faceL.x}px, ${-HALF}px, ${faceL.z}px) rotateY(${faceL.ry}deg)`,
        faceL.opacity
      );
      place(
        faceRRef.current,
        `translate3d(${faceR.x}px, ${-HALF}px, ${faceR.z}px) rotateY(${faceR.ry}deg)`,
        faceR.opacity
      );
      place(
        matrixRef.current,
        `translate3d(${-HALF}px, ${-HALF}px, ${matrix.z}px) scale(${matrix.scale})`,
        matrix.opacity
      );
      place(
        computeRef.current,
        `translate3d(${-HALF}px, ${-HALF}px, ${compute.z}px)`,
        compute.opacity
      );
      tiles.forEach((t, i) =>
        place(tileRefs.current[i], `translate3d(${t.x}px, ${t.y}px, ${t.z}px)`)
      );
      kvRefs.current.forEach((bar, i) =>
        place(bar, `scaleY(${Math.min(1, kv.h * KV_BARS[i])})`)
      );
    }

    // Timeline in ms-like units: 0–400 hold on the face, 400–1400 split,
    // 1400–2400 separate the layers, 2400–3000 explode the compute core.
    const tl = createTimeline({
      autoplay: false,
      defaults: { ease: "inOutQuad" },
      onUpdate: render,
    })
      .add(world, { rx: 56, rz: -34, duration: 1000 }, 400)
      .add(faceL, { x: -150, z: 110, ry: -16, duration: 1000 }, 400)
      .add(faceR, { x: 150, z: 110, ry: 16, duration: 1000 }, 400)
      .add(matrix, { opacity: 1, scale: 1, z: 0, duration: 900 }, 550)
      .add([faceL, faceR], { z: 280, opacity: 0.2, duration: 1000 }, 1400)
      .add(matrix, { z: 140, duration: 1000 }, 1400)
      .add(compute, { opacity: 1, z: -100, duration: 1000 }, 1400)
      .add(
        tiles,
        {
          x: (_?: unknown, i = 0) => TILE_SPREAD[i][0],
          y: (_?: unknown, i = 0) => TILE_SPREAD[i][1],
          z: 70,
          duration: 600,
          ease: "outBack",
        },
        stagger(70, { start: 2400 })
      )
      .add(kv, { h: 1, duration: 600, ease: "outQuad" }, 2400)
      .add(world, { rz: -46, duration: 600 }, 2400);

    // Ambient pulse on the landmark dots; skipped under reduced motion.
    const pulse = reduceMotion
      ? null
      : animate(Array.from(section.querySelectorAll<SVGElement>(".lm-dot")), {
          opacity: [0.35, 1],
          duration: 1400,
          delay: stagger(45, { from: "random" }),
          loop: true,
          alternate: true,
          ease: "inOutSine",
          autoplay: false,
        });
    // The pulse writes to 68 dots every frame, so it only runs on screen.
    const pulseObserver = pulse
      ? new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) pulse.play();
          else pulse.pause();
        })
      : null;
    pulseObserver?.observe(section);

    let target = 0;
    let current = 0;
    let frame = 0;
    let lastStage = 1;
    // While the slider is being dragged, scroll follows it, not the reverse.
    let dragging = false;
    const slider = sliderRef.current;
    const startDrag = () => {
      dragging = true;
    };
    const endDrag = () => {
      dragging = false;
    };
    slider?.addEventListener("pointerdown", startDrag);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);

    const progress = () => {
      const rect = section.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      return travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0;
    };

    function apply(p: number) {
      tl.seek(p * tl.duration);
      render();
      if (progressRef.current)
        progressRef.current.style.transform = `scaleX(${p})`;
      if (sliderRef.current && !dragging) {
        sliderRef.current.value = String(Math.round(p * 100));
      }
      const next = p < 0.3 ? 1 : p < 0.72 ? 2 : 3;
      if (next !== lastStage) {
        lastStage = next;
        setStage(next);
        setTip(null);
      }
    }

    function tick() {
      current += (target - current) * 0.14;
      if (Math.abs(target - current) < 0.0005) current = target;
      apply(current);
      frame = current === target ? 0 : requestAnimationFrame(tick);
    }

    function onScroll() {
      target = progress();
      if (reduceMotion) {
        current = target;
        apply(current);
      } else if (!frame) {
        frame = requestAnimationFrame(tick);
      }
    }

    function fit() {
      // Sized for the fully exploded state, which is the widest and tallest.
      scale = Math.min(
        1,
        stageEl!.clientWidth / 680,
        stageEl!.clientHeight / 700
      );
      render();
    }

    const resizeObserver = new ResizeObserver(fit);
    resizeObserver.observe(stageEl);
    window.addEventListener("scroll", onScroll, { passive: true });
    fit();
    target = current = progress();
    apply(current);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      slider?.removeEventListener("pointerdown", startDrag);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
      tl.pause();
      pulseObserver?.disconnect();
      pulse?.revert();
    };
  }, []);

  const scrollToProgress = (p: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const travel = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + travel * p, behavior: "auto" });
  };

  const handlers: HotspotHandlers = {
    onShow: (spec, el) => {
      const rect = el.getBoundingClientRect();
      setTip({ spec, x: rect.right + 12, y: rect.top + rect.height / 2 });
    },
    onHide: () => setTip(null),
  };

  const active = stages[stage - 1];

  return (
    <section
      aria-labelledby="system-heading"
      className="relative h-[280vh] bg-ink sm:h-[320vh]"
      id="system"
      ref={sectionRef}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden px-5 pb-6 pt-20 sm:px-8 lg:px-12">
        <div
          aria-hidden="true"
          className="hero-grid absolute inset-0 -z-10 opacity-60"
        />
        <div
          aria-hidden="true"
          className="glow glow-violet left-1/2 top-1/3 -z-10 h-[26rem] w-[26rem] -translate-x-1/2"
        />

        <div className="mx-auto grid w-full max-w-[1440px] gap-4 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="eyebrow">
              Inside an AI system · scroll to disassemble
            </p>
            <h2 className="section-title mt-3 text-balance" id="system-heading">
              <span className="gradient-text">Pull the network apart</span>
            </h2>
          </div>
          <div aria-live="polite" className="md:col-span-6 md:col-start-7">
            <p className="font-mono text-xs text-glacier">
              Stage {active.id} / 3 · {active.name}
            </p>
            <p className="mt-2 text-lg font-semibold [font-stretch:108%]">
              {active.title}
            </p>
            <p className="mt-1 max-w-lg text-sm leading-relaxed text-mist">
              {active.body}
            </p>
          </div>
        </div>

        <div
          className="scene relative mx-auto mt-2 w-full max-w-[1440px] flex-1"
          ref={stageRef}
        >
          <div
            className="scene-world absolute left-1/2 top-1/2 h-0 w-0"
            ref={worldRef}
          >
            <div
              className="scene-layer"
              ref={computeRef}
              style={{ width: PLATE, height: PLATE }}
            >
              <div className="layer-plate relative h-full w-full">
                <ComputeSvg />
                <div className="absolute left-[140px] top-[40px] flex h-[68px] items-end gap-1.5">
                  {KV_BARS.map((_, i) => (
                    <div
                      className="h-full w-2.5 origin-bottom rounded-sm bg-gradient-to-t from-violet to-glacier"
                      key={i}
                      ref={el => {
                        kvRefs.current[i] = el;
                      }}
                    />
                  ))}
                </div>
                {[
                  ...specsFor("router"),
                  ...specsFor("kv"),
                  ...specsFor("telemetry"),
                ].map(spec => (
                  <Hotspot key={spec.id} spec={spec} {...handlers} />
                ))}
              </div>
              {TILE_BASES.map(([left, top], i) => (
                <div
                  className="layer-plate layer-plate--violet absolute h-20 w-20"
                  key={i}
                  ref={el => {
                    tileRefs.current[i] = el;
                  }}
                  style={{ left, top }}
                >
                  <TileChip index={i} />
                  {specsFor(`tile${i as 0 | 1 | 2 | 3}`).map(spec => (
                    <Hotspot key={spec.id} spec={spec} {...handlers} />
                  ))}
                </div>
              ))}
            </div>

            <div
              className="scene-layer"
              ref={matrixRef}
              style={{ width: PLATE, height: PLATE }}
            >
              <div className="layer-plate layer-plate--violet relative h-full w-full">
                <MatrixSvg />
                {specsFor("matrix").map(spec => (
                  <Hotspot key={spec.id} spec={spec} {...handlers} />
                ))}
              </div>
            </div>

            <div
              className="scene-layer origin-right"
              ref={faceLRef}
              style={{ width: HALF, height: PLATE }}
            >
              <div className="layer-plate relative h-full w-full overflow-hidden rounded-r-none border-r-0">
                <FaceSvg />
                {specsFor("faceL").map(spec => (
                  <Hotspot key={spec.id} spec={spec} {...handlers} />
                ))}
              </div>
            </div>
            <div
              className="scene-layer origin-left"
              ref={faceRRef}
              style={{ width: HALF, height: PLATE }}
            >
              <div className="layer-plate relative h-full w-full overflow-hidden rounded-l-none border-l-0">
                <div className="absolute top-0" style={{ left: -HALF }}>
                  <FaceSvg />
                </div>
                {specsFor("faceR").map(spec => (
                  <Hotspot key={spec.id} spec={spec} {...handlers} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center gap-3 sm:gap-5">
          <div className="flex gap-2" role="group" aria-label="Jump to stage">
            {stages.map((s, i) => (
              <button
                aria-pressed={stage === s.id}
                className={`rounded-full border px-3 py-1.5 font-mono text-[0.7rem] transition-colors ${stage === s.id ? "border-glacier/70 bg-glacier/10 text-glacier shadow-[0_0_16px_rgba(64,224,240,0.25)]" : "border-line text-mist hover:text-frost"}`}
                key={s.id}
                onClick={() => scrollToProgress([0, 0.5, 1][i])}
                type="button"
              >
                {s.id} · {s.name}
              </button>
            ))}
          </div>
          <label className="flex min-w-[10rem] flex-1 items-center gap-3">
            <span className="sr-only">Disassembly progress</span>
            <input
              className="w-full accent-glacier"
              defaultValue={0}
              max={100}
              min={0}
              onInput={event =>
                scrollToProgress(Number(event.currentTarget.value) / 100)
              }
              ref={sliderRef}
              type="range"
            />
          </label>
          <div
            aria-hidden="true"
            className="hidden h-px w-24 overflow-hidden bg-line sm:block"
          >
            <div
              className="h-full origin-left bg-gradient-to-r from-glacier to-violet"
              ref={progressRef}
              style={{ transform: "scaleX(0)" }}
            />
          </div>
          <p className="w-full font-mono text-[0.65rem] text-mist sm:w-auto">
            Illustrative architecture · hover a glowing node to inspect it
          </p>
        </div>

        {tip ? (
          <div
            className="glass pointer-events-none fixed z-50 w-64 bg-basalt/95 p-4 text-sm shadow-[0_0_30px_rgba(64,224,240,0.2)]"
            role="tooltip"
            style={{
              left: Math.min(tip.x, window.innerWidth - 272),
              top: Math.max(12, Math.min(tip.y - 40, window.innerHeight - 170)),
            }}
          >
            <p className="font-semibold text-frost">{tip.spec.title}</p>
            <dl className="mt-2 space-y-1">
              {tip.spec.rows.map(([k, v]) => (
                <div
                  className="grid grid-cols-[5.5rem_1fr] gap-2 font-mono text-[0.72rem]"
                  key={k}
                >
                  <dt className="text-mist">{k}</dt>
                  <dd className="text-glacier">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}
      </div>
    </section>
  );
}
