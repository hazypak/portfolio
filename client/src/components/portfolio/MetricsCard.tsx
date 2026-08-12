/**
 * Neural Anchor style: a self-contained SVG keeps the operational card portable
 * across static hosts while preserving the Bklit-inspired visual metric language.
 */
import { Activity, Gauge, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/portfolio/Reveal";
import { SpotlightCard } from "@/components/portfolio/SpotlightCard";

const latencyPoints = [168, 142, 156, 121, 132, 112, 96];
const chartWidth = 640;
const chartHeight = 196;
const chartPadding = 20;
const minLatency = 80;
const maxLatency = 180;

function toPoint(value: number, index: number) {
  const x = chartPadding + (index * (chartWidth - chartPadding * 2)) / (latencyPoints.length - 1);
  const y = chartPadding + ((maxLatency - value) / (maxLatency - minLatency)) * (chartHeight - chartPadding * 2);
  return [x, y] as const;
}

const plottedPoints = latencyPoints.map(toPoint);
const linePath = plottedPoints.map(([x, y], index) => `${index === 0 ? "M" : "L"}${x} ${y}`).join(" ");
const areaPath = `${linePath} L${chartWidth - chartPadding} ${chartHeight - chartPadding} L${chartPadding} ${chartHeight - chartPadding} Z`;

function LatencyChart() {
  return (
    <svg aria-label="LLM inference latency across seven deployment windows" className="h-auto w-full overflow-visible" role="img" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
      <title>LLM inference latency, August 5 through August 11</title>
      <desc>Latency trends downward from 168 milliseconds to 96 milliseconds over seven deployment windows.</desc>
      <defs>
        <linearGradient id="latency-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#8b7cff" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#8b7cff" stopOpacity="0.01" />
        </linearGradient>
      </defs>
      {[48, 92, 136, 176].map((y) => <line key={y} stroke="rgba(255,255,255,0.09)" strokeDasharray="3 6" x1={chartPadding} x2={chartWidth - chartPadding} y1={y} y2={y} />)}
      <path d={areaPath} fill="url(#latency-fill)" />
      <path d={linePath} fill="none" stroke="#c6beff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      {plottedPoints.map(([x, y], index) => <circle key={latencyPoints[index]} cx={x} cy={y} fill="#c6beff" r={index === plottedPoints.length - 1 ? 5 : 3.5} stroke="#07070b" strokeWidth="3" />)}
    </svg>
  );
}

export function MetricsCard() {
  return (
    <Reveal className="md:col-span-12" delay={0.18}>
      <SpotlightCard className="metrics-card min-h-[340px] overflow-hidden p-6 sm:p-8">
        <div aria-hidden="true" className="metrics-orbit" />
        <div className="relative grid gap-8 lg:grid-cols-[minmax(220px,0.8fr)_minmax(0,1.5fr)] lg:items-end">
          <div>
            <p className="eyebrow">Live-style system metrics</p>
            <h3 className="mt-3 text-balance text-3xl font-semibold tracking-[-0.055em] text-white sm:text-4xl">Production signals, not vanity metrics.</h3>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">A dark operational view of inference responsiveness and deployment resilience across the systems in this portfolio.</p>
            <dl className="mt-7 grid grid-cols-2 gap-3">
              <div className="metrics-stat"><dt><ShieldCheck aria-hidden="true" size={15} strokeWidth={1.8} /> Deployment uptime</dt><dd>99.98%</dd></div>
              <div className="metrics-stat"><dt><Gauge aria-hidden="true" size={15} strokeWidth={1.8} /> Latest latency</dt><dd>96 ms</dd></div>
            </dl>
          </div>
          <div className="relative rounded-2xl border border-white/10 bg-[#07070b]/75 p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div><p className="text-sm font-semibold tracking-[-0.025em] text-white">LLM inference latency</p><p className="mt-1 font-mono text-[0.63rem] font-bold tracking-[0.12em] text-[#aaa6c7]">LAST 7 DEPLOYMENT WINDOWS / MS</p></div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-[0.63rem] font-bold tracking-[0.1em] text-emerald-200"><Activity aria-hidden="true" size={13} /> STABLE</span>
            </div>
            <LatencyChart />
            <div className="mt-2 flex justify-between font-mono text-[0.58rem] font-bold tracking-[0.1em] text-slate-500"><span>AUG 05</span><span>AUG 11</span></div>
          </div>
        </div>
      </SpotlightCard>
    </Reveal>
  );
}
