import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/data/business';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots { const production = process.env.SITE_ENV === 'production'; return { rules: { userAgent: '*', allow: production ? '/' : undefined, disallow: production ? undefined : '/' }, sitemap: `${SITE_URL}/sitemap.xml` }; }
