/**
 * Contact endpoint (Vercel Function, web-standard handlers).
 *
 * GET  /api/contact -> { enabled } so the client only renders the form when
 *                      delivery is configured.
 * POST /api/contact -> validates, rate-limits and forwards a plain-text email.
 *
 * Configuration (all server-only, never VITE_-prefixed):
 *   RESEND_API_KEY, CONTACT_TO_EMAIL         required to enable delivery
 *   CONTACT_FROM_EMAIL                       optional sender identity
 *   UPSTASH_REDIS_REST_URL / _TOKEN          optional shared rate limiter
 *   ALLOWED_ORIGINS                          optional comma-separated extras
 *
 * Helpers live in this file (not a sibling module) so the function has no
 * relative ESM imports for Vercel's per-function compiler to resolve.
 */
import { z } from "zod";

const CANONICAL_ORIGIN = "https://hazqeel.vercel.app";
const MAX_BODY_BYTES = 8 * 1024;

export const RATE_LIMIT = { max: 5, windowSeconds: 10 * 60 } as const;

/** Removes control characters (keeping newlines/tabs where allowed) and trims. */
export function cleanText(value: string, { multiline = false } = {}): string {
  const controls = multiline
    ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g
    : /[\u0000-\u001F\u007F]/g;
  const cleaned = value
    .normalize("NFKC")
    .replace(controls, multiline ? "" : " ");
  return multiline
    ? cleaned.replace(/\n{3,}/g, "\n\n").trim()
    : cleaned.replace(/\s+/g, " ").trim();
}

export const contactSchema = z.object({
  name: z
    .string()
    .transform(v => cleanText(v))
    .pipe(z.string().min(2, "Enter your name.").max(80)),
  email: z
    .string()
    .transform(v => cleanText(v).toLowerCase())
    .pipe(z.email("Enter a valid email address.").max(254)),
  message: z
    .string()
    .transform(v => cleanText(v, { multiline: true }))
    .pipe(
      z.string().min(20, "Add a little more detail (20+ characters).").max(4000)
    ),
  // Honeypot: real visitors never see this field, so any value means a bot.
  company: z.string().max(200).optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;

type Env = Record<string, string | undefined>;

export function allowedOrigins(env: Env): Set<string> {
  const origins = new Set<string>([CANONICAL_ORIGIN]);
  for (const host of [
    env.VERCEL_URL,
    env.VERCEL_BRANCH_URL,
    env.VERCEL_PROJECT_PRODUCTION_URL,
  ]) {
    if (host) origins.add(`https://${host}`);
  }
  for (const extra of (env.ALLOWED_ORIGINS ?? "").split(",")) {
    if (extra.trim()) origins.add(extra.trim());
  }
  return origins;
}

/** Same-origin browser requests always carry Origin on POST; reject foreign ones. */
export function isOriginAllowed(origin: string | null, env: Env): boolean {
  if (!origin) return true;
  if (
    env.VERCEL_ENV !== "production" &&
    /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
  )
    return true;
  return allowedOrigins(env).has(origin);
}

export function clientKey(headers: Headers): string {
  const forwarded =
    headers.get("x-vercel-forwarded-for") ??
    headers.get("x-forwarded-for") ??
    headers.get("x-real-ip") ??
    "";
  return forwarded.split(",")[0]?.trim() || "unknown";
}

export interface RateLimiter {
  /** Returns true when the request is within budget. */
  hit(key: string): Promise<boolean>;
}

/** Best-effort fallback: per-instance memory, reset on cold start. */
export function createMemoryLimiter(now: () => number = Date.now): RateLimiter {
  const buckets = new Map<string, { count: number; resetAt: number }>();
  return {
    async hit(key) {
      const t = now();
      const bucket = buckets.get(key);
      if (!bucket || bucket.resetAt <= t) {
        buckets.set(key, {
          count: 1,
          resetAt: t + RATE_LIMIT.windowSeconds * 1000,
        });
        return true;
      }
      bucket.count += 1;
      return bucket.count <= RATE_LIMIT.max;
    },
  };
}

/** Fixed-window limiter over Upstash's REST pipeline: INCR + EXPIRE NX. */
export function createUpstashLimiter(url: string, token: string): RateLimiter {
  return {
    async hit(key) {
      const redisKey = `contact:rl:${key}`;
      const res = await fetch(`${url.replace(/\/+$/, "")}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", redisKey],
          ["EXPIRE", redisKey, String(RATE_LIMIT.windowSeconds), "NX"],
        ]),
      });
      if (!res.ok) throw new Error(`Rate limiter responded ${res.status}`);
      const [incr] = (await res.json()) as Array<{ result?: number }>;
      return (incr?.result ?? 0) <= RATE_LIMIT.max;
    },
  };
}

const memoryLimiter = createMemoryLimiter();

function limiterFor(env: Env): RateLimiter {
  const { UPSTASH_REDIS_REST_URL: url, UPSTASH_REDIS_REST_TOKEN: token } = env;
  return url && token ? createUpstashLimiter(url, token) : memoryLimiter;
}

export function isDeliveryConfigured(env: Env): boolean {
  return Boolean(env.RESEND_API_KEY && env.CONTACT_TO_EMAIL);
}

async function deliver(input: ContactInput, env: Env): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from:
        env.CONTACT_FROM_EMAIL ?? "Portfolio contact <onboarding@resend.dev>",
      to: [env.CONTACT_TO_EMAIL],
      reply_to: input.email,
      subject: `Portfolio enquiry from ${input.name}`,
      // Plain text only: nothing the visitor typed is ever interpreted as HTML.
      text: `${input.message}\n\n—\n${input.name} <${input.email}>`,
    }),
  });
  if (!res.ok) throw new Error(`Email provider responded ${res.status}`);
}

function json(body: unknown, status = 200, extra: HeadersInit = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...extra,
    },
  });
}

export async function GET(): Promise<Response> {
  return json({ enabled: isDeliveryConfigured(process.env) });
}

export async function handleContact(
  request: Request,
  env: Env,
  limiter: RateLimiter = limiterFor(env)
): Promise<Response> {
  if (!isOriginAllowed(request.headers.get("origin"), env)) {
    return json({ error: "This origin can't send messages here." }, 403);
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ error: "Send the message as JSON." }, 415);
  }
  if (!isDeliveryConfigured(env)) {
    return json(
      { error: "Messaging is offline right now. Reach out on GitHub instead." },
      503
    );
  }

  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
    return json({ error: "That message is too long." }, 413);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return json({ error: "The message couldn't be read. Try again." }, 400);
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0] ?? "form");
      fieldErrors[field] ??= issue.message;
    }
    return json({ error: "Check the highlighted fields.", fieldErrors }, 422);
  }

  // Bots that fill the honeypot get a convincing success and nothing is sent.
  if (parsed.data.company) return json({ ok: true });

  try {
    if (!(await limiter.hit(clientKey(request.headers)))) {
      return json(
        { error: "Too many messages. Try again in a few minutes." },
        429,
        { "Retry-After": String(RATE_LIMIT.windowSeconds) }
      );
    }
    await deliver(parsed.data, env);
  } catch (error) {
    console.error(
      "[contact] delivery failed",
      error instanceof Error ? error.message : error
    );
    return json(
      { error: "The message didn't go through. Try again shortly." },
      502
    );
  }

  return json({ ok: true });
}

export async function POST(request: Request): Promise<Response> {
  return handleContact(request, process.env);
}
