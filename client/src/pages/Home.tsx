import { ContactSection } from "@/components/portfolio/ContactSection";
import { CredentialsSection } from "@/components/portfolio/CredentialsSection";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { ExperienceSection } from "@/components/portfolio/ExperienceSection";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { ProjectSection } from "@/components/portfolio/ProjectSection";
import { SiteFooter } from "@/components/portfolio/SiteFooter";
import { SiteHeader } from "@/components/portfolio/SiteHeader";
import { groups } from "@/data/portfolio";

export default function Home() {
  return (
    <div className="page-atmosphere grain relative min-h-screen overflow-x-clip">
      <a
        className="sr-only z-[60] rounded-md bg-frost px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        href="#work"
      >
        Skip to work
      </a>
      <CustomCursor />
      <SiteHeader />
      <main className="relative z-10">
        <HeroSection />
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="scroll-mt-20" id="work">
            {groups.map(group => (
              <ProjectSection group={group} key={group.id} />
            ))}
          </div>
          <ExperienceSection />
          <CredentialsSection />
          <ContactSection />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
