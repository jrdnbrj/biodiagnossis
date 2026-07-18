import type { Metadata } from 'next';
import { BranchDetails, Breadcrumbs, JsonLd, WhatsAppLink } from '@/components/ui';
import { breadcrumbSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('Sucursal BioDiagnossis en Quito', 'Encuentre la dirección, ubicación y horarios confirmados de la sucursal BioDiagnossis en el sector El Inca, Quito.', '/sucursal/');
export default function BranchPage() { const crumbs = [{ name: 'Inicio', path: '/' }, { name: 'Sucursal', path: '/sucursal/' }]; return <section className="page-shell narrow"><JsonLd data={breadcrumbSchema(crumbs)} /><Breadcrumbs items={crumbs} /><h1>Nuestra sucursal</h1><p className="page-intro">Visítenos en el sector El Inca, Quito. Confirme antes por WhatsApp la preparación de su examen.</p><BranchDetails /><WhatsAppLink message="Hola, quisiera confirmar información antes de acudir a la sucursal." >Consultar por WhatsApp</WhatsAppLink></section>; }
