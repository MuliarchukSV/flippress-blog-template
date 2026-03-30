export interface BlogConfig {
  name: string;
  description: string;
  site: string;
  language: string;
  niche: string;
  colors: { primary: string; accent: string };
  analytics: { plausibleDomain: string };
}

const config: BlogConfig = {
  name: "FlipPress Blog",
  description: "Default FlipPress blog template",
  site: "https://example.com",
  language: "en",
  niche: "technology",
  colors: { primary: "#6366f1", accent: "#22d3ee" },
  analytics: { plausibleDomain: "example.com" },
};

export default config;
