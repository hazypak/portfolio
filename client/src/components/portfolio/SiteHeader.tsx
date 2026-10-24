/** Sticky header: transparent over the hero, frosted once the page scrolls. */
import { Github } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/portfolio/BrandMark";
import { HoverTooltip } from "@/components/portfolio/HoverTooltip";
import { profile } from "@/data/portfolio";

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#credentials", label: "Credentials" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${scrolled ? "border-line bg-ink/75 backdrop-blur-xl" : "border-transparent"}`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <a
          aria-label="Muhammad Hazqeel, back to top"
          className="flex items-center gap-2.5 rounded-md"
          href="#top"
        >
          <BrandMark className="h-8 w-8 text-frost" />
          <span className="text-sm font-bold [font-stretch:115%]">Hazqeel</span>
        </a>

        <nav aria-label="Sections" className="flex items-center gap-1 sm:gap-2">
          {links.map(link => (
            <a
              className="hidden rounded-md px-3 py-2 text-sm text-mist transition-colors hover:text-frost md:inline-flex"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
          <HoverTooltip content="I run an agency too!">
            <a
              className="hidden rounded-md px-3 py-2 text-sm text-mist transition-colors hover:text-frost sm:inline-flex"
              href={profile.studio}
              rel="noopener noreferrer"
              target="_blank"
            >
              Studio
            </a>
          </HoverTooltip>
          <a
            aria-label="GitHub profile"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-mist transition-colors hover:text-frost"
            href={profile.github}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Github aria-hidden="true" size={17} strokeWidth={1.8} />
          </a>
          <a
            className="ml-1 inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-2 font-mono text-[0.72rem] text-frost transition-colors hover:border-glacier/50"
            href="#contact"
          >
            <span aria-hidden="true" className="status-dot" />
            Taking projects
          </a>
        </nav>
      </div>
    </header>
  );
}
