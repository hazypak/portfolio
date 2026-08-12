/**
 * Self-contained portfolio visuals: these modules intentionally avoid generated
 * component trees so the static site remains portable across Git and Vercel.
 */
import { Bot, Braces, CloudCog, Database, Smartphone } from "lucide-react";
import { useState } from "react";

const agents = [
  { label: "ROUTER", icon: Braces, x: "18%", y: "24%" },
  { label: "RETRIEVAL", icon: Database, x: "75%", y: "20%" },
  { label: "DEPLOY", icon: CloudCog, x: "82%", y: "71%" },
  { label: "VERIFY", icon: Bot, x: "23%", y: "76%" },
] as const;

const mobileProducts = [
  { title: "Pixel Planet Healers", kind: "Interactive wellness world", accent: "#8b7cff", summary: "A playful system for restoring focus through small digital rituals." },
  { title: "Chassis Decoder", kind: "Vehicle intelligence tool", accent: "#64d7ff", summary: "Structured vehicle insights, translated into a compact mobile workflow." },
  { title: "GHM Networks", kind: "Service platform", accent: "#b9ffb2", summary: "A clear operations surface for a growing digital services practice." },
] as const;

export function AgentEcosystem() {
  return (
    <section aria-labelledby="agent-ecosystem-title" className="relative min-h-[360px] overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#08080d] p-6 sm:p-8">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_47%,rgba(139,124,255,0.17),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:auto,28px_28px]" />
      <div className="relative flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="eyebrow">Autonomous agent ecosystem</p>
          <h3 className="mt-3 text-balance text-3xl font-semibold tracking-[-0.055em] text-white sm:text-4xl" id="agent-ecosystem-title">Many small agents. One clear system.</h3>
        </div>
        <span className="rounded-full border border-[#8b7cff]/30 bg-[#8b7cff]/10 px-3 py-1.5 font-mono text-[0.62rem] font-bold tracking-[0.13em] text-[#d7d1ff]">4 NODES / SYNCHRONIZED</span>
      </div>
      <div aria-label="Agent system diagram" className="relative mx-auto mt-6 h-52 max-w-2xl sm:h-60">
        <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#bdb3ff]/50 bg-[#8b7cff]/10 shadow-[0_0_65px_rgba(139,124,255,0.34)]" />
        <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8b7cff]/20" />
        <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-px w-[68%] -translate-x-1/2 -translate-y-1/2 rotate-[31deg] bg-gradient-to-r from-transparent via-[#8b7cff]/55 to-transparent" />
        <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-px w-[68%] -translate-x-1/2 -translate-y-1/2 -rotate-[31deg] bg-gradient-to-r from-transparent via-[#8b7cff]/55 to-transparent" />
        <div className="absolute left-1/2 top-1/2 z-10 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#d7d1ff]/60 bg-[#11111a] text-center shadow-[0_0_40px_rgba(139,124,255,0.26)]"><Bot aria-hidden="true" size={25} className="text-[#d7d1ff]" /><span className="font-mono text-[0.48rem] font-bold tracking-[0.14em] text-slate-300">ORCHESTRATOR</span></div>
        {agents.map(({ label, icon: Icon, x, y }) => <div className="absolute -translate-x-1/2 -translate-y-1/2" key={label} style={{ left: x, top: y }}><div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/12 bg-[#11111a]/90 text-[#c8c0ff] shadow-lg"><Icon aria-hidden="true" size={20} /></div><span className="mt-2 block text-center font-mono text-[0.48rem] font-bold tracking-[0.1em] text-slate-400">{label}</span></div>)}
      </div>
    </section>
  );
}

export function MobileProductShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = mobileProducts[activeIndex];

  return (
    <section aria-labelledby="mobile-showcase-title" className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-gradient-to-br from-[#0d0c14] to-[#060609] p-6 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(260px,0.7fr)] lg:items-center">
        <div>
          <p className="eyebrow">Products fit in a pocket</p>
          <h3 className="mt-3 text-balance text-3xl font-semibold tracking-[-0.055em] text-white sm:text-4xl" id="mobile-showcase-title">Compact interfaces for real-world systems.</h3>
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300">A self-contained product showcase for the client and experimental systems represented in this portfolio.</p>
          <div className="mt-7 flex flex-wrap gap-2" role="tablist" aria-label="Mobile products">
            {mobileProducts.map((product, index) => <button aria-controls="mobile-product-panel" aria-selected={activeIndex === index} className={`rounded-full border px-3 py-2 text-left font-mono text-[0.62rem] font-bold tracking-[0.08em] transition ${activeIndex === index ? "border-[#bdb3ff]/60 bg-[#8b7cff]/15 text-white" : "border-white/10 text-slate-400 hover:border-white/25 hover:text-white"}`} key={product.title} onClick={() => setActiveIndex(index)} role="tab" type="button">{String(index + 1).padStart(2, "0")}</button>)}
          </div>
        </div>
        <div className="mx-auto w-full max-w-[290px]" id="mobile-product-panel" role="tabpanel">
          <div className="relative rounded-[2.2rem] border-[7px] border-[#252430] bg-[#07070b] p-3 shadow-[0_22px_55px_rgba(0,0,0,0.45)]">
            <div className="mx-auto h-4 w-24 rounded-full bg-[#252430]" />
            <div className="mt-4 min-h-[350px] rounded-[1.45rem] border border-white/10 p-5" style={{ background: `radial-gradient(circle at 77% 22%, ${active.accent}33, transparent 31%), linear-gradient(145deg, #12111b, #08080d)` }}>
              <Smartphone aria-hidden="true" className="text-white/80" size={22} />
              <p className="mt-10 font-mono text-[0.58rem] font-bold tracking-[0.15em] text-slate-400">{active.kind.toUpperCase()}</p>
              <h4 className="mt-3 text-3xl font-semibold tracking-[-0.055em] text-white">{active.title}</h4>
              <p className="mt-4 text-sm leading-6 text-slate-300">{active.summary}</p>
              <div className="mt-10 h-1.5 rounded-full bg-white/10"><div className="h-full rounded-full" style={{ background: active.accent, width: `${62 + activeIndex * 14}%` }} /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
