/**
 * Obsidian Signal style contract: typed content stays separate from the dark,
 * editorial glass interface so projects can evolve without structural edits.
 */
export type ProjectIcon =
  | "agents"
  | "cloud"
  | "content"
  | "client"
  | "commerce"
  | "game"
  | "server";

export type ProjectGroupId = "ai-cloud" | "client-work" | "products";

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  eyebrow: string;
  icon: ProjectIcon;
  tags: readonly string[];
  href?: string;
  image?: string;
}

export interface ProjectGroup {
  id: ProjectGroupId;
  number: string;
  title: string;
  description: string;
  projects: readonly PortfolioProject[];
}

export interface PortfolioLink {
  label: string;
  href: string;
}

export interface PortfolioData {
  profile: {
    name: string;
    headline: string;
    role: string;
    subtitle: string;
    email: string | null;
    github: string;
  };
  groups: readonly ProjectGroup[];
  academics: {
    currentTrack: string;
    targetInstitution: string;
    certification: string;
  };
  quickLinks: readonly PortfolioLink[];
}

const assetUrls = {
  agentNetwork: "/manus-storage/ai-agent-network-art_7ac05a43.jpg",
  cloudPlatform: "/manus-storage/cloud-platform-art_32bd2aa2.jpg",
  productsInfrastructure: "/manus-storage/products-infrastructure-art_7b40b82d.jpg",
} as const;

export const portfolio: PortfolioData = {
  profile: {
    name: "Muhammad Hazqeel",
    headline: "Muhammad Hazqeel",
    role: "15-Year-Old AI Engineer & Full-Stack Builder",
    subtitle:
      "A-Level STEM Student (Math, Physics, Chemistry) | Building Autonomous AI Networks, Cloud Infrastructure & Web Applications.",
    email: null,
    github: "https://github.com/hazypak",
  },
  groups: [
    {
      id: "ai-cloud",
      number: "01",
      title: "AI & cloud infrastructure",
      description: "Systems built to observe, automate, and move work from idea to deployment.",
      projects: [
        {
          id: "autonomous-agent-networks",
          title: "Autonomous AI Agent Networks",
          eyebrow: "Agent orchestration",
          description:
            "Designed and deployed local multi-agent workflows that route tasks, invoke open-weight models through Ollama, and turn repeated operations into autonomous runs.",
          icon: "agents",
          tags: ["Ollama", "Multi-agent", "Automation"],
          image: assetUrls.agentNetwork,
        },
        {
          id: "chassis-decoder",
          title: "Google Cloud Deployed Platform",
          eyebrow: "Chassis Decoder",
          description:
            "Took a custom vehicle chassis decoder from application build to a production GCP deployment, including DNS, SSL, custom routing, and Search Console indexing.",
          icon: "cloud",
          tags: ["GCP", "DNS + SSL", "Production"],
          href: "https://chassis-decoder.vercel.app/",
          image: assetUrls.cloudPlatform,
        },
        {
          id: "automated-content-engines",
          title: "Automated Content Engines",
          eyebrow: "Cloud scheduling",
          description:
            "Built scheduled cloud pipelines that generate, render, and publish short-form video assets without a manual production loop.",
          icon: "content",
          tags: ["Scheduling", "Rendering", "Pipelines"],
        },
      ],
    },
    {
      id: "client-work",
      number: "02",
      title: "Client work & ventures",
      description: "Commercial systems shaped around tangible delivery, growth, and operational leverage.",
      projects: [
        {
          id: "freelance-agency-work",
          title: "Freelance Web Development & Agency Work",
          eyebrow: "GHM Global Networks",
          description:
            "Delivered fast, production-ready client sites and connected practical AI automations to the business operations behind them.",
          icon: "client",
          tags: ["Web delivery", "Client systems", "AI automation"],
          href: "https://ghmglobalnetworks.vercel.app/",
        },
        {
          id: "ecommerce-operations",
          title: "E-Commerce & Dropshipping Operations",
          eyebrow: "Commercial systems",
          description:
            "Operated automated order-processing workflows across an e-commerce and dropshipping system built for repeatable execution.",
          icon: "commerce",
          tags: ["Operations", "Order flows", "Automation"],
        },
      ],
    },
    {
      id: "products",
      number: "03",
      title: "Products & game infrastructure",
      description: "Interactive experiments and the systems that keep connected worlds running.",
      projects: [
        {
          id: "pixel-planet-healers",
          title: "Pixel Planet Healers",
          eyebrow: "Interactive web game",
          description:
            "Built an interactive browser game where eco-restoration becomes a responsive, player-driven system rather than a static story.",
          icon: "game",
          tags: ["Web game", "Eco-restoration", "Interaction"],
          href: "https://pixel-planet-healers.lovable.app/",
          image: assetUrls.productsInfrastructure,
        },
        {
          id: "nodes-smp",
          title: "The Nodes SMP Infrastructure",
          eyebrow: "Java multiplayer network",
          description:
            "Designed Java Edition multiplayer infrastructure with network routing and community bot integrations for a connected server environment.",
          icon: "server",
          tags: ["Java Edition", "Network routing", "Bots"],
        },
      ],
    },
  ],
  academics: {
    currentTrack: "A-Level STEM Track — Mathematics, Physics, Chemistry",
    targetInstitution:
      "Target: B.Sc. in Artificial Intelligence at Mohamed bin Zayed University of Artificial Intelligence (MBZUAI)",
    certification:
      "Oracle Cloud Infrastructure (OCI) AI Foundations Associate — Oracle Race to AI Certified",
  },
  quickLinks: [
    { label: "Pixel Planet Healers", href: "https://pixel-planet-healers.lovable.app/" },
    { label: "GHM Global Networks", href: "https://ghmglobalnetworks.vercel.app/" },
    { label: "Chassis Decoder", href: "https://chassis-decoder.vercel.app/" },
  ],
};
