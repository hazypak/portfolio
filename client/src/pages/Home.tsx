/**
 * Obsidian Signal style: a spacious, reference-grounded editorial frame carries
 * original content through asymmetric technical Bento fields.
 */
import { AcademicsSection } from "@/components/portfolio/AcademicsSection";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { PortfolioFooter } from "@/components/portfolio/PortfolioFooter";
import { ProjectBentoSection } from "@/components/portfolio/ProjectBentoSection";
import { MarqueeAlongSvgPath } from "@/components/ui/marquee-along-svg-path";
import { portfolio } from "@/data/portfolio";

export default function Home() {
  const groups = portfolio.groups ?? [];

  return (
    <div className="page-shell min-h-screen overflow-hidden bg-[#030303] text-white">
      <CustomCursor />
      <HeroSection />
      <main className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <MarqueeAlongSvgPath />
        {groups.length > 0 ? (
          groups.map((group, index) => <ProjectBentoSection group={group} isFirst={index === 0} key={group.id} />)
        ) : (
          <section className="section-shell" id="projects"><p className="glass-card p-8 text-slate-400">Selected work is being prepared.</p></section>
        )}
        <AcademicsSection />
      </main>
      <PortfolioFooter />
    </div>
  );
}
