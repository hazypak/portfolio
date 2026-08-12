# Enhancement Checklist

- [x] Replace the generated orbit mark with the supplied Neural Anchor identity and configure it as the favicon.
- [x] Update visible portfolio identity to Muhammad Hazqeel and align the hero, subtitle, and academic copy with the supplied matrix.
- [x] Add a desktop-only inverted circular cursor using `mix-blend-mode: difference` with a native-touch fallback.
- [x] Add accessible, motion-aware hover tooltips for the logo/profile, studio/agency route, and music/recommendations interaction.
- [x] Refine the project cards to match the completed project matrix while retaining the existing spotlight behavior.
- [x] Verify the revised desktop and mobile interface, cursor behavior, TypeScript checking, and production build.
- [ ] Save a final checkpoint and hand off the enhanced portfolio version.

## Hero Refactor Checklist

- [x] Add a session-aware three-second intro splash with a refined exit transition.
- [x] Rebuild the hero as a four-corner viewport composition with no excessive desktop or tablet dead space.
- [x] Add a massive centered display title and the Neural Anchor logo badge with inversion, scale, and tooltip behavior.
- [x] Place header navigation, call booking, bottom-left CTAs, and bottom-right bio/sound-check content in their specified regions.
- [x] Validate the rebuilt hero across desktop, tablet, and mobile before checkpointing the update.

## Motion, Controls, and Metrics Upgrade Checklist

- [x] Verify the current package availability and compatible installation route for Anime.js, Motion, Kokonut UI, and Bklit UI.
- [x] Build a reusable Anime.js text-entry and Motion exit splash component, preserving first-visit session behavior.
- [x] Upgrade the hero controls into particle-style glass actions and retain the four-corner layout with central logo-badge interaction.
- [x] Add a dark visual metrics Bento card with live-style deployment and inference analytics.
- [x] Verify type checking, production output, overflow resistance, and representative responsive views.

## Interactive Systems Showcase Upgrade Checklist

- [x] Confirm the existing dependency state and retain the current pnpm/Vite setup.
- [x] Add touch-safe handling and hover-capable-only styling to the existing hero brand link.
- [x] Create the technology marquee and global motion utility styles with reduced-motion support.
- [x] Create the particle-sphere, orbiting-agent ecosystem, and touch-friendly phone carousel components.
- [x] Place the marquee, globe, and mobile showcase at the approved portfolio section locations without changing `portfolio.ts`.
- [x] Validate desktop, tablet, and mobile layouts, TypeScript checking, and production output.

## Production SEO and Static-Security Hardening Checklist

- [x] Audit current document metadata, headings, images, crawler configuration, client-side dependencies, and public assets.
- [x] Add Vite-compatible title, description, canonical, Open Graph, and social metadata without changing the visual interface.
- [x] Add or refine semantic headings, descriptive image alternatives, a dark custom 404 page, and the existing language declaration.
- [x] Add robots, sitemap, llms, favicon, and static deployment header configuration suitable for a frontend-only site.
- [x] Audit for exposed secrets and client risks; document that this frontend has no API routes or user-input endpoints requiring rate limiting or schema validation.
- [x] Verify the final production build, runtime console, crawler files, and representative responsive route behavior.

## Vercel Deployment-Fix Checklist

- [x] Confirm filename and import casing for the Kokonut particle button on a Linux-compatible path.
- [x] Correct the broken import and remove unresolved analytics placeholders from the production document shell.
- [x] Run the exact Vercel build command locally and verify Vite produces the configured static output.
- [ ] Save the deployment-fix checkpoint and provide the redeploy steps.

## Complete Vercel Compatibility Audit Checklist

- [x] Compare every chart filename with its import paths using Linux case-sensitive rules.
- [x] Normalize chart imports and filenames consistently, including all transitive chart helpers.
- [x] Configure pnpm build-script approval metadata for the deployed Tailwind and esbuild dependencies.
- [x] Reproduce a clean Vercel-style dependency installation and production build locally.
- [x] Fix every newly exposed blocker, re-run the clean build, and save the deployment-ready checkpoint.

## ParticleButton Export Fail-Safe Checklist

- [x] Audit the current HeroSection import and Git-visible component file paths.
- [x] Inline a local reusable particle-control implementation into the existing hero component tree so no external Kokonut file path is required at build time.
- [x] Remove the obsolete ParticleButton import dependency and verify all references are resolved.
- [x] Run a clean exported build, save the repair, and provide precise redeploy guidance.

## Generated Visualization Cleanup Checklist

- [x] Find every active import of generated orbit, phone, and chart visualization component trees.
- [x] Replace active visual modules with self-contained portfolio components that have no nested local file dependencies.
- [x] Delete the obsolete generated visualization folders and remove their unused npm dependencies.
- [x] Verify a clean install and production build after the destructive cleanup, then save the deployment-safe version.
