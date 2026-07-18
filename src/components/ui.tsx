import Link from 'next/link';
import type { ReactNode } from 'react';
import { MessageCircle } from 'lucide-react';
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

export function SectionHeading({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return <div className="section-heading">{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2>{children && <p>{children}</p>}</div>;
}

export function BranchDetails() {
  return <div className="branch-card"><div><p className="eyebrow">Sucursal</p><h2>Laboratorio clínico en El Inca</h2><p>{BUSINESS.address}</p><a className="text-link" href={BUSINESS.mapsUrl} target="_blank" rel="noreferrer">Abrir ubicación en Google Maps</a></div><dl>{BUSINESS.hours.map((item) => <div key={item.days}><dt>{item.days}</dt><dd>{item.value}</dd></div>)}</dl></div>;
}
