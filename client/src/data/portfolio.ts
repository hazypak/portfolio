/**
 * All portfolio copy lives here so content can change without touching layout.
 * Only list URLs that are publicly reachable; leave `href` out for private work.
 */
export type ProjectSize = "wide" | "narrow" | "full";

export interface PortfolioProject {
  id: string;
  title: string;
  /** What kind of system this is, shown as the card's eyebrow. */
  kind: string;
  role: string;
  location?: string;
  summary: string;
  highlights?: readonly string[];
  tags: readonly string[];
  href?: string;
  size: ProjectSize;
}

export interface ProjectGroup {
  id: string;
  /** Anchor target; the first group is #work. */
  anchor?: string;
  eyebrow: string;
  title: string;
  description: string;
  projects: readonly PortfolioProject[];
}

export interface Engagement {
  role: string;
  org: string;
  scope: string;
  location?: string;
  /** Optional, e.g. "2025 — now". Rendered only when present. */
  period?: string;
}

export interface SpecRow {
  label: string;
  value: string;
  href?: string;
}

export const profile = {
  firstName: "Muhammad",
  lastName: "Hazqeel",
  familyName: "Abdullah",
  role: "Full-stack developer & AI systems builder",
  location: "United Arab Emirates",
  intro:
    "I build the booking portals, CRMs, web infrastructure and AI systems that businesses run on, and I stay on to keep them running after launch.",
  github: "https://github.com/hazypak",
} as const;

/**
 * Stored in two parts and joined in the browser, so the address isn't sitting
 * in the HTML for scrapers.
 */
const emailParts = ["muh.hazqeel", "gmail.com"] as const;
export const contactEmail = () => emailParts.join("@");

export const specSheet: readonly SpecRow[] = [
  {
    label: "Shipped",
    value: "Shabab Al Khor booking portal + CRM",
    href: "https://shababalkhor.vercel.app/",
  },
  {
    label: "Maintaining",
    value: "virgolubes.com: SEO, analytics, DNS, hosting",
    href: "https://www.virgolubes.com/",
  },
  { label: "Studying", value: "A-Level Mathematics, Physics, Chemistry" },
  {
    label: "Certified",
    value: "Oracle OCI AI Foundations · 1 Million Prompters",
  },
];

export const groups: readonly ProjectGroup[] = [
  {
    id: "featured",
    anchor: "work",
    eyebrow: "Featured work",
    title: "Shipped and live",
    description:
      "Systems you can open right now: a booking platform, a marketplace, a decoder, a game and this lab.",
    projects: [
      {
        id: "shabab-al-khor",
        title: "Shabab Al Khor Mobility Car Wash",
        kind: "Booking portal + CRM",
        role: "Full-stack developer & solutions architect",
        location: "Khorfakkan, UAE",
        summary:
          "An end-to-end appointment system: customers pick a slot, book and pay online, and staff run the day from a custom CRM that updates the schedule in real time.",
        highlights: [
          "Online payments built into the booking flow",
          "Real-time scheduling that prevents double-booked bays",
          "Custom CRM with customer and visit history",
        ],
        tags: [
          "Booking flows",
          "Online payments",
          "Real-time scheduling",
          "CRM",
        ],
        href: "https://shababalkhor.vercel.app/",
        size: "wide",
      },
      {
        id: "micro-freelance-hub",
        title: "Micro Freelance Hub",
        kind: "Marketplace platform",
        role: "Solo full-stack build",
        summary:
          "A full-stack marketplace where students post and pick up small freelance jobs, with proposals, submissions and role-based dashboards. Every table is locked down with Postgres row-level security.",
        tags: ["Next.js", "Supabase", "Postgres RLS", "Auth"],
        href: "https://micro-freelance-hub.vercel.app/",
        size: "narrow",
      },
      {
        id: "chassis-decoder",
        title: "Chassis Decoder",
        kind: "Automotive VIN decoder",
        role: "Design, build & deployment",
        summary:
          "Turns a VIN or chassis number into readable vehicle and build data. Shipped to production with a custom domain, SSL and Search Console indexing.",
        tags: ["VIN decoding", "Automotive data", "Production"],
        href: "https://chassis-decoder.vercel.app/",
        size: "narrow",
      },
      {
        id: "pixel-planet-healers",
        title: "Pixel Planet Healers",
        kind: "Interactive environmental game",
        role: "Game design & development",
        summary:
          "A browser game where players restore a damaged world. Every action feeds back into the environment, so eco-restoration plays as a system rather than a story you read.",
        tags: ["Web game", "Game systems", "Eco-restoration"],
        href: "https://pixel-planet-healers.lovable.app/",
        size: "wide",
      },
      {
        id: "developer-lab",
        title: "Developer Portfolio / Lab",
        kind: "This site",
        role: "Design, engineering & security",
        summary:
          "The site you're on: a Vite + React build with a strict content security policy, a rate-limited contact API, and an anime.js exploded view of an AI system.",
        tags: ["React", "anime.js", "Vercel Functions", "CSP"],
        href: "https://hazqeel.vercel.app/",
        size: "full",
      },
    ],
  },
  {
    id: "more-systems",
    eyebrow: "More systems",
    title: "Infrastructure, automation & game servers",
    description:
      "Client infrastructure, background pipelines and the multiplayer servers I architect and maintain.",
    projects: [
      {
        id: "virgo-lubes",
        title: "Virgo Lubes",
        kind: "Corporate web & infrastructure",
        role: "Digital infrastructure lead & web developer",
        summary:
          "Built and deployed the corporate site, then took ownership of everything around it: technical Google SEO, custom analytics, domains, DNS records and hosting.",
        tags: ["Technical SEO", "Web analytics", "DNS & domains", "Hosting"],
        href: "https://www.virgolubes.com/",
        size: "wide",
      },
      {
        id: "minecraft-roblox",
        title: "Minecraft & Roblox development",
        kind: "Game servers & scripting",
        role: "Server architect & plugin developer",
        summary:
          "Java server architecture for the Nodes SMP network with custom Spigot and Paper plugins, plus gameplay scripting in Lua for Roblox.",
        tags: ["Java", "Spigot / Paper", "Lua", "Roblox"],
        size: "narrow",
      },
      {
        id: "agent-networks",
        title: "Autonomous agent networks",
        kind: "Local AI orchestration",
        role: "Builder",
        summary:
          "Local multi-agent workflows that route tasks and call open-weight models through Ollama, turning repetitive operations into unattended runs.",
        tags: ["Ollama", "Multi-agent", "Automation"],
        size: "narrow",
      },
      {
        id: "content-engines",
        title: "Automated content engines",
        kind: "Scheduled cloud pipelines",
        role: "Builder",
        summary:
          "Scheduled cloud pipelines that generate, render and publish short-form video without a manual production step, alongside automated e-commerce order processing.",
        tags: ["Scheduling", "Rendering", "Order automation"],
        size: "wide",
      },
    ],
  },
];

export const engagements: readonly Engagement[] = [
  {
    role: "Full-stack developer & solutions architect",
    org: "Shabab Al Khor Mobility Car Wash",
    location: "Khorfakkan, UAE",
    scope: "Booking portal, payments, real-time scheduling and a custom CRM.",
  },
  {
    role: "Digital infrastructure lead & web developer",
    org: "Virgo Lubes",
    scope:
      "Corporate website, technical SEO, analytics, domains, DNS and hosting.",
  },
  {
    role: "Server architect & plugin developer",
    org: "Nodes SMP",
    scope:
      "Java multiplayer infrastructure, Spigot/Paper plugins and community bots.",
  },
];

export const credentials = {
  track: "A-Level STEM: Mathematics, Physics, Chemistry",
  goal: "Aiming for a B.Sc. in Artificial Intelligence at MBZUAI (Mohamed bin Zayed University of Artificial Intelligence).",
} as const;

export interface Certificate {
  id: string;
  badge: string;
  title: string;
  note: string;
  issuer: string;
  /** Name exactly as printed on the certificate. */
  holder: string;
  /** Extra detail rows shown under issuer and holder. */
  details?: readonly (readonly [string, string])[];
  /** ISO dates; omitted when the certificate doesn't print them. */
  issued?: string;
  validUntil?: string;
  credentialId?: string;
  image: string;
  imageSmall: string;
  imageWidth: number;
  imageHeight: number;
  pdf: string;
  downloadName: string;
}

/** Transcribed from the issued certificates in /certificates. Nothing is inferred. */
export const certificates: readonly Certificate[] = [
  {
    id: "oracle-oci-ai-foundations",
    badge: "Oracle Certified Foundations Associate",
    title:
      "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    note: "Earned through Oracle's Race to AI programme.",
    issuer: "Oracle University",
    holder: "Muhammad Hazqeel Abdullah",
    issued: "2025-10-29",
    validUntil: "2027-10-29",
    credentialId: "323400890OCI25AICFA",
    image: "/certificates/oracle-oci-ai-foundations-2025.webp",
    imageSmall: "/certificates/oracle-oci-ai-foundations-2025-900.webp",
    imageWidth: 1800,
    imageHeight: 1265,
    pdf: "/certificates/oracle-oci-ai-foundations-2025.pdf",
    downloadName: "Hazqeel-Oracle-OCI-AI-Foundations-2025.pdf",
  },
  {
    id: "one-million-prompters",
    badge: "Certificate of Completion",
    title: "One Million Prompters",
    note: "Dubai's initiative, launched by His Highness Sheikh Hamdan bin Mohammed bin Rashid Al Maktoum, Crown Prince of Dubai, to train one million people in prompt engineering for AI systems, in line with the Dubai Universal Blueprint for Artificial Intelligence.",
    issuer:
      "Dubai Future Foundation · Dubai Centre for Artificial Intelligence",
    holder: "Muhammad Hazqeel",
    details: [["Focus", "Prompt engineering for AI systems"]],
    image: "/certificates/one-million-prompters.webp",
    imageSmall: "/certificates/one-million-prompters-900.webp",
    imageWidth: 1800,
    imageHeight: 1274,
    pdf: "/certificates/one-million-prompters.pdf",
    downloadName: "Hazqeel-One-Million-Prompters.pdf",
  },
];

export const projectCount = groups.reduce(
  (total, group) => total + group.projects.length,
  0
);
