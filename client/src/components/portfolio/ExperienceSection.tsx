/** Roles as a ledger, most recent first. Periods render only when set in the data. */
import { Reveal } from "@/components/portfolio/Reveal";
import { SectionHeading } from "@/components/portfolio/SectionHeading";
import { engagements } from "@/data/portfolio";

export function ExperienceSection() {
  return (
    <section
      aria-labelledby="experience-heading"
      className="pt-24 sm:pt-32"
      id="experience"
    >
      <SectionHeading
        eyebrow="Experience"
        id="experience-heading"
        title="Who I build for"
      >
        The businesses and communities that run on systems I designed and still
        maintain.
      </SectionHeading>
      <ol className="border-b border-line">
        {engagements.map((item, index) => (
          <Reveal
            as="li"
            className="group grid gap-2 border-t border-line py-6 transition-colors md:grid-cols-12 md:gap-8 md:py-7"
            delay={index * 0.05}
            key={item.org}
          >
            <div className="md:col-span-3">
              {item.period ? (
                <p className="font-mono text-xs text-glacier">{item.period}</p>
              ) : null}
              {item.location ? (
                <p className="font-mono text-xs text-mist">{item.location}</p>
              ) : null}
            </div>
            <div className="md:col-span-5">
              <p className="text-lg font-semibold text-frost transition-colors [font-stretch:108%] group-hover:text-glacier">
                {item.org}
              </p>
              <p className="mt-1 text-sm text-mist">{item.role}</p>
            </div>
            <p className="text-pretty leading-relaxed text-frost/75 md:col-span-4">
              {item.scope}
            </p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
