import type { Metadata } from 'next';
import { FAQS } from '@/data/faqs';
import { Breadcrumbs, JsonLd, WhatsAppLink } from '@/components/ui';
import { breadcrumbSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('Preguntas frecuentes', 'Respuestas a preguntas frecuentes sobre exámenes, preparación, precios estimados y atención a domicilio de BioDiagnossis en Quito.', '/preguntas-frecuentes/');
export default function FaqPage() { const crumbs = [{ name: 'Inicio', path: '/' }, { name: 'Preguntas frecuentes', path: '/preguntas-frecuentes/' }]; return <section className="page-shell narrow"><JsonLd data={breadcrumbSchema(crumbs)} /><Breadcrumbs items={crumbs} /><h1>Preguntas frecuentes</h1><p className="page-intro">Si no encuentra su respuesta, escríbanos por WhatsApp con el examen o servicio que necesita.</p><div className="faq-list">{FAQS.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div><WhatsAppLink message="Hola, tengo una consulta sobre un examen o servicio." >Hacer una consulta</WhatsAppLink></section>; }
