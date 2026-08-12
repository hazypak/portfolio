/**
 * Obsidian Signal style: asymmetric, data-driven Bento clusters organize work
 * by discipline while sparse metadata and glass depth preserve clarity.
 */
import {
  ArrowUpRight,
  BrainCircuit,
  BriefcaseBusiness,
  Cloud,
  Server,
  ShoppingCart,
  Sprout,
  Video,
} from "lucide-react";
import { lazy, Suspense } from "react";
import type { ProjectGroup, ProjectGroupId, ProjectIcon, PortfolioProject } from "@/data/portfolio";
import { Reveal } from "@/components/portfolio/Reveal";
import { SpotlightCard } from "@/components/portfolio/SpotlightCard";

// Performance: visual modules begin below the fold, so they load on demand without changing their rendered interface.
const MetricsCard = lazy(() => import("@/components/portfolio/MetricsCard").then((module) => ({ default: module.MetricsCard })));
const AgentEcosystem = lazy(() => import("@/components/portfolio/SystemsVisuals").then((module) => ({ default: module.AgentEcosystem })));
const MobileProductShowcase = lazy(() => import("@/components/portfolio/SystemsVisuals").then((module) => ({ default: module.MobileProductShowcase })));

function VisualModuleFallback() {
  return <div aria-label="Loading visual system module" className="min-h-[220px] animate-pulse rounded-[1.35rem] border border-white/8 bg-white/[0.02]" role="status" />;
}

const iconMap = {
  agents: BrainCircuit,
  cloud: Cloud,
  content: Video,
  client: BriefcaseBusiness,
  commerce: ShoppingCart,
  game: Sprout,
  server: Server,
} satisfies Record<ProjectIcon, typeof BrainCircuit>;

const layoutMap: Record<ProjectGroupId, readonly string[]> = {
  "ai-cloud": ["md:col-span-8 md:min-h-[440px]", "md:col-span-4 md:min-h-[440px]", "md:col-span-12 md:min-h-[210px]"],
  "client-work": ["md:col-span-8 md:min-h-[380px]", "md:col-span-4 md:min-h-[380px]"],
  products: ["md:col-span-8 md:min-h-[380px]", "md:col-span-4 md:min-h-[380px]"],
};

const artifactMap: Record<ProjectIcon, { label: string; detail: string }> = {
  agents: { label: "AGENT ROUTING", detail: "03 NODES / DECISION GRAPH" },
  cloud: { label: "RELEASE TOPOLOGY", detail: "CLOUD REGION / BUILD TRACE" },
  content: { label: "PIPELINE CADENCE", detail: "QUEUE / SCHEDULE / OUTPUT" },
  client: { label: "DELIVERY MAP", detail: "DISCOVERY / BUILD / HANDOFF" },
  commerce: { label: "COMMERCE FLOW", detail: "CATALOG / CART / PAYMENT" },
  game: { label: "WORLD SIGNALS", detail: "CLIMATE / PLAY / FEEDBACK" },
  server: { label: "NODE LATTICE", detail: "INSTANCE / ROUTE / HEALTH" },
};

interface ProjectBentoSectionProps {
  group: ProjectGroup;
  isFirst?: boolean;
}

function ProjectCard({ project, className, isFlagship }: { project: PortfolioProject; className: string; isFlagship: boolean }) {
  const Icon = iconMap[project.icon];
  const artifact = artifactMap[project.icon];
  const hasLink = Boolean(project.href);

  return (
    <SpotlightCard className={`min-h-[300px] p-6 sm:p-8 ${className}`}>
      {project.image ? (
        <>
          <img
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35 mix-blend-screen"
            src={project.image}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#050505]/30 via-[#050505]/65 to-[#050505]" />
        </>
      ) : (
        <div className="pointer-events-none absolute inset-0 card-technical-lines opacity-60" />
      )}
      <div aria-hidden="true" className={`project-signature project-signature--${project.icon}`} />
      <div aria-label={`${artifact.label}: ${artifact.detail}`} className={`project-artifact project-artifact--${project.icon}`}>
        <span>{artifact.label}</span>
        <span>{artifact.detail}</span>
      </div>
      <div className="flex h-full flex-col items-start">
        <div className="flex w-full items-center justify-between gap-4">
          <span className="icon-badge"><Icon aria-hidden="true" size={19} strokeWidth={1.7} /></span>
          {hasLink && project.href ? (
            <a
              aria-label={`Open ${project.title}`}
              className="icon-link"
              href={project.href}
              rel="noreferrer"
              target="_blank"
            >
              <ArrowUpRight aria-hidden="true" size={19} strokeWidth={1.8} />
            </a>
          ) : null}
        </div>
        <div className="mt-auto max-w-xl pt-14">
          <p className="eyebrow">{project.eyebrow}</p>
          <h3 className={`project-title mt-3 text-balance font-semibold tracking-[-0.058em] text-white ${isFlagship ? "text-4xl sm:text-[2.6rem]" : "text-[1.7rem] sm:text-[1.9rem]"}`}>
            {project.title}
          </h3>
          <p className="mt-3 max-w-2xl text-pretty text-sm leading-6 text-slate-300 sm:text-[0.94rem]">
            {project.description}
          </p>
          {project.tags.length > 0 ? (
            <ul aria-label={`${project.title} technologies`} className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li className="tag-chip" key={tag}>{tag}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </SpotlightCard>
  );
}

export function ProjectBentoSection({ group, isFirst = false }: ProjectBentoSectionProps) {
  const cards = group.projects ?? [];
  const layouts = layoutMap[group.id];

  return (
    <section aria-labelledby={`${group.id}-heading`} className="section-shell" id={isFirst ? "projects" : undefined}>
      <Reveal>
        <div className="mb-8 grid gap-5 border-t border-white/10 pt-5 md:grid-cols-[auto_1fr] md:items-end md:gap-8">
          <span className="font-mono text-xs tracking-[0.2em] text-[#8b7cff]">{group.number}</span>
          <div className="max-w-2xl">
            <p className="eyebrow">Selected systems</p>
            <h2 className="section-title mt-2 text-balance text-4xl font-semibold tracking-[-0.065em] text-white sm:text-5xl">
              {group.title}
            </h2>
            <p className="mt-3 text-pretty text-base leading-7 text-slate-400">{group.description}</p>
          </div>
        </div>
      </Reveal>
      {cards.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-12 md:gap-5">
          {cards.map((project, index) => (
            <Reveal className={layouts[index] ?? "md:col-span-12"} delay={index * 0.06} key={project.id}>
              <ProjectCard className="h-full" isFlagship={index === 0} project={project} />
            </Reveal>
          ))}
          {group.id === "ai-cloud" ? <Reveal className="md:col-span-12" delay={0.14}><Suspense fallback={<VisualModuleFallback />}><AgentEcosystem /></Suspense></Reveal> : null}
          {isFirst ? <Suspense fallback={<VisualModuleFallback />}><MetricsCard /></Suspense> : null}
          {group.id === "client-work" ? <Reveal className="md:col-span-12" delay={0.14}><Suspense fallback={<VisualModuleFallback />}><MobileProductShowcase /></Suspense></Reveal> : null}
        </div>
      ) : (
        <p className="glass-card px-6 py-8 text-sm text-slate-400">Project details are being prepared.</p>
      )}
    </section>
  );
}
