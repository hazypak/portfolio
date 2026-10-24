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
  role: "Full-stack developer & solutions architect",
  location: "United Arab Emirates",
  intro:
    "I build the booking portals, CRMs and web infrastructure that small businesses run on, and I stay on to keep them running after launch.",
  github: "https://github.com/hazypak",
  studio: "https://ghmglobalnetworks.vercel.app/",
} as const;

export const specSheet: readonly SpecRow[] = [
  {
    label: "Building",
    value:
      "Booking portal + CRM for Shabab Al Khor Mobility Car Wash, Khorfakkan",
  },
  {
    label: "Maintaining",
    value: "virgolubes.com: SEO, analytics, DNS, hosting",
    href: "https://www.virgolubes.com/",
  },
  { label: "Studying", value: "A-Level Mathematics, Physics, Chemistry" },
  { label: "Certified", value: "Oracle OCI AI Foundations Associate" },
];

export const groups: readonly ProjectGroup[] = [
  {
    id: "client-systems",
    title: "Client systems",
    description:
      "Software for businesses that take bookings, sell products and need to be found online.",
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
        size: "wide",
      },
      {
        id: "virgo-lubes",
        title: "Virgo Lubes",
        kind: "Corporate web & infrastructure",
        role: "Digital infrastructure lead & web developer",
        summary:
          "Built and deployed the corporate site, then took ownership of everything around it: technical Google SEO, custom analytics, domains, DNS records and hosting.",
        tags: ["Technical SEO", "Web analytics", "DNS & domains", "Hosting"],
        href: "https://www.virgolubes.com/",
        size: "narrow",
      },
      {
        id: "ghm-global-networks",
        title: "GHM Global Networks",
        kind: "Web studio",
        role: "Founder & developer",
        summary:
          "My studio for client work: fast, production-ready sites with practical automations wired into the operations behind them.",
        tags: ["Client sites", "Automation", "Delivery"],
        href: "https://ghmglobalnetworks.vercel.app/",
        size: "narrow",
      },
      {
        id: "ecommerce-operations",
        title: "E-commerce operations",
        kind: "Commerce automation",
        role: "Operator & automation builder",
        summary:
          "Ran automated order-processing workflows for an e-commerce and dropshipping store, built so the same steps happen the same way every time.",
        tags: ["Order flows", "Automation", "Operations"],
        size: "wide",
      },
    ],
  },
  {
    id: "products",
    title: "Products",
    description: "Things I designed, built and shipped end to end.",
    projects: [
      {
        id: "micro-freelance-hub",
        title: "Micro-Freelance-Hub",
        kind: "Marketplace platform",
        role: "Solo full-stack build",
        summary:
          "A marketplace where students post and pick up small freelance jobs, with proposals, submissions and role-based dashboards. Every table is locked down with Postgres row-level security.",
        tags: ["Next.js", "Supabase", "Postgres RLS", "Auth"],
        href: "https://micro-freelance-hub.vercel.app/",
        size: "wide",
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
        size: "full",
      },
    ],
  },
  {
    id: "systems",
    title: "Automation & game infrastructure",
    description:
      "Background systems: game servers, agent workflows and publishing pipelines.",
    projects: [
      {
        id: "minecraft-roblox",
        title: "Minecraft & Roblox development",
        kind: "Game servers & scripting",
        role: "Server architect & plugin developer",
        summary:
          "Java server architecture for the Nodes SMP network, with custom Spigot and Paper plugins, network routing and community bots, plus gameplay scripting in Lua for Roblox.",
        tags: ["Java", "Spigot / Paper", "Lua", "Roblox"],
        size: "wide",
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
          "Scheduled cloud pipelines that generate, render and publish short-form video without a manual production step.",
        tags: ["Scheduling", "Rendering", "Pipelines"],
        size: "full",
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
    role: "Founder & developer",
    org: "GHM Global Networks",
    scope: "Client websites and the automations behind them.",
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
  certification: "Oracle Cloud Infrastructure AI Foundations Associate",
  certificationNote: "Earned through Oracle's Race to AI programme.",
} as const;

export const projectCount = groups.reduce(
  (total, group) => total + group.projects.length,
  0
);
