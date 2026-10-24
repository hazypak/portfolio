/** Sticky header: transparent over the hero, frosted once the page scrolls. */
import { Github } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/portfolio/BrandMark";
import { profile } from "@/data/portfolio";

const links = [
  { href: "#system", label: "System" },
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
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${scrolled ? "border-line bg-ink/70 backdrop-blur-xl" : "border-transparent"}`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <a
          aria-label="Muhammad Hazqeel Abdullah, back to top"
          className="flex items-center gap-2.5 rounded-md"
          href="#top"
        >
          <BrandMark className="h-8 w-8 text-frost" />
          <span className="text-sm font-bold [font-stretch:115%]">Hazqeel</span>
        </a>

        <nav aria-label="Sections" className="flex items-center gap-1 sm:gap-2">
          {links.map(link => (
            <a
              className="hidden rounded-md px-3 py-2 text-sm text-mist transition-colors hover:text-glacier md:inline-flex"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
          <a
            aria-label="GitHub profile"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-mist transition-colors hover:text-glacier"
            href={profile.github}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Github aria-hidden="true" size={17} strokeWidth={1.8} />
          </a>
          <a
            className="ml-1 inline-flex items-center gap-2 rounded-full border border-glacier/30 bg-glacier/5 px-3.5 py-2 font-mono text-[0.72rem] text-frost transition-[border-color,box-shadow] hover:border-glacier/70 hover:shadow-[0_0_18px_rgba(64,224,240,0.3)]"
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
