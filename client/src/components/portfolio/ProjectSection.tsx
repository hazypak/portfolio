/** A discipline group rendered as an asymmetric bento grid of project cards. */
import { ArrowUpRight, Lock } from "lucide-react";
import type { PointerEvent } from "react";
import { Reveal } from "@/components/portfolio/Reveal";
import { SectionHeading } from "@/components/portfolio/SectionHeading";
import type {
  PortfolioProject,
  ProjectGroup,
  ProjectSize,
} from "@/data/portfolio";

const spans: Record<ProjectSize, string> = {
  wide: "md:col-span-7",
  narrow: "md:col-span-5",
  full: "md:col-span-12",
};

function trackPointer(event: PointerEvent<HTMLElement>) {
  if (event.pointerType === "touch") return;
  const card = event.currentTarget;
  const bounds = card.getBoundingClientRect();
  card.style.setProperty("--mx", `${event.clientX - bounds.left}px`);
  card.style.setProperty("--my", `${event.clientY - bounds.top}px`);
}

function hostname(href: string) {
  return new URL(href).hostname.replace(/^www\./, "");
}

function ProjectCard({ project }: { project: PortfolioProject }) {
  const isFeature = project.size !== "narrow";

  return (
    <article
      aria-labelledby={`${project.id}-title`}
      className="glass spotlight flex h-full flex-col p-6 sm:p-8"
      onPointerMove={trackPointer}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <p className="font-mono text-xs text-glacier">{project.kind}</p>
        {project.location ? (
          <p className="font-mono text-xs text-mist">{project.location}</p>
        ) : null}
      </div>

      <h3
        className={`card-title mt-5 text-balance text-frost ${isFeature ? "text-3xl sm:text-[2.35rem]" : "text-2xl sm:text-[1.75rem]"}`}
        id={`${project.id}-title`}
      >
        {project.title}
      </h3>
      <p className="mt-2 text-sm text-mist">{project.role}</p>
      <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-frost/80">
        {project.summary}
      </p>

      {project.highlights?.length ? (
        <ul className="mt-5 space-y-2 text-sm text-frost/80">
          {project.highlights.map(item => (
            <li className="flex gap-3" key={item}>
              <span
                aria-hidden="true"
                className="mt-[0.6rem] h-px w-3 shrink-0 bg-glacier"
              />
              {item}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-8">
        <ul aria-label="Scope" className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <li className="chip" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
        {project.href ? (
          <a
            aria-label={`Visit ${project.title} (opens in a new tab)`}
            className="group inline-flex items-center gap-1.5 font-mono text-xs text-frost transition-colors hover:text-glacier"
            href={project.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            {hostname(project.href)}
            <ArrowUpRight
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              size={14}
            />
          </a>
        ) : (
          <p className="inline-flex items-center gap-1.5 font-mono text-xs text-mist">
            <Lock aria-hidden="true" size={12} /> No public link
          </p>
        )}
      </div>
    </article>
  );
}

export function ProjectSection({ group }: { group: ProjectGroup }) {
  const headingId = `${group.id}-heading`;

  return (
    <section aria-labelledby={headingId} className="pt-24 sm:pt-32">
      <SectionHeading
        eyebrow={`${group.projects.length} projects`}
        id={headingId}
        title={group.title}
      >
        {group.description}
      </SectionHeading>
      <div className="grid gap-4 md:grid-cols-12 md:gap-5">
        {group.projects.map((project, index) => (
          <Reveal
            className={spans[project.size]}
            delay={index * 0.06}
            key={project.id}
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
