import type { Metadata } from 'next';
import Link from 'next/link';
import { BranchDetails, Breadcrumbs, JsonLd, WhatsAppLink } from '@/components/ui';
import { breadcrumbSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('Laboratorio clínico en Quito', 'BioDiagnossis es un laboratorio clínico en Quito. Consulte exámenes, valores estimados, preparación y coordinación de atención a domicilio.', '/laboratorio-clinico-quito/');
export default function QuitoPage() { const crumbs = [{ name: 'Inicio', path: '/' }, { name: 'Laboratorio clínico en Quito', path: '/laboratorio-clinico-quito/' }]; return <section className="page-shell"><JsonLd data={breadcrumbSchema(crumbs)} /><Breadcrumbs items={crumbs} /><p className="eyebrow">Quito, Ecuador</p><h1>Laboratorio clínico en Quito</h1><p className="page-intro">En BioDiagnossis puede consultar exámenes de laboratorio, preparación y valores estimados. También puede solicitar coordinación de toma de muestras a domicilio.</p><div className="split"><BranchDetails /><div className="info-panel"><h2>Antes de acudir</h2><p>Confirme por WhatsApp los requisitos específicos del examen que necesita. La preparación y la disponibilidad pueden variar según su solicitud.</p><div className="inline-actions"><WhatsAppLink message="Hola, quisiera consultar información sobre exámenes." >Consultar por WhatsApp</WhatsAppLink><Link className="button button-secondary" href="/examenes/">Ver catálogo</Link></div></div></div></section>; }
