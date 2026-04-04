import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const sitemapUrl = new URL('sitemap-index.xml', context.site);
  return new Response(
`User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Amazonbot
Allow: /

Sitemap: ${sitemapUrl}
`);
}
