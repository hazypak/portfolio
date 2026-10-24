import { describe, expect, it, vi } from "vitest";
import {
  RATE_LIMIT,
  cleanText,
  clientKey,
  contactSchema,
  createMemoryLimiter,
  handleContact,
  isOriginAllowed,
  type RateLimiter,
} from "../api/contact";

const configured = {
  RESEND_API_KEY: "test-key",
  CONTACT_TO_EMAIL: "inbox@example.test",
  VERCEL_ENV: "production",
};
const valid = {
  name: "Aisha Rahman",
  email: "Aisha@Example.com",
  message: "We need a booking portal for three branches.",
};
const allowAll: RateLimiter = { hit: async () => true };

function request(body: unknown, headers: Record<string, string> = {}) {
  return new Request("https://hazqeel.vercel.app/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "https://hazqeel.vercel.app",
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("cleanText", () => {
  it("collapses whitespace and strips control characters in single-line fields", () => {
    expect(cleanText("  Aisha\r\nBcc: evil@x.test\u0000 ")).toBe(
      "Aisha Bcc: evil@x.test"
    );
  });

  it("keeps paragraph breaks but caps blank-line runs in multiline fields", () => {
    expect(cleanText("Hello\n\n\n\nWorld\u0007", { multiline: true })).toBe(
      "Hello\n\nWorld"
    );
  });
});

describe("contactSchema", () => {
  it("normalizes a valid submission", () => {
    const result = contactSchema.parse(valid);
    expect(result.email).toBe("aisha@example.com");
    expect(result.company).toBe("");
  });

  it("rejects short messages and malformed emails", () => {
    const result = contactSchema.safeParse({
      ...valid,
      email: "nope",
      message: "hi",
    });
    expect(result.success).toBe(false);
    const fields = result.success
      ? []
      : result.error.issues.map(issue => issue.path[0]);
    expect(fields).toEqual(expect.arrayContaining(["email", "message"]));
  });
});

describe("isOriginAllowed", () => {
  it("accepts the canonical origin and rejects foreign ones in production", () => {
    expect(isOriginAllowed("https://hazqeel.vercel.app", configured)).toBe(
      true
    );
    expect(isOriginAllowed("https://evil.example", configured)).toBe(false);
    expect(isOriginAllowed("http://localhost:3000", configured)).toBe(false);
  });

  it("accepts the deployment's own preview URL and localhost outside production", () => {
    const preview = {
      VERCEL_ENV: "preview",
      VERCEL_URL: "portfolio-abc.vercel.app",
    };
    expect(isOriginAllowed("https://portfolio-abc.vercel.app", preview)).toBe(
      true
    );
    expect(isOriginAllowed("http://localhost:3000", preview)).toBe(true);
  });
});

describe("clientKey", () => {
  it("uses the first forwarded address", () => {
    expect(
      clientKey(new Headers({ "x-forwarded-for": "203.0.113.7, 10.0.0.1" }))
    ).toBe("203.0.113.7");
  });
});

describe("createMemoryLimiter", () => {
  it("blocks after the budget and resets after the window", async () => {
    let now = 0;
    const limiter = createMemoryLimiter(() => now);
    for (let i = 0; i < RATE_LIMIT.max; i++)
      expect(await limiter.hit("ip")).toBe(true);
    expect(await limiter.hit("ip")).toBe(false);
    now += RATE_LIMIT.windowSeconds * 1000;
    expect(await limiter.hit("ip")).toBe(true);
  });
});

describe("handleContact", () => {
  it("refuses foreign origins before doing any work", async () => {
    const res = await handleContact(
      request(valid, { origin: "https://evil.example" }),
      configured,
      allowAll
    );
    expect(res.status).toBe(403);
  });

  it("reports 503 when delivery is not configured", async () => {
    const res = await handleContact(
      request(valid),
      { VERCEL_ENV: "production" },
      allowAll
    );
    expect(res.status).toBe(503);
  });

  it("returns field errors for invalid input", async () => {
    const res = await handleContact(
      request({ ...valid, message: "short" }),
      configured,
      allowAll
    );
    expect(res.status).toBe(422);
    expect((await res.json()).fieldErrors.message).toBeDefined();
  });

  it("rejects oversized bodies", async () => {
    const res = await handleContact(
      request({ ...valid, message: "x".repeat(9000) }),
      configured,
      allowAll
    );
    expect(res.status).toBe(413);
  });

  it("silently accepts honeypot submissions without sending", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const res = await handleContact(
      request({ ...valid, company: "Bot LLC" }),
      configured,
      allowAll
    );
    expect(res.status).toBe(200);
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });

  it("returns 429 when the limiter is exhausted", async () => {
    const res = await handleContact(request(valid), configured, {
      hit: async () => false,
    });
    expect(res.status).toBe(429);
  });

  it("sends a plain-text email with the visitor as reply-to", async () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response("{}", { status: 200 }));
    const res = await handleContact(request(valid), configured, allowAll);
    expect(res.status).toBe(200);
    const body = JSON.parse(String(fetchSpy.mock.calls[0]?.[1]?.body));
    expect(body.reply_to).toBe("aisha@example.com");
    expect(body.html).toBeUndefined();
    fetchSpy.mockRestore();
  });
});
