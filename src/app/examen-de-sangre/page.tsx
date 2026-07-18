import type { Metadata } from 'next';
import Link from 'next/link';
import { ACTIVE_SERVICES } from '@/data/services';
import { Breadcrumbs, JsonLd, WhatsAppLink } from '@/components/ui';
import { breadcrumbSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('Exámenes de sangre en Quito', 'Consulte exámenes de hematología, química sanguínea y perfiles disponibles en BioDiagnossis. Confirme la preparación y cotización final por WhatsApp.', '/examen-de-sangre/');
export default function BloodPage() { const services = ACTIVE_SERVICES.filter((service) => ['Hematología', 'Química sanguínea', 'Perfiles'].includes(service.category)); const crumbs = [{ name: 'Inicio', path: '/' }, { name: 'Exámenes de sangre', path: '/examen-de-sangre/' }]; return <section className="page-shell"><JsonLd data={breadcrumbSchema(crumbs)} /><Breadcrumbs items={crumbs} /><h1>Exámenes de sangre en Quito</h1><p className="page-intro">Revise algunos exámenes disponibles. La preparación depende de cada solicitud y debe confirmarse antes de la toma.</p><div className="link-list">{services.map((service) => <Link key={service.slug} href={`/examenes/${service.slug}/`}>{service.name}<span>{service.category}</span></Link>)}</div><WhatsAppLink message="Hola, quisiera consultar sobre un examen de sangre." >Consultar por WhatsApp</WhatsAppLink></section>; }
