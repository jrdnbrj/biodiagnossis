import type { Metadata } from 'next';
import { HomeServiceForm } from '@/components/home-service-form';
import { Breadcrumbs, JsonLd } from '@/components/ui';
import { BUSINESS } from '@/data/business';
import { breadcrumbSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('Atención a domicilio en Quito', 'Solicite coordinación de toma de muestras a domicilio en Quito con BioDiagnossis. La cobertura, fecha y horario se confirman por WhatsApp.', '/atencion-domicilio-quito/');
export default function HomeServicePage() { const crumbs = [{ name: 'Inicio', path: '/' }, { name: 'Atención a domicilio', path: '/atencion-domicilio-quito/' }]; return <section className="page-shell"><JsonLd data={breadcrumbSchema(crumbs)} /><Breadcrumbs items={crumbs} /><div className="two-column"><div><p className="eyebrow">Quito</p><h1>Atención a domicilio</h1><p className="page-intro">Envíenos su solicitud para coordinar una toma de muestras a domicilio. {BUSINESS.homeCoverage}</p><ol className="steps"><li>Comparta sus datos, dirección y los exámenes que necesita.</li><li>Confirme por WhatsApp los requisitos aplicables a su solicitud.</li><li>Coordinaremos la cobertura, fecha y horario disponibles.</li></ol></div><HomeServiceForm /></div></section>; }
