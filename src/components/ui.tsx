import Link from 'next/link';
import type { ReactNode } from 'react';
import { Clock3, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react';
import { BUSINESS } from '@/data/business';
import { whatsappUrl } from '@/lib/whatsapp';

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

export function WhatsAppLink({ message, children = 'Escríbanos por WhatsApp', className = 'button button-primary' }: { message: string; children?: ReactNode; className?: string }) {
  return <a className={className} href={whatsappUrl(message)} target="_blank" rel="noreferrer"><MessageCircle size={18} aria-hidden="true" />{children}</a>;
}

export function Breadcrumbs({ items }: { items: ReadonlyArray<{ name: string; path: string }> }) {
  return <nav className="breadcrumbs" aria-label="Ruta de navegación">{items.map((item, index) => <span key={item.path}>{index > 0 && <span aria-hidden="true">/</span>}{index === items.length - 1 ? <span aria-current="page">{item.name}</span> : <Link href={item.path}>{item.name}</Link>}</span>)}</nav>;
}

export function SectionHeading({ eyebrow, title, children, align = 'center' }: { eyebrow?: string; title: string; children?: ReactNode; align?: 'center' | 'left' }) {
  return <div className={`section-heading section-heading-${align}`}>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2>{children && <p>{children}</p>}</div>;
}

export function BranchDetails() {
  return <div className="branch-card original-branch-card"><div className="branch-details"><p className="branch-name">BioDiagnossis</p><div className="branch-detail"><MapPin aria-hidden="true" /><div><strong>Dirección</strong><span>{BUSINESS.address}</span></div></div><div className="branch-detail"><Clock3 aria-hidden="true" /><div><strong>Horarios</strong>{BUSINESS.hours.map((item) => <span key={item.days}><b>{item.days}:</b> {item.value}</span>)}</div></div><div className="branch-detail"><Phone aria-hidden="true" /><div><strong>Contacto</strong><a href={`tel:+${BUSINESS.phoneE164}`}>{BUSINESS.phoneDisplay}</a></div></div><div className="inline-actions"><a className="button primary-action" href={BUSINESS.mapsUrl} target="_blank" rel="noreferrer"><Navigation size={18} aria-hidden="true" />Cómo llegar</a><WhatsAppLink message="Hola, quisiera confirmar información antes de acudir a la sucursal." className="button button-secondary">Confirmar antes de ir</WhatsAppLink></div></div><iframe title="Ubicación de BioDiagnossis" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?q=${encodeURIComponent(BUSINESS.address)}&output=embed`} /></div>;
}
