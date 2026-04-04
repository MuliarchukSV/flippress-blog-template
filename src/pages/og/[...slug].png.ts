import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import blogConfig from '../../../blog.config.ts';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.id.replace(/\.mdx?$/, '') },
    props: { title: post.data.title, tags: post.data.tags || [] },
  }));
}

export async function GET(context: APIContext) {
  const { title, tags } = context.props as { title: string; tags: string[] };
  const primary = blogConfig.colors.primary;
  const accent = blogConfig.colors.accent;

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          background: `linear-gradient(135deg, ${primary} 0%, ${darken(primary, 0.3)} 100%)`,
          fontFamily: 'sans-serif',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '48px',
                      fontWeight: 700,
                      color: '#ffffff',
                      lineHeight: 1.2,
                      maxHeight: '250px',
                      overflow: 'hidden',
                    },
                    children: title.length > 80 ? title.substring(0, 77) + '...' : title,
                  },
                },
                tags.length > 0
                  ? {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          gap: '10px',
                          flexWrap: 'wrap',
                        },
                        children: tags.slice(0, 3).map((tag: string) => ({
                          type: 'span',
                          props: {
                            style: {
                              background: accent,
                              color: '#ffffff',
                              padding: '6px 16px',
                              borderRadius: '20px',
                              fontSize: '20px',
                              fontWeight: 600,
                            },
                            children: tag,
                          },
                        })),
                      },
                    }
                  : { type: 'div', props: { children: '' } },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '28px',
                      fontWeight: 700,
                      color: 'rgba(255,255,255,0.9)',
                    },
                    children: blogConfig.name,
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '18px',
                      color: 'rgba(255,255,255,0.6)',
                    },
                    children: 'Powered by FlipPress',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'sans-serif',
          data: await loadFont(),
          weight: 400,
          style: 'normal',
        },
        {
          name: 'sans-serif',
          data: await loadFont(true),
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
  const png = resvg.render().asPng();

  return new Response(png, {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000' },
  });
}

function darken(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, Math.floor((num >> 16) * (1 - amount)));
  const g = Math.max(0, Math.floor(((num >> 8) & 0xff) * (1 - amount)));
  const b = Math.max(0, Math.floor((num & 0xff) * (1 - amount)));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

async function loadFont(bold = false): Promise<ArrayBuffer> {
  const weight = bold ? '700' : '400';
  const url = `https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-${weight}-normal.woff`;
  const res = await fetch(url);
  return res.arrayBuffer();
}
