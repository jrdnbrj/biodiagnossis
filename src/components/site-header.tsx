import Link from 'next/link';
import { MapPin, Menu, Phone, X } from 'lucide-react';
import { NAVIGATION } from '@/data/business';
import { WhatsAppLink } from '@/components/ui';

export function SiteHeader() {
  return <><div className="utility-bar"><div className="container"><span><MapPin size={13} />Atención en Quito · La disponibilidad del servicio a domicilio se confirma por WhatsApp</span><a href="tel:+593983883998"><Phone size={13} />Llame al 098 388 3998</a></div></div><header className="site-header"><div className="container header-inner"><Link className="brand-logo" href="/" aria-label="BioDiagnossis, inicio"><img src="/brand/biodiagnossis-logo.jpg" alt="BioDiagnossis" /></Link><nav className="desktop-nav" aria-label="Navegación principal"><Link href="/">Inicio</Link>{NAVIGATION.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav><div className="header-action"><WhatsAppLink message="Hola, quisiera recibir información." className="button button-small button-primary">WhatsApp</WhatsAppLink></div><details className="mobile-menu"><summary aria-label="Abrir menú"><Menu className="open-icon" size={23} /><X className="close-icon" size={23} /></summary><nav aria-label="Navegación móvil"><Link href="/">Inicio</Link>{NAVIGATION.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}<WhatsAppLink message="Hola, quisiera recibir información." className="button button-primary">Escríbanos por WhatsApp</WhatsAppLink></nav></details></div></header></>;
}
