# Design Direction: Obsidian Signal

## Ground-Truth Reference and Chosen Direction

The supplied portfolio reference is the ground truth for its dark editorial envelope: nearly black staging, large high-contrast display typography, unusually generous vertical breathing room, restrained navigation, and calm entrance motion. The requested Bento layout, glassmorphism cards, and pointer spotlight interactions are incorporated as the user’s explicit structural additions, while all copy, branding, components, and implementation remain original.

## Design Movement

**Quiet Technical Editorialism** — a synthesis of Apple’s product restraint, Vercel’s highly legible dark surfaces, and an engineer’s field notebook. The page should feel composed rather than decorated: visual energy accumulates around meaningful work, not ornamental chrome.

## Core Principles

1. Use a near-black field as deliberate negative space, letting the user’s projects read as illuminated instruments.
2. Let typography set the pace: large, tight headline forms followed by measured, readable supporting copy.
3. Treat each Bento card as a physical glass panel with a precise purpose, a concise data label, and enough air around its content.
4. Make interaction reveal material depth rather than add spectacle: light follows a pointer, card edges sharpen, and content arrives with a calm, controlled cadence.

## Color Philosophy

Obsidian black carries the interface and puts attention on content. Pearl text offers high contrast without looking clinical. Cool slate supports secondary information, while a single blue-violet signal color appears only in interactive glows, active elements, and fine technical details. The palette should feel nocturnal, capable, and quiet rather than neon or game-like.

## Layout Paradigm

The hero behaves as a large editorial title page with asymmetric supporting information at its edges. Below it, a flowing 12-column Bento field groups projects by discipline instead of using repetitive equal cards. The layout shifts deliberately to one vertical narrative on small screens, preserving project hierarchy and touch comfort.

## Signature Elements

1. A faint radial signal field and low-contrast micro-grid behind the hero and project area.
2. Frosted panels with a bounded blue-violet pointer spotlight that never competes with copy.
3. Tiny uppercase metadata labels paired with strong, sentence-case project titles.

## Interaction Philosophy and Animation

Interactions should confirm intent immediately. Links and buttons use clear focus rings and a small press response. Project cards respond to a pointer through CSS custom properties rather than animated layout changes. Sections enter once using transform and opacity with short, staggered spring timing; all optional movement is reduced for users who request reduced motion.

## Typography System

Use a Geist-like geometric sans-serif with a resilient system fallback. Display text is tightly tracked, substantially larger than UI copy, and uses high-weight contrast. Eyebrows and metadata are compact uppercase labels with increased tracking. Body copy is comfortable at 16–18 px with muted contrast and generous line height.

## Brand Essence

**An early-career AI engineer’s technical portfolio for people who value shipped systems over vague ambition.**

Personality: **precise, ambitious, composed.**

## Brand Voice

Headlines should be direct, technically grounded, and confident without hype. Calls to action should describe the next action plainly.

> “Autonomous systems, deployed with intent.”

> “Explore selected work.”

## Wordmark, Logo, and Signature Brand Color

The mark is a compact orbit-and-node glyph: three deliberate circular nodes connected by two angled paths, suggesting an agent network and signal routing without using text. It appears at a clearly legible scale in the header and favicon.

The signature brand color is **Signal Iris — #8B7CFF**.

## Style Decisions

1. Hero and major section openers use a high-contrast condensed display treatment; project titles remain direct, sentence-case, and visibly stronger than metadata.
2. Every major Bento card carries a project-specific technical artifact—routing graph, deployment trace, pipeline cadence, delivery map, commerce flow, world signal, or node lattice—rather than relying on a generic atmospheric motif.
3. Signal Iris is reserved for active elements, technical nodes, focus details, selected numerals, and meaningful data marks; it is not used as a broad decorative fill.
