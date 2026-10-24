import type { ReactNode } from "react";
import { Reveal } from "@/components/portfolio/Reveal";

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  children?: ReactNode;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  children,
}: SectionHeadingProps) {
  return (
    <Reveal className="mb-10 grid gap-4 border-t border-line pt-6 md:grid-cols-12 md:gap-8 lg:mb-12">
      <p className="eyebrow md:col-span-3">{eyebrow}</p>
      <div className="md:col-span-9">
        <h2 className="section-title text-balance text-frost" id={id}>
          {title}
        </h2>
        {children ? (
          <div className="mt-4 max-w-2xl text-pretty leading-relaxed text-mist">
            {children}
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}
