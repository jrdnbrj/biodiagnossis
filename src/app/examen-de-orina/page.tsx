import type { Metadata } from 'next';
import Link from 'next/link';
import { getServiceBySlug } from '@/data/services';
import { Breadcrumbs, JsonLd, WhatsAppLink } from '@/components/ui';
import { breadcrumbSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('Examen de orina en Quito', 'Consulte el uroanálisis disponible en BioDiagnossis y confirme por WhatsApp las instrucciones de recolección antes de tomar la muestra.', '/examen-de-orina/');
export default function UrinePage() { const service = getServiceBySlug('uroanalisis'); const crumbs = [{ name: 'Inicio', path: '/' }, { name: 'Examen de orina', path: '/examen-de-orina/' }]; return <section className="page-shell narrow"><JsonLd data={breadcrumbSchema(crumbs)} /><Breadcrumbs items={crumbs} /><h1>Examen de orina en Quito</h1><p className="page-intro">Antes de tomar la muestra, solicite por WhatsApp las instrucciones de recolección y el recipiente correspondiente.</p>{service && <div className="info-panel"><h2>{service.name}</h2><p>{service.preparation}</p><Link className="text-link" href={`/examenes/${service.slug}/`}>Ver información del uroanálisis</Link></div>}<WhatsAppLink message="Hola, quisiera consultar sobre un examen de orina." >Consultar por WhatsApp</WhatsAppLink></section>; }
