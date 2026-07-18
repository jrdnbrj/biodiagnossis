import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { BUSINESS, SITE_URL } from '@/data/business';
import { businessSchema } from '@/lib/schema';
import { JsonLd } from '@/components/ui';
import { SitePreferences } from '@/components/site-preferences';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'BioDiagnossis | Laboratorio clínico en Quito', template: '%s | BioDiagnossis' },
  description: BUSINESS.description,
  applicationName: BUSINESS.name,
  alternates: { canonical: '/' },
  openGraph: { type: 'website', locale: 'es_EC', siteName: BUSINESS.name, title: 'BioDiagnossis | Laboratorio clínico en Quito', description: BUSINESS.description, url: SITE_URL },
  twitter: { card: 'summary', title: 'BioDiagnossis | Laboratorio clínico en Quito', description: BUSINESS.description },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#0b5d88' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es-EC" suppressHydrationWarning><body className={inter.className}><JsonLd data={businessSchema} /><SiteHeader /><main>{children}</main><SiteFooter /><SitePreferences /></body></html>;
}
