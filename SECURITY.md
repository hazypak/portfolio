# Static-Site Security Scope

## Production Posture

This project is a **frontend-only portfolio**. It has no deployed API routes, contact-form handler, user accounts, database access, payment flow, or user-supplied form fields. Therefore, public-endpoint rate limiting and server-side Zod input validation are not applicable to the current production surface.

The Vercel configuration applies browser-facing protections including a restrictive content-security policy, clickjacking protection, MIME-sniffing prevention, a restrictive permissions policy, same-origin opener and resource policies, and a strict referrer policy. The project uses environment variables only for platform-provided development proxies; no credential is referenced by the client application source.

## Future Interactive Endpoints

If a form, API, webhook, login, or database feature is added, it must be introduced through a server-backed project upgrade. The endpoint should then apply schema validation, explicit field allowlists, length limits, rate limiting, CSRF controls when cookies are used, and server-only secrets.
