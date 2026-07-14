import { brand, blogPosts } from "./content";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.legal,
    alternateName: brand.name,
    url: brand.url,
    description: brand.description,
    areaServed: {
      "@type": "Country",
      name: "Australia",
    },
    knowsAbout: [
      "Battery Energy Storage Systems",
      "Decentralised energy",
      "Virtual power plants",
      "Renewable energy infrastructure",
      "National Electricity Market",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.name,
    url: brand.url,
    description: brand.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${brand.url}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function blogListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${brand.name} Insights`,
    description: "Clean energy infrastructure, BESS, and decentralised networks.",
    blogPost: blogPosts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      datePublished: p.date,
      description: p.excerpt,
      url: `${brand.url}/blog/${p.slug}`,
    })),
  };
}

export function faqSchema(
  items: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
