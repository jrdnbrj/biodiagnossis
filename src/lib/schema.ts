import { BUSINESS, SITE_URL } from '@/data/business';

export const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: BUSINESS.name,
  url: SITE_URL,
  description: BUSINESS.description,
  telephone: `+${BUSINESS.phoneE164}`,
  email: BUSINESS.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Joaquín Sumaita E10-13 y Esteban Meniz, sector El Inca',
    addressLocality: BUSINESS.city,
    addressCountry: 'EC',
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:30', closes: '16:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '08:00', closes: '12:00' },
  ],
  sameAs: Object.values(BUSINESS.social),
};

export function breadcrumbSchema(items: ReadonlyArray<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: new URL(item.path, SITE_URL).toString(),
    })),
  };
}
