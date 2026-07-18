import type { Metadata } from 'next';
import { BranchDetails, Breadcrumbs, JsonLd } from '@/components/ui';
import { breadcrumbSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('Sucursal BioDiagnossis en Quito', 'Encuentre la dirección, ubicación y horarios confirmados de la sucursal BioDiagnossis en el sector El Inca, Quito.', '/sucursal/');
export default function BranchPage() { const crumbs = [{ name: 'Inicio', path: '/' }, { name: 'Sucursal', path: '/sucursal/' }]; return <section className="page-shell original-branch-page"><JsonLd data={breadcrumbSchema(crumbs)} /><Breadcrumbs items={crumbs} /><p className="eyebrow">Sucursal</p><h1>Visítenos en el sector El Inca</h1><p className="page-intro">Revise la ubicación y el horario. Para evitar desplazamientos innecesarios, confirme previamente la disponibilidad del examen.</p><BranchDetails /></section>; }
