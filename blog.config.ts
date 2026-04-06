export interface BlogConfig {
  name: string;
  description: string;
  site: string;
  language: string;
  niche: string;
  colors: { primary: string; accent: string };
  analytics: { plausibleDomain: string };
  author: {
    name: string;
    url: string;
    sameAs: string[];
  };
  product: {
    name: string;
    url: string;
    description: string;
    ctaText: string;
  };
}

const config: BlogConfig = {
  name: "FlipPress Blog",
  description: "Default FlipPress blog template",
  site: "https://example.com",
  language: "en",
  niche: "technology",
  colors: { primary: "#6366f1", accent: "#22d3ee" },
  analytics: { plausibleDomain: "example.com" },
  author: {
    name: "FlipFactory Editorial Team",
    url: "https://flipfactory.it.com/about",
    sameAs: [
      "https://www.linkedin.com/company/flipfactory",
    ],
  },
  product: {
    name: "FlipFactory",
    url: "https://flipfactory.it.com",
    description: "AI automation agency — we build custom AI agents, n8n workflows, and MCP servers.",
    ctaText: "Get a Free Consultation",
  },
};

export default config;
