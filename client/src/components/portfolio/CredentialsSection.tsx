/**
 * Credentials: each certificate is shown as the real document with its
 * details beside it, alternating sides on wide screens; education sits below.
 * Rows only appear for what the certificate itself prints (dates, IDs).
 */
import {
  Award,
  BadgeCheck,
  Check,
  Copy,
  Download,
  GraduationCap,
  Maximize2,
} from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/portfolio/Reveal";
import { SectionHeading } from "@/components/portfolio/SectionHeading";
import { type Certificate, certificates, credentials } from "@/data/portfolio";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function formatDate(iso: string) {
  return dateFormat.format(new Date(`${iso}T00:00:00Z`));
}

function CredentialId({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked: the ID is still visible to select by hand.
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <code className="select-all rounded-md border border-line bg-basalt/60 px-2 py-1 font-mono text-[0.78rem] text-frost">
        {value}
      </code>
      <button
        aria-label={copied ? "Credential ID copied" : "Copy credential ID"}
        className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-line text-mist transition-colors hover:border-glacier/60 hover:text-glacier"
        onClick={copy}
        type="button"
      >
        {copied ? (
          <Check aria-hidden="true" size={13} />
        ) : (
          <Copy aria-hidden="true" size={13} />
        )}
      </button>
    </div>
  );
}

function ValidityBadge({ validUntil }: { validUntil: string }) {
  const valid = Date.now() < new Date(`${validUntil}T23:59:59Z`).getTime();
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-[0.7rem] ${valid ? "text-patina" : "text-mist"}`}
    >
      <span
        aria-hidden="true"
        className={valid ? "status-dot" : "h-1.5 w-1.5 rounded-full bg-mist"}
      />
      {valid ? "Valid" : "Expired"}
    </span>
  );
}

function CertificateShowcase({
  cert,
  flip,
}: {
  cert: Certificate;
  flip: boolean;
}) {
  const titleId = `${cert.id}-title`;
  const details: [string, string][] = [
    ["Issued by", cert.issuer],
    ["Awarded to", cert.holder],
    ...(cert.details ?? []).map(([k, v]): [string, string] => [k, v]),
  ];
  if (cert.issued) details.push(["Issued", formatDate(cert.issued)]);
  if (cert.validUntil)
    details.push(["Valid until", formatDate(cert.validUntil)]);

  return (
    <article
      aria-labelledby={titleId}
      className="glass neon-card grid gap-8 p-5 sm:p-8 lg:grid-cols-12 lg:items-center lg:gap-10"
    >
      <a
        aria-label={`Open the full-size ${cert.title} certificate image (new tab)`}
        className={`cert-frame lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
        href={cert.image}
        rel="noopener noreferrer"
        target="_blank"
      >
        <img
          alt={`${cert.badge}: ${cert.title}, issued by ${cert.issuer} to ${cert.holder}${cert.issued ? `, dated ${formatDate(cert.issued)}` : ""}.`}
          decoding="async"
          height={cert.imageHeight}
          loading="lazy"
          sizes="(min-width: 1024px) 56vw, 92vw"
          src={cert.imageSmall}
          srcSet={`${cert.imageSmall} 900w, ${cert.image} ${cert.imageWidth}w`}
          width={cert.imageWidth}
        />
      </a>

      <div className="lg:col-span-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-glacier/40 bg-glacier/10 px-3 py-1 font-mono text-[0.7rem] text-glacier">
            <BadgeCheck aria-hidden="true" size={14} /> {cert.badge}
          </span>
          {cert.validUntil && <ValidityBadge validUntil={cert.validUntil} />}
        </div>

        <h3
          className="card-title mt-5 text-balance text-2xl sm:text-3xl"
          id={titleId}
        >
          <span className="gradient-text">{cert.title}</span>
        </h3>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-mist">
          {cert.note}
        </p>

        <dl className="mt-6 divide-y divide-line border-y border-line">
          {details.map(([label, value]) => (
            <div
              className="grid grid-cols-[7rem_1fr] gap-4 py-2.5 text-sm"
              key={label}
            >
              <dt className="font-mono text-xs leading-5 text-mist">{label}</dt>
              <dd className="leading-5 text-frost">{value}</dd>
            </div>
          ))}
          {cert.credentialId && (
            <div className="grid grid-cols-[7rem_1fr] items-center gap-4 py-2.5 text-sm">
              <dt className="font-mono text-xs leading-5 text-mist">
                Credential ID
              </dt>
              <dd>
                <CredentialId value={cert.credentialId} />
              </dd>
            </div>
          )}
        </dl>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            className="btn btn-primary"
            href={cert.image}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Maximize2 aria-hidden="true" size={15} /> View full size
          </a>
          <a
            className="btn btn-ghost"
            download={cert.downloadName}
            href={cert.pdf}
          >
            <Download aria-hidden="true" size={15} /> Download PDF
          </a>
        </div>
      </div>
    </article>
  );
}

export function CredentialsSection() {
  return (
    <section
      aria-labelledby="credentials-heading"
      className="pt-24 sm:pt-32"
      id="credentials"
    >
      <SectionHeading
        eyebrow="Credentials"
        id="credentials-heading"
        title="Certified, and still learning"
      >
        Oracle-certified in cloud AI, trained through Dubai&apos;s One Million
        Prompters initiative, alongside a full STEM A-Level track.
      </SectionHeading>

      <div className="grid gap-4 md:gap-5">
        {certificates.map((cert, i) => (
          <Reveal delay={i * 0.06} key={cert.id}>
            <CertificateShowcase cert={cert} flip={i % 2 === 1} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-4 md:mt-5" delay={0.06}>
        <article className="glass flex flex-col gap-6 p-6 sm:flex-row sm:items-start sm:p-8">
          <div className="flex items-center gap-3 sm:w-48 sm:shrink-0">
            <GraduationCap
              aria-hidden="true"
              className="text-glacier"
              size={20}
              strokeWidth={1.6}
            />
            <p className="eyebrow">Education</p>
          </div>
          <div>
            <h3 className="card-title text-balance text-2xl text-frost">
              {credentials.track}
            </h3>
            <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-mist">
              {credentials.goal}
            </p>
          </div>
          <Award
            aria-hidden="true"
            className="ml-auto hidden shrink-0 text-violet sm:block"
            size={22}
            strokeWidth={1.5}
          />
        </article>
      </Reveal>
    </section>
  );
}
