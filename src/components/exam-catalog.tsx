'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Service } from '@/types/site';
import { formatEstimatedPrice } from '@/lib/format';
import { whatsappUrl, quoteMessage } from '@/lib/whatsapp';

export function ExamCatalog({ services }: { services: readonly Service[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todas');
  const [selected, setSelected] = useState<string[]>([]);
  const categories = ['Todas', ...new Set(services.map((service) => service.category))];
  const filtered = useMemo(() => services.filter((service) => (category === 'Todas' || service.category === category) && service.name.toLowerCase().includes(query.toLowerCase())), [services, category, query]);
  const toggle = (slug: string) => setSelected((current) => current.includes(slug) ? current.filter((entry) => entry !== slug) : [...current, slug]);
  const selectedNames = services.filter((service) => selected.includes(service.slug)).map((service) => service.name);
  return <div className="catalog"><div className="catalog-controls"><label>Buscar examen<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ej. glucosa" /></label><label>Categoría<select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((entry) => <option key={entry}>{entry}</option>)}</select></label></div>{selected.length > 0 && <a className="selection-bar" href={whatsappUrl(quoteMessage(selectedNames))} target="_blank" rel="noreferrer">Solicitar cotización de {selected.length} {selected.length === 1 ? 'examen' : 'exámenes'}</a>}<div className="service-grid">{filtered.map((service) => <article className="service-card" key={service.slug}><div><p className="eyebrow">{service.category}</p><h3><Link href={`/examenes/${service.slug}/`}>{service.name}</Link></h3><p className="price">{formatEstimatedPrice(service.estimatedPrice)}</p><p className="muted">Valor referencial. Consulte por WhatsApp para una cotización final.</p></div><div className="card-actions"><Link href={`/examenes/${service.slug}/`} className="text-link">Ver preparación</Link><label className="check-label"><input type="checkbox" checked={selected.includes(service.slug)} onChange={() => toggle(service.slug)} />Incluir</label></div></article>)}</div>{filtered.length === 0 && <p className="empty-state">No encontramos exámenes con esa búsqueda. Escríbanos para orientarle.</p>}</div>;
}
