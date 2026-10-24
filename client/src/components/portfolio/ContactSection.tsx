/**
 * Contact: the form renders only when /api/contact reports delivery is
 * configured; otherwise visitors get direct links instead of a dead form.
 * The server re-validates everything; the attributes here are just guidance.
 */
import { ArrowUpRight, Check, Github, LoaderCircle } from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";
import { Reveal } from "@/components/portfolio/Reveal";
import { profile } from "@/data/portfolio";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; email: string }
  | { kind: "error"; message: string };
type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

function useContactEnabled() {
  const [enabled, setEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/contact", {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    })
      .then(res => (res.ok ? res.json() : { enabled: false }))
      .then((data: { enabled?: unknown }) => setEnabled(data.enabled === true))
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError"))
          setEnabled(false);
      });
    return () => controller.abort();
  }, []);

  return enabled;
}

function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<FieldErrors>({});

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<
      string,
      string
    >;
    setStatus({ kind: "sending" });
    setErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as {
        error?: string;
        fieldErrors?: FieldErrors;
      };
      if (!res.ok) {
        setErrors(body.fieldErrors ?? {});
        setStatus({
          kind: "error",
          message:
            body.error ?? "The message didn't go through. Try again shortly.",
        });
        return;
      }
      form.reset();
      setStatus({ kind: "sent", email: data.email ?? "" });
    } catch {
      setStatus({
        kind: "error",
        message: "You seem to be offline. Check your connection and try again.",
      });
    }
  }

  if (status.kind === "sent") {
    return (
      <div className="glass p-6 sm:p-8" role="status">
        <Check aria-hidden="true" className="text-patina" size={22} />
        <p className="card-title mt-5 text-2xl text-frost">Message sent.</p>
        <p className="mt-2 text-mist">I'll reply to {status.email} soon.</p>
        <button
          className="btn btn-ghost mt-6"
          onClick={() => setStatus({ kind: "idle" })}
          type="button"
        >
          Send another message
        </button>
      </div>
    );
  }

  const field = (name: keyof FieldErrors) => ({
    name,
    id: `contact-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  });

  const fieldError = (name: keyof FieldErrors) =>
    errors[name] ? (
      <p className="mt-1.5 text-xs text-[#e08a8a]" id={`contact-${name}-error`}>
        {errors[name]}
      </p>
    ) : null;

  return (
    <form className="glass relative grid gap-5 p-6 sm:p-8" onSubmit={submit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="eyebrow mb-2 block" htmlFor="contact-name">
            Name
          </label>
          <input
            autoComplete="name"
            className="field"
            maxLength={80}
            minLength={2}
            required
            type="text"
            {...field("name")}
          />
          {fieldError("name")}
        </div>
        <div>
          <label className="eyebrow mb-2 block" htmlFor="contact-email">
            Email
          </label>
          <input
            autoComplete="email"
            className="field"
            maxLength={254}
            required
            type="email"
            {...field("email")}
          />
          {fieldError("email")}
        </div>
      </div>
      <div>
        <label className="eyebrow mb-2 block" htmlFor="contact-message">
          What do you need built?
        </label>
        <textarea
          className="field min-h-36 resize-y"
          maxLength={4000}
          minLength={20}
          placeholder="A booking system for two branches, a site that ranks locally, a server that stays up…"
          required
          rows={5}
          {...field("message")}
        />
        {fieldError("message")}
      </div>
      <div aria-hidden="true" className="trap">
        <label htmlFor="contact-company">Company</label>
        <input
          autoComplete="off"
          id="contact-company"
          name="company"
          tabIndex={-1}
          type="text"
        />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button
          className="btn btn-primary"
          disabled={status.kind === "sending"}
          type="submit"
        >
          {status.kind === "sending" ? (
            <>
              <LoaderCircle
                aria-hidden="true"
                className="animate-spin"
                size={16}
              />{" "}
              Sending…
            </>
          ) : (
            <>
              Send message{" "}
              <ArrowUpRight
                aria-hidden="true"
                className="btn-arrow"
                size={16}
              />
            </>
          )}
        </button>
        {status.kind === "error" ? (
          <p className="text-sm text-[#e08a8a]" role="alert">
            {status.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}

function DirectContact() {
  return (
    <div className="glass p-6 sm:p-8">
      <p className="eyebrow">Fastest way to reach me</p>
      <p className="card-title mt-5 text-2xl text-frost">
        Find me on GitHub or through my studio
      </p>
      <p className="mt-3 max-w-md leading-relaxed text-mist">
        Send a line about the project through either and I'll get back to you.
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <a
          className="btn btn-primary"
          href={profile.github}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Github aria-hidden="true" size={16} /> github.com/hazypak
        </a>
        <a
          className="btn btn-ghost"
          href={profile.studio}
          rel="noopener noreferrer"
          target="_blank"
        >
          GHM Global Networks{" "}
          <ArrowUpRight aria-hidden="true" className="btn-arrow" size={16} />
        </a>
      </div>
    </div>
  );
}

export function ContactSection() {
  const enabled = useContactEnabled();

  return (
    <section
      aria-labelledby="contact-heading"
      className="pt-24 sm:pt-32"
      id="contact"
    >
      <div className="grid gap-10 border-t border-line pt-6 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">Contact</p>
          <h2
            className="section-title mt-4 text-balance text-frost lg:text-[clamp(1.9rem,2.8vw,2.6rem)]"
            id="contact-heading"
          >
            Need a booking flow, a website, or someone to own your
            infrastructure?
          </h2>
          <p className="mt-5 max-w-md text-pretty leading-relaxed text-mist">
            Tell me what the business does and where it's stuck. I'll reply with
            how I'd approach it.
          </p>
        </Reveal>
        <Reveal className="lg:col-span-7" delay={0.08}>
          {enabled === null ? (
            <div
              aria-busy="true"
              aria-label="Loading contact options"
              className="glass min-h-72 animate-pulse"
            />
          ) : enabled ? (
            <ContactForm />
          ) : (
            <DirectContact />
          )}
        </Reveal>
      </div>
    </section>
  );
}
