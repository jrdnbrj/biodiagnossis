import Link from 'next/link';

export default function NotFound() { return <section className="page-shell narrow"><p className="eyebrow">404</p><h1>Esta página no está disponible</h1><p>Puede volver al inicio o revisar el catálogo de exámenes.</p><Link className="button button-primary" href="/examenes/">Ver exámenes</Link></section>; }
