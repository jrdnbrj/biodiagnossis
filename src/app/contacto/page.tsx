import type { Metadata } from 'next';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Breadcrumbs, JsonLd, WhatsAppLink } from '@/components/ui';
import { BUSINESS } from '@/data/business';
import { breadcrumbSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('Contacto', 'Contacte a BioDiagnossis en Quito por WhatsApp, teléfono o correo. Consulte la ubicación de nuestra sucursal en El Inca.', '/contacto/');
export default function ContactPage() { const crumbs = [{ name: 'Inicio', path: '/' }, { name: 'Contacto', path: '/contacto/' }]; return <section className="page-shell narrow"><JsonLd data={breadcrumbSchema(crumbs)} /><Breadcrumbs items={crumbs} /><h1>Contacto</h1><p className="page-intro">Escríbanos para consultas sobre exámenes, preparación, atención a domicilio o cotizaciones.</p><div className="contact-list"><a href={`tel:+${BUSINESS.phoneE164}`}><Phone />{BUSINESS.phoneDisplay}</a><a href={`mailto:${BUSINESS.email}`}><Mail />{BUSINESS.email}</a><a href={BUSINESS.mapsUrl} target="_blank" rel="noreferrer"><MapPin />{BUSINESS.address}</a></div><WhatsAppLink message="Hola, quisiera recibir información." >Escríbanos por WhatsApp</WhatsAppLink></section>; }
