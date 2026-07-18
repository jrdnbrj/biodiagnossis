import type { Metadata } from 'next';
import Link from 'next/link';
import { ACTIVE_SERVICES } from '@/data/services';
import { Breadcrumbs, JsonLd, WhatsAppLink } from '@/components/ui';
import { breadcrumbSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('Preparación para exámenes', 'Consulte la preparación general disponible para exámenes de BioDiagnossis y confirme los requisitos específicos de su solicitud por WhatsApp.', '/preparacion-examenes/');
export default function PreparationPage() { const crumbs = [{ name: 'Inicio', path: '/' }, { name: 'Preparación para exámenes', path: '/preparacion-examenes/' }]; return <section className="page-shell"><JsonLd data={breadcrumbSchema(crumbs)} /><Breadcrumbs items={crumbs} /><h1>Preparación para exámenes</h1><p className="page-intro">Cada examen puede requerir una preparación distinta. Esta información es orientativa: confirme siempre su caso antes de la toma.</p><div className="prep-list">{ACTIVE_SERVICES.map((service) => <article key={service.slug}><h2><Link href={`/examenes/${service.slug}/`}>{service.name}</Link></h2><p>{service.preparation}</p></article>)}</div><WhatsAppLink message="Hola, quisiera confirmar la preparación de un examen." >Confirmar preparación por WhatsApp</WhatsAppLink></section>; }
