import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { NAVIGATION } from '@/data/business';
import { WhatsAppLink } from '@/components/ui';

export function SiteHeader() {
  return <header className="site-header"><div className="container header-inner"><Link className="wordmark" href="/" aria-label="BioDiagnossis, inicio"><span>Bio</span>Diagnossis</Link><nav className="desktop-nav" aria-label="Navegación principal">{NAVIGATION.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav><div className="header-action"><WhatsAppLink message="Hola, quisiera recibir información." className="button button-small button-primary">WhatsApp</WhatsAppLink></div><details className="mobile-menu"><summary aria-label="Abrir menú"><Menu className="open-icon" size={23} /><X className="close-icon" size={23} /></summary><nav aria-label="Navegación móvil">{NAVIGATION.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}<WhatsAppLink message="Hola, quisiera recibir información." className="button button-primary">Escríbanos por WhatsApp</WhatsAppLink></nav></details></div></header>;
}
