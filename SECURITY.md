# Security

## Surface

- **Static site** (`dist/public`), served by Vercel with the headers in `vercel.json`:
  strict CSP (`script-src 'self'`, no inline or third-party scripts, `connect-src 'self'`),
  HSTS with preload, `X-Frame-Options: DENY`, `nosniff`, `strict-origin-when-cross-origin`
  referrer policy, a deny-by-default `Permissions-Policy`, and same-origin COOP/CORP.
- **One function**, `api/contact.ts`:
  - rejects cross-origin requests (allowlist: production domain, the deployment's own
    Vercel URLs, `ALLOWED_ORIGINS`; localhost outside production)
  - requires JSON, caps bodies at 8 KB, validates and normalises with Zod
  - strips control characters so names can't inject email headers
  - honeypot field: bot submissions get a fake success and nothing is sent
  - rate limit of 5 messages per IP per 10 minutes (Upstash when configured,
    per-instance memory otherwise)
  - forwards plain text only through Resend; visitor input is never rendered as HTML

## Configuration

All secrets are server-only Vercel environment variables. Never prefix them with `VITE_`,
which would bundle them into client JavaScript.

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL` | Required to enable the contact form |
| `CONTACT_FROM_EMAIL` | Optional verified sender |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Optional shared rate limiter |
| `ALLOWED_ORIGINS` | Optional extra comma-separated origins |

Without the required pair, `GET /api/contact` reports `enabled: false` and the page shows
direct links instead of a form.

## Checks

```bash
pnpm audit
pnpm test
```
