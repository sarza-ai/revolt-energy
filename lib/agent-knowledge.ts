import {
  brand,
  advantages,
  solutions,
  partnerTypes,
  blogPosts,
  networkNodes,
} from "./content";

/**
 * Canonical knowledge base for the on-site agent.
 * Keep answers grounded here for the on-site text agent.
 */
export function buildAgentKnowledge(): string {
  const totalMw = networkNodes.reduce((s, n) => s + n.mw, 0);
  const live = networkNodes.filter((n) => n.status === "live").length;

  return `
# ReVolt Energy — site knowledge base

## Company
- Legal / brand: ${brand.legal} (trading as ${brand.name})
- Tagline: ${brand.tagline}
- Description: ${brand.description}
- Website: ${brand.url}
- Focus market: Australia's National Electricity Market (NEM)
- Model: Build, own and operate scalable decentralised energy infrastructure
- Core asset: Battery Energy Storage Systems (BESS) at the edge

## What ReVolt does
ReVolt builds, owns and operates modular clean-energy infrastructure so power can be generated, stored and monetised closer to demand. The platform combines generation, storage, trading pathways and an AI-enabled orchestration layer.

## Advantages
${advantages.map((a) => `- ${a.title}: ${a.body}`).join("\n")}

## Four pillars (solutions suite)
${solutions
  .map(
    (s) =>
      `### ${s.title}\n${s.summary}\n${s.body}\nPoints: ${s.points.join("; ")}`,
  )
  .join("\n\n")}

## Partners
ReVolt works with: ${partnerTypes.join(", ")}.
If you have land, load, grid access, solar potential, energy demand, or a site that could support battery storage, solar or EV fast-charging, ReVolt wants to hear from you.
Sites of interest include underutilised land/rooftops, significant load, grid connection opportunity, solar resource, EV demand, and council/airport/industrial precincts.
Partner inquiry: /contact?path=partner

## Investors
ReVolt seeks capital partners for modular, investable, revenue-generating BESS infrastructure.
Themes: modular & deployable nodes, revenue pathways (offtake, wholesale, PPAs), AI orchestration leverage, sovereign Australian energy transition.
Investor inquiry: /contact?path=investor

## Illustrative network (not a live portfolio claim)
- Example cities / nodes: ${networkNodes.map((n) => `${n.name} (${n.mw} MW, ${n.status})`).join("; ")}
- Illustrative live nodes: ${live}; illustrative capacity sum: ${totalMw} MW
Always label network figures as illustrative when discussing them.

## Illustrative growth path (2026–2034, not a forecast)
Expansion scenarios discussed on the site include growth from foundation sites (~40 MW / few nodes in 2026) toward a mature mesh (illustrative multi-GW-scale trajectory into the 2030s). These are discussion scenarios only, not forecasts or offers of securities.

## BESS Configurator
Interactive mock tool at /configurator. Users can size power (MW), duration (hours), region, and use case. Outputs (MWh, module count, footprint) are illustrative only; not a formal quote.

## Insights / blog topics
${blogPosts.map((p) => `- ${p.title}: ${p.excerpt}`).join("\n")}

## Contact
Multi-step inquiry form at /contact with paths: partner, investor, general.
Primary CTAs: Partner / host a node, Investor inquiry.

## Agent notes
- Write clearly and professionally; Australian English spelling (decentralised, monetised, optimises).
- If asked something outside this knowledge, say you only know what's on the ReVolt site and suggest Contact.
- Do not invent pricing, signed contracts, or guaranteed returns.
- For human follow-up, direct to /contact.
`.trim();
}

export const AGENT_SYSTEM_PROMPT = `You are the ReVolt Energy site assistant, a helpful text chat agent embedded on the ReVolt Energy website.

Rules:
1. Answer ONLY using the knowledge base below (and general safe definitions of BESS/NEM if needed).
2. Prefer concise answers (2–5 short paragraphs or bullets). Use Australian English.
3. Never invent financial returns, live portfolio stats, or confidential deals. Call out illustrative figures.
4. For partnership or investment interest, invite them to use the contact form (/contact?path=partner or /contact?path=investor).
5. If unsure, say so and point to the relevant page (Solutions, Partners, Investors, Configurator, Contact).
6. Tone: trustworthy infrastructure company, modern, clear. Not salesy hype.

KNOWLEDGE BASE:
${buildAgentKnowledge()}
`;

/** Offline / no-API fallback using simple keyword retrieval over knowledge chunks */
export function localAgentAnswer(userMessage: string): string {
  const q = userMessage.toLowerCase();
  const chunks: { keys: string[]; answer: string }[] = [
    {
      keys: ["who", "what is revolt", "about", "company", "do you do"],
      answer: `${brand.description} ReVolt focuses on Australia's NEM with a build–own–operate model and BESS at the core.`,
    },
    {
      keys: ["bess", "battery", "storage"],
      answer:
        "Battery storage is the backbone of ReVolt. Modular BESS nodes store renewables, support grid resilience, reduce peak exposure, and can participate in market and offtake pathways. Explore the suite under Solutions → Storage, or try the illustrative BESS Configurator.",
    },
    {
      keys: ["partner", "host", "land", "site", "council", "airport", "data centre", "data center"],
      answer: `ReVolt partners with ${partnerTypes.join(", ")}. If you have land, load, grid access, solar potential or EV demand, you can host or co-develop a clean-energy node. Start at /contact?path=partner.`,
    },
    {
      keys: ["invest", "capital", "fund", "return"],
      answer:
        "ReVolt engages investors around modular, investable BESS infrastructure with generation, trading and orchestration layers. The site does not publish guaranteed returns. For investor conversations use /contact?path=investor.",
    },
    {
      keys: ["generation", "solar"],
      answer:
        "Generation pillar: ReVolt unlocks clean generation on underutilised land, rooftops and high-demand sites, from ground-mounted solar to site-integrated renewables, with landowner and developer partnerships.",
    },
    {
      keys: ["trading", "ppa", "offtake", "wholesale"],
      answer:
        "Trading pillar: Tier 1 offtake, wholesale market participation, PPAs and portfolio optimisation convert stored energy into commercial value.",
    },
    {
      keys: ["ai", "orchestr", "software", "vpp"],
      answer:
        "Infrastructure OS / AI orchestration monitors asset health, optimises dispatch and provides portfolio visibility across distributed energy assets—operating the network with speed and discipline.",
    },
    {
      keys: ["configurator", "size", "mw", "configure"],
      answer:
        "The BESS Configurator at /configurator is an interactive mock to explore power, duration, region and use case. Outputs are illustrative only—not a formal quote. Request an engineered proposal via Contact.",
    },
    {
      keys: ["contact", "talk", "email", "call", "speak"],
      answer:
        "Use the multi-step form at /contact. Choose Partner, Investor or General and the team will route your inquiry.",
    },
    {
      keys: ["nem", "australia", "market"],
      answer:
        "ReVolt is focused on Australia's National Electricity Market (NEM), deploying modular nodes site-by-site to reduce concentration risk and accelerate the clean-energy transition.",
    },
    {
      keys: ["advantage", "why"],
      answer: advantages.map((a) => `• ${a.title}: ${a.body}`).join("\n"),
    },
    {
      keys: ["hello", "hi", "hey", "help"],
      answer:
        "Hi — I'm the ReVolt Energy site assistant. Ask me about BESS, partners, investors, solutions, the configurator, or how to get in touch.",
    },
  ];

  let best = chunks[chunks.length - 1];
  let bestScore = 0;
  for (const c of chunks) {
    let score = 0;
    for (const k of c.keys) {
      if (q.includes(k)) score += k.length;
    }
    if (score > bestScore) {
      bestScore = score;
      best = c;
    }
  }

  if (bestScore === 0) {
    return "I can answer from ReVolt's public site content (company, solutions, partners, investors, configurator, contact). Try asking about BESS, hosting a node, or investment. For anything else, use /contact.";
  }

  return best.answer;
}
