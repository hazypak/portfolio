/**
 * Terminal-style contact module. The status log mirrors the real request:
 * "encrypting" covers serialisation over HTTPS, "transmitting" is the actual
 * fetch, and "sent" only appears once the API confirms delivery. The server
 * re-validates everything; attributes here are just guidance.
 */
import { Check, Copy, Mail, Send } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/portfolio/Reveal";
import { contactEmail, profile } from "@/data/portfolio";
import { useCopyEmail } from "@/hooks/useCopyEmail";

type Phase = "idle" | "encrypting" | "transmitting" | "sent" | "error";
type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;
type LogLine = { text: string; tone: "info" | "ok" | "err" };

const prompts = [
  {
    id: "booking",
    label: "booking-system",
    text: "I need an online booking system with payments for my business.",
  },
  {
    id: "website",
    label: "website-seo",
    text: "I need a fast website that ranks on Google, with analytics set up.",
  },
  {
    id: "crm",
    label: "custom-crm",
    text: "I want a simple CRM to track customers, visits and follow-ups.",
  },
  {
    id: "ai",
    label: "ai-automation",
    text: "I'd like to automate a repetitive workflow with AI agents.",
  },
  {
    id: "infra",
    label: "dns-hosting",
    text: "I need help with domains, DNS and hosting for an existing site.",
  },
] as const;

const phaseLabel: Record<Phase, string> = {
  idle: "ready",
  encrypting: "encrypting",
  transmitting: "transmitting",
  sent: "sent",
  error: "failed",
};

const wait = (ms: number) =>
  new Promise(resolve => window.setTimeout(resolve, ms));

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

function ContactTerminal({ enabled }: { enabled: boolean | null }) {
  const { copied, copy } = useCopyEmail();
  const [phase, setPhase] = useState<Phase>("idle");
  const [log, setLog] = useState<LogLine[]>([]);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [email, setEmail] = useState("");
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const busy = phase === "encrypting" || phase === "transmitting";
  const online = enabled === true;

  useEffect(() => setEmail(contactEmail()), []);

  const push = (line: LogLine) => setLog(lines => [...lines, line]);

  function applyPrompt(text: string) {
    const field = messageRef.current;
    if (!field) return;
    field.value = text;
    field.focus();
    field.setSelectionRange(text.length, text.length);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<
      string,
      string
    >;
    setErrors({});
    setLog([]);

    setPhase("encrypting");
    push({ text: "encrypting payload over TLS ...", tone: "info" });
    const body = JSON.stringify(data);
    await wait(450);
    push({ text: "payload sealed", tone: "ok" });

    setPhase("transmitting");
    push({ text: "transmitting to mail relay ...", tone: "info" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body,
      });
      const result = (await res.json().catch(() => ({}))) as {
        error?: string;
        fieldErrors?: FieldErrors;
      };
      if (!res.ok) {
        setErrors(result.fieldErrors ?? {});
        push({
          text:
            result.error ?? "The message didn't go through. Try again shortly.",
          tone: "err",
        });
        setPhase("error");
        return;
      }
      push({
        text: `sent · reply will go to ${data.email ?? "your inbox"}`,
        tone: "ok",
      });
      setPhase("sent");
      form.reset();
    } catch {
      push({
        text: "connection lost. Check your network and try again.",
        tone: "err",
      });
      setPhase("error");
    }
  }

  const field = (name: keyof FieldErrors) => ({
    name,
    id: `contact-${name}`,
    disabled: !online || busy,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  });

  const fieldError = (name: keyof FieldErrors) =>
    errors[name] ? (
      <p
        className="mt-1 text-[0.72rem] text-danger"
        id={`contact-${name}-error`}
      >
        ! {errors[name]}
      </p>
    ) : null;

  const dotTone =
    phase === "error"
      ? "bg-danger"
      : phase === "sent"
        ? "bg-patina"
        : busy
          ? "bg-glacier animate-pulse"
          : online
            ? "bg-patina"
            : "bg-mist";

  return (
    <div className="terminal">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <div aria-hidden="true" className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-patina/70" />
        </div>
        <p className="truncate text-[0.72rem] text-mist">
          contact@hazqeel: ~/inbox
        </p>
        <p className="flex items-center gap-2 text-[0.72rem] text-frost">
          <span
            aria-hidden="true"
            className={`h-2 w-2 rounded-full ${dotTone}`}
          />
          {online || enabled === null ? phaseLabel[phase] : "offline"}
        </p>
      </div>

      <div className="space-y-5 p-5 text-sm sm:p-6">
        <div>
          <p className="text-mist">
            <span className="text-glacier">$</span> echo $EMAIL
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <span className="text-frost">{email || "loading…"}</span>
            <button
              aria-live="polite"
              className="inline-flex items-center gap-1.5 rounded-md border border-glacier/40 px-2.5 py-1 text-[0.72rem] text-glacier transition-[box-shadow,border-color] hover:border-glacier hover:shadow-[0_0_14px_rgba(64,224,240,0.35)]"
              onClick={copy}
              type="button"
            >
              {copied ? (
                <Check aria-hidden="true" size={13} />
              ) : (
                <Copy aria-hidden="true" size={13} />
              )}
              {copied ? "copied" : "copy"}
            </button>
            {email ? (
              <a
                className="inline-flex items-center gap-1.5 text-[0.72rem] text-mist hover:text-frost"
                href={`mailto:${email}`}
              >
                <Mail aria-hidden="true" size={13} /> open mail app
              </a>
            ) : null}
          </div>
        </div>

        <div>
          <p className="text-mist">
            <span className="text-glacier">$</span> ls inquiries/
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {prompts.map(p => (
              <button
                className="rounded-md border border-violet/30 bg-violet/5 px-2.5 py-1 text-[0.72rem] text-lilac transition-[border-color,box-shadow] hover:border-violet hover:shadow-[0_0_14px_rgba(167,139,250,0.35)] disabled:opacity-50"
                disabled={!online || busy}
                key={p.id}
                onClick={() => applyPrompt(p.text)}
                type="button"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {enabled === false ? (
          <p className="text-mist">
            <span className="text-amber">!</span> messaging is offline right
            now. Copy the email above, or reach me on{" "}
            <a
              className="text-link"
              href={profile.github}
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
            </a>
            .
          </p>
        ) : (
          <form className="relative space-y-4" onSubmit={submit}>
            <p className="text-mist">
              <span className="text-glacier">$</span> ./send-message
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  className="text-[0.72rem] text-mist"
                  htmlFor="contact-name"
                >
                  name ›
                </label>
                <input
                  autoComplete="name"
                  className="term-input"
                  maxLength={80}
                  minLength={2}
                  placeholder="Your name"
                  required
                  type="text"
                  {...field("name")}
                />
                {fieldError("name")}
              </div>
              <div>
                <label
                  className="text-[0.72rem] text-mist"
                  htmlFor="contact-email"
                >
                  email ›
                </label>
                <input
                  autoComplete="email"
                  className="term-input"
                  maxLength={254}
                  placeholder="you@company.com"
                  required
                  type="email"
                  {...field("email")}
                />
                {fieldError("email")}
              </div>
            </div>
            <div>
              <label
                className="text-[0.72rem] text-mist"
                htmlFor="contact-message"
              >
                message ›
              </label>
              <textarea
                className="term-input min-h-28 resize-y"
                maxLength={4000}
                minLength={20}
                placeholder="What are you building, and where is it stuck?"
                ref={messageRef}
                required
                rows={4}
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
            <button
              className="btn btn-primary"
              disabled={!online || busy}
              type="submit"
            >
              <Send aria-hidden="true" size={15} />
              {busy
                ? `${phaseLabel[phase]}…`
                : phase === "sent"
                  ? "Send another"
                  : "Transmit message"}
            </button>
          </form>
        )}

        <div
          aria-live="polite"
          className="min-h-6 space-y-1 border-t border-line pt-4 text-[0.78rem]"
        >
          {log.length === 0 ? (
            <p className="caret text-mist">
              {online
                ? "awaiting input"
                : enabled === null
                  ? "connecting"
                  : "standing by"}
            </p>
          ) : (
            log.map((line, i) => (
              <p
                className={
                  line.tone === "ok"
                    ? "text-patina"
                    : line.tone === "err"
                      ? "text-danger"
                      : "text-glacier"
                }
                key={`${i}-${line.text}`}
              >
                {line.tone === "ok" ? "✓" : line.tone === "err" ? "✗" : "›"}{" "}
                {line.text}
              </p>
            ))
          )}
        </div>
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
            className="section-title mt-4 text-balance lg:text-[clamp(1.9rem,2.8vw,2.6rem)]"
            id="contact-heading"
          >
            <span className="gradient-text">
              Need a booking flow, a website, or an AI system that just works?
            </span>
          </h2>
          <p className="mt-5 max-w-md text-pretty leading-relaxed text-mist">
            Tell me what the business does and where it's stuck. Pick a prompt
            to start, or write your own.
          </p>
        </Reveal>
        <Reveal className="lg:col-span-7" delay={0.08}>
          <ContactTerminal enabled={enabled} />
        </Reveal>
      </div>
    </section>
  );
}
