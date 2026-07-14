export const brand = {
  name: "ReVolt Energy",
  legal: "ReVolt Energy Group",
  tagline: "Australia's decentralised clean-energy network",
  description:
    "ReVolt Energy builds, owns and operates scalable, decentralised energy infrastructure, with battery energy storage at its core, enabling clean power to be generated, stored, and monetised at the edge.",
  url: "https://www.revolt.au",
};

export const nav = [
  { href: "/solutions", label: "Solutions" },
  { href: "/configurator", label: "BESS Configurator" },
  { href: "/partners", label: "Partners" },
  { href: "/investors", label: "Investors" },
  { href: "/blog", label: "Insights" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
];

export const advantages = [
  {
    title: "Decentralised by design",
    body: "Energy is generated, stored, monetised and managed closer to where it's needed most, reducing concentration risk across the NEM.",
    icon: "network" as const,
  },
  {
    title: "Fast-deploying infrastructure",
    body: "Modular BESS nodes accelerate site-by-site deployment, independent clean-energy assets that scale without waiting on mega-projects.",
    icon: "zap" as const,
  },
  {
    title: "AI-powered network",
    body: "Proprietary orchestration software monitors, optimises, and coordinates assets, dispatch, health, and portfolio intelligence at national scale.",
    icon: "brain" as const,
  },
];

export const solutions = [
  {
    id: "generation",
    title: "Generation",
    eyebrow: "01",
    summary:
      "Unlock clean-energy generation on underutilised land, rooftops and high-demand sites.",
    body: "ReVolt partners with landowners, developers and energy users to unlock generation opportunities, from ground-mounted solar to site-integrated renewables that support lower-cost, locally produced power.",
    points: [
      "Ground-mounted & rooftop solar",
      "Site-integrated renewables",
      "Landowner & developer partnerships",
    ],
  },
  {
    id: "storage",
    title: "Storage",
    eyebrow: "02",
    summary:
      "Modular BESS at the core, resilience, peak-cost protection, and revenue-ready assets.",
    body: "Battery storage is the backbone of the ReVolt platform. We deploy modular BESS that stores renewables, supports grid resilience, reduces peak exposure, and enables participation in Australia's decentralised energy shift.",
    points: [
      "Modular, scalable BESS",
      "Grid resilience & peak shaving",
      "Investable, revenue-generating assets",
    ],
  },
  {
    id: "trading",
    title: "Trading",
    eyebrow: "03",
    summary:
      "Convert stored energy into contracted and market-based commercial value.",
    body: "Physical infrastructure meets commercial pathways, Tier 1 offtake, wholesale market trading, PPAs and portfolio-level optimisation that turn electrons into durable revenue.",
    points: [
      "Tier 1 offtake arrangements",
      "Wholesale market participation",
      "PPAs & portfolio optimisation",
    ],
  },
  {
    id: "infrastructure",
    title: "Infrastructure OS",
    eyebrow: "04",
    summary:
      "AI-enabled orchestration for a national decentralised network.",
    body: "An intelligence layer for asset health, performance monitoring, dispatch optimisation and portfolio visibility, operating distributed energy with the speed and discipline the grid demands.",
    points: [
      "Asset health & performance",
      "Dispatch optimisation",
      "National portfolio visibility",
    ],
  },
];

export const partnerTypes = [
  "EPC developers",
  "Property owners",
  "Commercial & industrial sites",
  "Airports",
  "Data centre builders & operators",
  "Local councils",
];

export const networkNodes = [
  { id: "syd", name: "Sydney", x: 78, y: 62, mw: 42, status: "live" as const },
  { id: "mel", name: "Melbourne", x: 68, y: 78, mw: 38, status: "live" as const },
  { id: "bne", name: "Brisbane", x: 82, y: 42, mw: 28, status: "live" as const },
  { id: "adl", name: "Adelaide", x: 55, y: 68, mw: 18, status: "live" as const },
  { id: "per", name: "Perth", x: 12, y: 58, mw: 22, status: "deploying" as const },
  { id: "cbr", name: "Canberra", x: 74, y: 68, mw: 12, status: "live" as const },
  { id: "hba", name: "Hobart", x: 70, y: 92, mw: 8, status: "pipeline" as const },
  { id: "drw", name: "Darwin", x: 48, y: 12, mw: 15, status: "pipeline" as const },
  { id: "ncl", name: "Newcastle", x: 80, y: 56, mw: 16, status: "deploying" as const },
  { id: "twn", name: "Townsville", x: 74, y: 28, mw: 10, status: "pipeline" as const },
];

export const stats = [
  { label: "Network nodes (illustrative)", value: "10+", suffix: "" },
  { label: "Target markets", value: "NEM", suffix: "" },
  { label: "Core asset class", value: "BESS", suffix: "" },
  { label: "Deployment model", value: "Modular", suffix: "" },
];

export const blogPosts = [
  {
    slug: "decentralised-bess-australia-nem",
    title: "Why decentralised BESS is reshaping Australia's NEM",
    excerpt:
      "Modular battery nodes reduce concentration risk and accelerate clean-energy deployment site by site, without waiting on mega-projects alone.",
    date: "2026-06-12",
    category: "Infrastructure",
    readTime: "6 min",
  },
  {
    slug: "second-life-ev-batteries-storage",
    title: "Second-life EV batteries: storage capacity at lower carbon",
    excerpt:
      "Repurposed EV packs can accelerate BESS deployment with lower capex and embodied carbon, when engineered and orchestrated correctly.",
    date: "2026-05-28",
    category: "Technology",
    readTime: "5 min",
  },
  {
    slug: "hosting-a-clean-energy-node",
    title: "What it means to host a clean-energy node",
    excerpt:
      "Land, load, grid access, solar potential or EV demand, how underutilised sites become productive infrastructure in a decentralised network.",
    date: "2026-05-10",
    category: "Partners",
    readTime: "4 min",
  },
  {
    slug: "ai-orchestration-distributed-energy",
    title: "AI orchestration for distributed energy portfolios",
    excerpt:
      "From asset health to dispatch optimisation, how software turns a fleet of BESS into a coordinated virtual power plant.",
    date: "2026-04-22",
    category: "Software",
    readTime: "7 min",
  },
];

export const inquirySteps = [
  { id: "path", title: "How can we help?" },
  { id: "details", title: "Tell us about you" },
  { id: "site", title: "Site or capital context" },
  { id: "confirm", title: "Confirm & send" },
] as const;
