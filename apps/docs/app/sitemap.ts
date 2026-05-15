import type { MetadataRoute } from 'next';

const pages = ['/', '/icons', '/docs', '/guides', '/changelog'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return pages.map((route) => ({
    url: `https://thinicons.dev${route}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: route === '/' ? 1 : 0.8,
  }));
}
