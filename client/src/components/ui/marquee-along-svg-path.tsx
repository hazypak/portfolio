/**
 * Obsidian Signal style: an engineered, low-contrast technology rail creates
 * motion between the hero and the first system group without changing portfolio data.
 */

interface TechIcon {
  name: string;
  url: string;
}

const TECH_STACK: TechIcon[] = [
  { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "PyTorch", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
  { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Google Cloud", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
  { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "FastAPI", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "PostgreSQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
];

export function MarqueeAlongSvgPath() {
  const items = [...TECH_STACK, ...TECH_STACK, ...TECH_STACK];

  return (
    <section aria-label="Core engineering stack" className="tech-marquee-section relative my-7 w-full overflow-hidden border-y border-white/8 py-8 sm:my-10 sm:py-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#030303] to-transparent sm:w-28" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#030303] to-transparent sm:w-28" />
      <div className="relative mx-auto mb-4 max-w-7xl px-5 text-center sm:px-8">
        <span className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] text-slate-500">Core engine &amp; infrastructure stack</span>
      </div>
      <div className="relative w-full overflow-hidden">
        <ul className="animate-marquee-custom flex w-max items-center gap-3 py-2 sm:gap-5" aria-label="Technology stack">
          {items.map((tech, index) => (
            <li className="tech-marquee-chip" key={`${tech.name}-${index}`}>
              <img alt="" aria-hidden="true" className="h-4 w-4 object-contain" loading="lazy" src={tech.url} />
              <span>{tech.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
