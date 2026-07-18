import type { Metadata } from 'next';
import { HomeServiceForm } from '@/components/home-service-form';
import { Breadcrumbs, JsonLd } from '@/components/ui';
import { BUSINESS } from '@/data/business';
import { breadcrumbSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('Atención a domicilio en Quito', 'Solicite coordinación de toma de muestras a domicilio en Quito con BioDiagnossis. La cobertura, fecha y horario se confirman por WhatsApp.', '/atencion-domicilio-quito/');
export default function HomeServicePage() { const crumbs = [{ name: 'Inicio', path: '/' }, { name: 'Atención a domicilio', path: '/atencion-domicilio-quito/' }]; return <section className="page-shell original-home-page"><JsonLd data={breadcrumbSchema(crumbs)} /><Breadcrumbs items={crumbs} /><div className="two-column"><div><p className="eyebrow">Atención a domicilio</p><h1>Solicite revisión para una toma de muestras en casa</h1><p className="page-intro">Comparta los datos iniciales. {BUSINESS.homeCoverage}</p><ol className="numbered-steps"><li>Indique los exámenes o envíe una foto legible de la orden por WhatsApp.</li><li>Comparta sector o ubicación y una fecha preferida.</li><li>Espere la revisión y confirmación de disponibilidad.</li></ol><div className="coverage-note"><h3>Cobertura</h3><p>{BUSINESS.homeCoverage}</p></div></div><HomeServiceForm /></div></section>; }
