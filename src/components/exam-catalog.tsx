'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { MessageCircle, Search, X } from 'lucide-react';
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
  const estimatedTotal = services.filter((service) => selected.includes(service.slug)).reduce((total, service) => total + (service.estimatedPrice ?? 0), 0);
  return <div className="catalog"><div className="catalog-controls"><label className="catalog-search"><Search size={20} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busque por nombre o categoría" /></label><label className="catalog-select"><select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((entry) => <option key={entry}>{entry}</option>)}</select></label></div><div className="service-grid">{filtered.map((service) => { const isSelected = selected.includes(service.slug); return <article className="service-card" key={service.slug}><div className="service-card-top"><span className="service-category">{service.category}</span><p className="price">{formatEstimatedPrice(service.estimatedPrice)}</p></div><h3><Link href={`/examenes/${service.slug}/`}>{service.name}</Link></h3><p className="muted">{service.preparation}</p><div className="card-actions"><button type="button" className={isSelected ? 'add-service selected' : 'add-service'} onClick={() => toggle(service.slug)} aria-pressed={isSelected}>{isSelected ? 'Agregado' : 'Agregar'}</button><a className="consult-service" href={whatsappUrl(quoteMessage([service.name]))} target="_blank" rel="noreferrer"><MessageCircle size={17} />Consultar</a></div></article>; })}</div>{selected.length > 0 && <aside className="selection-dock"><div><strong>{selected.length} {selected.length === 1 ? 'examen seleccionado' : 'exámenes seleccionados'}</strong><span>Suma referencial: US$ {estimatedTotal.toFixed(2)}. Confirme condiciones y valor final.</span></div><button type="button" onClick={() => setSelected([])}><X size={16} />Limpiar</button><a href={whatsappUrl(quoteMessage(selectedNames))} target="_blank" rel="noreferrer"><MessageCircle size={18} />Confirmar por WhatsApp</a></aside>}{filtered.length === 0 && <p className="empty-state">No encontramos exámenes con esa búsqueda. Escríbanos para orientarle.</p>}</div>;
}
