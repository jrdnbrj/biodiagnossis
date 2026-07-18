import type { Metadata } from 'next';
import { ExamCatalog } from '@/components/exam-catalog';
import { Breadcrumbs, JsonLd } from '@/components/ui';
import { ACTIVE_SERVICES } from '@/data/services';
import { breadcrumbSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('Exámenes de laboratorio', 'Consulte el catálogo de exámenes de BioDiagnossis en Quito, sus valores estimados y la preparación que debe confirmar antes de acudir.', '/examenes/');
export default function ExamsPage() { const crumbs = [{ name: 'Inicio', path: '/' }, { name: 'Exámenes', path: '/examenes/' }]; return <section className="page-shell"><JsonLd data={breadcrumbSchema(crumbs)} /><Breadcrumbs items={crumbs} /><p className="eyebrow">Catálogo de laboratorio</p><h1>Exámenes de laboratorio</h1><p className="page-intro">Revise los exámenes disponibles y sus valores estimados. Confirme por WhatsApp la preparación, disponibilidad y cotización final antes de acudir.</p><ExamCatalog services={ACTIVE_SERVICES} /></section>; }
