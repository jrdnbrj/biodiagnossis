import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ACTIVE_SERVICES, getServiceBySlug } from '@/data/services';
import { Breadcrumbs, JsonLd, WhatsAppLink } from '@/components/ui';
import { formatEstimatedPrice } from '@/lib/format';
import { breadcrumbSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';
import { quoteMessage } from '@/lib/whatsapp';

export function generateStaticParams() { return ACTIVE_SERVICES.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const service = getServiceBySlug(slug); return service ? pageMetadata(`${service.name} en Quito`, `Consulte el valor estimado y confirme la preparación de ${service.name} con BioDiagnossis en Quito.`, `/examenes/${service.slug}/`) : {}; }
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const service = getServiceBySlug(slug); if (!service) notFound(); const crumbs = [{ name: 'Inicio', path: '/' }, { name: 'Exámenes', path: '/examenes/' }, { name: service.name, path: `/examenes/${service.slug}/` }]; return <section className="page-shell narrow"><JsonLd data={breadcrumbSchema(crumbs)} /><Breadcrumbs items={crumbs} /><p className="eyebrow">{service.category}</p><h1>{service.name}</h1><p className="price price-large">{formatEstimatedPrice(service.estimatedPrice)}</p><p className="page-intro">Este es un valor estimado. Escríbanos por WhatsApp para confirmar la cotización final, la disponibilidad y los requisitos de su solicitud.</p><div className="info-panel"><h2>Preparación</h2><p>{service.preparation}</p></div><div className="inline-actions"><WhatsAppLink message={quoteMessage([service.name])}>Consultar este examen</WhatsAppLink><Link className="button button-secondary" href="/examenes/">Ver otros exámenes</Link></div></section>; }
