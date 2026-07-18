import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('Política de privacidad', 'Información de privacidad de BioDiagnossis.', '/privacidad/', true);
export default function PrivacyPage() { return <section className="page-shell narrow legal"><p className="eyebrow">Información legal</p><h1>Política de privacidad</h1><p className="legal-notice">Este texto es informativo y está pendiente de revisión jurídica antes de su publicación definitiva.</p><h2>Contacto</h2><p>Para consultas sobre el uso de sus datos personales, contáctenos por los canales publicados en esta página.</p><h2>Información de salud</h2><p>No solicite ni publique información clínica sensible en formularios públicos. Para consultas relacionadas con su atención, utilice los canales de contacto del laboratorio.</p></section>; }
