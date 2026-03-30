import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import blogConfig from '../../blog.config.ts';

export async function GET(context: any) {
  const posts = await getCollection('blog');
  return rss({
    title: blogConfig.name,
    description: blogConfig.description,
    site: context.site,
    items: posts
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/blog/${post.slug}/`,
      })),
  });
}
