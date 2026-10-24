import { Award, GraduationCap } from "lucide-react";
import { Reveal } from "@/components/portfolio/Reveal";
import { SectionHeading } from "@/components/portfolio/SectionHeading";
import { credentials } from "@/data/portfolio";

export function CredentialsSection() {
  const cards = [
    {
      icon: GraduationCap,
      label: "Education",
      title: credentials.track,
      note: credentials.goal,
    },
    {
      icon: Award,
      label: "Certification",
      title: credentials.certification,
      note: credentials.certificationNote,
    },
  ];

  return (
    <section
      aria-labelledby="credentials-heading"
      className="pt-24 sm:pt-32"
      id="credentials"
    >
      <SectionHeading
        eyebrow="Credentials"
        id="credentials-heading"
        title="Learning while shipping"
      />
      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        {cards.map(({ icon: Icon, label, title, note }, index) => (
          <Reveal delay={index * 0.06} key={label}>
            <article className="glass h-full p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <Icon
                  aria-hidden="true"
                  className="text-glacier"
                  size={20}
                  strokeWidth={1.6}
                />
                <p className="eyebrow">{label}</p>
              </div>
              <h3 className="card-title mt-8 text-balance text-2xl text-frost">
                {title}
              </h3>
              <p className="mt-3 max-w-lg text-pretty leading-relaxed text-mist">
                {note}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
