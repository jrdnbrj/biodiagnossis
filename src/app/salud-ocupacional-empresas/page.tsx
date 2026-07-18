import type { Metadata } from 'next';
import { Building2, CalendarDays, Check, ShieldCheck, Stethoscope } from 'lucide-react';
import { COMPANY_SERVICES } from '@/data/business';
import { Breadcrumbs, JsonLd, WhatsAppLink } from '@/components/ui';
import { breadcrumbSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('Salud ocupacional para empresas', 'Coordine requerimientos de salud ocupacional para su empresa con BioDiagnossis en Quito. Consulte perfiles, grupos y cotizaciones por WhatsApp.', '/salud-ocupacional-empresas/');
const capabilities = [
  { title: 'Solicitud estructurada', description: 'Recopile datos clave antes de cotizar.', Icon: Building2 },
  { title: 'Coordinación', description: 'Fecha y disponibilidad revisadas para su solicitud.', Icon: CalendarDays },
  { title: 'Confidencialidad', description: 'Tratamiento cuidadoso de los datos compartidos.', Icon: ShieldCheck },
  { title: 'Alcance claro', description: 'Sin inventar perfiles ni requisitos clínicos.', Icon: Stethoscope },
] as const;

export default function CompaniesPage() { const crumbs = [{ name: 'Inicio', path: '/' }, { name: 'Salud ocupacional para empresas', path: '/salud-ocupacional-empresas/' }]; return <section className="original-company-page"><div className="page-shell"><JsonLd data={breadcrumbSchema(crumbs)} /><Breadcrumbs items={crumbs} /><div className="company-grid"><div><p className="eyebrow">Empresas</p><h1>Coordinación de servicios para salud ocupacional</h1><p className="page-intro">Cuéntenos el número de colaboradores, los exámenes requeridos, la ubicación y la fecha tentativa. Prepararemos una cotización según su requerimiento.</p><ul className="company-check-grid">{COMPANY_SERVICES.map((service) => <li key={service}><Check size={18} aria-hidden="true" /><span>{service}</span></li>)}</ul><WhatsAppLink message="Hola, quisiera consultar servicios de salud ocupacional para una empresa." className="button hero-whatsapp">Solicitar cotización empresarial</WhatsAppLink></div><div className="company-feature-grid">{capabilities.map(({ title, description, Icon }) => <article key={title}><Icon size={28} strokeWidth={2} aria-hidden="true" /><h3>{title}</h3><p>{description}</p></article>)}</div></div></div></section>; }
