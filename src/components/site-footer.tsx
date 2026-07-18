import Link from 'next/link';
import { Facebook, Instagram, MapPin } from 'lucide-react';
import { BUSINESS } from '@/data/business';

export function SiteFooter() {
  return <footer className="site-footer"><div className="container footer-grid"><div><Link className="wordmark" href="/"><span>Bio</span>Diagnossis</Link><p>{BUSINESS.description}</p><a className="footer-location" href={BUSINESS.mapsUrl} target="_blank" rel="noreferrer"><MapPin size={17} />{BUSINESS.address}</a></div><div><p className="footer-title">Enlaces</p><Link href="/examenes/">Exámenes</Link><Link href="/atencion-domicilio-quito/">Atención a domicilio</Link><Link href="/sucursal/">Sucursal</Link><Link href="/contacto/">Contacto</Link></div><div><p className="footer-title">Síganos</p><div className="social-links"><a href={BUSINESS.social.instagram} target="_blank" rel="noreferrer" aria-label="BioDiagnossis en Instagram"><Instagram size={20} />Instagram</a><a href={BUSINESS.social.facebook} target="_blank" rel="noreferrer" aria-label="BioDiagnossis en Facebook"><Facebook size={20} />Facebook</a></div></div></div><div className="container footer-bottom"><p>© {new Date().getFullYear()} BioDiagnossis.</p><span><Link href="/privacidad/">Privacidad</Link><Link href="/terminos/">Términos</Link></span></div></footer>;
}
