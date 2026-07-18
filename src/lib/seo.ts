import type { Metadata } from 'next';
import { BUSINESS, SITE_URL } from '@/data/business';

export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString();
}

export function pageMetadata(title: string, description: string, path: string, noIndex = false): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: { title, description, url: absoluteUrl(path), locale: 'es_EC', type: 'website', siteName: BUSINESS.name },
    twitter: { card: 'summary', title, description },
  };
}
