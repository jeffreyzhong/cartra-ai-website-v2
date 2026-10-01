import type { MetadataRoute } from 'next';
import { absoluteUrl, SITEMAP_ROUTES } from './lib/seo';

const LOW_PRIORITY_ROUTES = new Set(['/support', '/privacy', '/terms']);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return SITEMAP_ROUTES.map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority:
      route === '/'
        ? 1
        : route === '/agent-systems'
          ? 0.8
          : LOW_PRIORITY_ROUTES.has(route)
            ? 0.3
            : 0.7,
  }));
}
