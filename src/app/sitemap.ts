import type { MetadataRoute } from 'next';
import { MOCK_LISTINGS } from '@/data/mock-listings';

export const dynamic = 'force-static';

const BASE_URL = 'https://krishrealestate.com.au';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/buy',
    '/rent',
    '/sell',
    '/sold',
    '/property-management',
    '/team',
    '/areas',
    '/contact',
    '/sell/property-appraisal',
    '/rental-appraisal',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const areaRoutes = ['wollert', 'epping', 'craigieburn', 'donnybrook'].map((slug) => ({
    url: `${BASE_URL}/areas/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const propertyRoutes = MOCK_LISTINGS.map((listing) => ({
    url: `${BASE_URL}/property/${listing.slug}`,
    lastModified: listing.updatedAt || new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...areaRoutes, ...propertyRoutes];
}
