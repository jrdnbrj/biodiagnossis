import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('Términos de uso', 'Términos de uso de BioDiagnossis.', '/terminos/', true);
export default function TermsPage() { return <section className="page-shell narrow legal"><p className="eyebrow">Información legal</p><h1>Términos de uso</h1><p className="legal-notice">Este texto es informativo y está pendiente de revisión jurídica antes de su publicación definitiva.</p><h2>Información publicada</h2><p>Los valores de exámenes publicados son estimaciones y deben confirmarse por WhatsApp para recibir una cotización final. La preparación y disponibilidad también requieren confirmación según la solicitud.</p><h2>Uso del sitio</h2><p>La información del sitio es orientativa y no sustituye la indicación de un profesional de salud.</p></section>; }
