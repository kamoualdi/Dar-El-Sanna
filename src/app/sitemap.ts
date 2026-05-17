import { MetadataRoute } from 'next';
import { products } from '../data/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.darelsanna.ma';

  // Pages statiques
  const staticRoutes = [
    '',
    '/collections',
    '/collections/bijouterie',
    '/collections/horlogerie',
    '/collections/parfumerie',
    '/collections/antiquites',
    '/cgu',
    '/faq',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Pages dynamiques des produits
  const dynamicRoutes = products.map((product) => ({
    url: `${baseUrl}/collections/${product.category}/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
