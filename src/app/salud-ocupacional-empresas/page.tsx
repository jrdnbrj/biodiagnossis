import type { Metadata } from 'next';
import { COMPANY_SERVICES } from '@/data/business';
import { Breadcrumbs, JsonLd, WhatsAppLink } from '@/components/ui';
import { breadcrumbSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('Salud ocupacional para empresas', 'Coordine requerimientos de salud ocupacional para su empresa con BioDiagnossis en Quito. Consulte perfiles, grupos y cotizaciones por WhatsApp.', '/salud-ocupacional-empresas/');
export default function CompaniesPage() { const crumbs = [{ name: 'Inicio', path: '/' }, { name: 'Salud ocupacional para empresas', path: '/salud-ocupacional-empresas/' }]; return <section className="page-shell narrow"><JsonLd data={breadcrumbSchema(crumbs)} /><Breadcrumbs items={crumbs} /><p className="eyebrow">Para empresas</p><h1>Salud ocupacional para empresas</h1><p className="page-intro">Cuéntenos qué necesita su organización y coordinaremos una cotización según el requerimiento.</p><ul className="check-list">{COMPANY_SERVICES.map((service) => <li key={service}>{service}</li>)}</ul><WhatsAppLink message="Hola, quisiera consultar servicios de salud ocupacional para una empresa." >Consultar para mi empresa</WhatsAppLink></section>; }
