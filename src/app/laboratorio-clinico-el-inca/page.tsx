import type { Metadata } from 'next';
import { BranchDetails, Breadcrumbs, JsonLd, WhatsAppLink } from '@/components/ui';
import { breadcrumbSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('Laboratorio clínico en El Inca', 'Encuentre la sucursal de BioDiagnossis en el sector El Inca, Quito, sus horarios confirmados y la ubicación para llegar.', '/laboratorio-clinico-el-inca/');
export default function ElIncaPage() { const crumbs = [{ name: 'Inicio', path: '/' }, { name: 'Laboratorio clínico en El Inca', path: '/laboratorio-clinico-el-inca/' }]; return <section className="page-shell narrow"><JsonLd data={breadcrumbSchema(crumbs)} /><Breadcrumbs items={crumbs} /><p className="eyebrow">Sector El Inca</p><h1>Laboratorio clínico en El Inca</h1><p className="page-intro">Visite nuestra sucursal en Quito. Antes de acudir, confirme por WhatsApp la preparación necesaria para el examen que requiere.</p><BranchDetails /><div className="inline-actions"><WhatsAppLink message="Hola, quisiera confirmar información antes de acudir a la sucursal." >Consultar por WhatsApp</WhatsAppLink></div></section>; }
