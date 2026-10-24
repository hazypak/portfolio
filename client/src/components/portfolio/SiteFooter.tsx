import { BrandMark } from "@/components/portfolio/BrandMark";
import { profile } from "@/data/portfolio";

export function SiteFooter() {
  return (
    <footer className="mt-28 border-t border-line">
      <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-4 px-5 py-8 sm:px-8 lg:px-12">
        <div className="flex items-center gap-3">
          <BrandMark className="h-7 w-7 text-frost" />
          <p className="font-mono text-xs text-mist">
            © {new Date().getFullYear()} {profile.firstName} {profile.lastName}
          </p>
        </div>
        <div className="flex items-center gap-5 font-mono text-xs">
          <a
            className="text-mist transition-colors hover:text-frost"
            href={profile.github}
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          <a
            className="text-mist transition-colors hover:text-frost"
            href="#top"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
