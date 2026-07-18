'use client';

import { useEffect, useState } from 'react';
import { Languages, Moon, Sun } from 'lucide-react';

type Locale = 'es' | 'en';

const translations: Record<string, string> = {
  'Exámenes': 'Tests', 'Domicilio': 'Home service', 'Empresas': 'Companies', 'Sucursal': 'Location', 'Preguntas': 'FAQ', 'WhatsApp': 'WhatsApp',
  'Escríbanos por WhatsApp': 'Message us on WhatsApp', 'Atención presencial': 'In-person care', 'Laboratorio clínico en Quito': 'Clinical laboratory in Quito',
  'Información clara para sus exámenes y su cuidado.': 'Clear information for your tests and care.',
  'Conozca nuestros exámenes, consulte valores estimados y coordine su atención presencial o a domicilio por WhatsApp.': 'Explore our tests, review estimated prices, and coordinate in-person or home service through WhatsApp.',
  'Ver exámenes': 'View tests', 'Los valores publicados son estimaciones. Escríbanos para una cotización final.': 'Published prices are estimates. Message us for a final quote.',
  'El Inca, Quito': 'El Inca, Quito', 'Ver ubicación': 'View location', 'Cómo podemos ayudarle': 'How we can help', 'Atención pensada para resolver sus dudas': 'Care designed to answer your questions',
  'Antes de realizarse un examen, confirme por WhatsApp los requisitos aplicables a su solicitud.': 'Before your test, confirm the requirements for your request on WhatsApp.',
  'Exámenes y preparación': 'Tests and preparation', 'Revise el catálogo y consulte la preparación antes de acudir.': 'Review the catalogue and ask about preparation before visiting.',
  'Envíe su solicitud y coordinaremos cobertura, fecha y horario.': 'Send your request and we will coordinate coverage, date, and time.',
  'Coordine requerimientos de salud ocupacional con nuestro equipo.': 'Coordinate occupational health requirements with our team.',
  'Catálogo': 'Catalogue', 'Exámenes destacados': 'Featured tests', 'Valores referenciales en dólares estadounidenses.': 'Reference values in US dollars.',
  'Consulte por WhatsApp para una cotización final.': 'Ask on WhatsApp for a final quote.', 'Ver todo el catálogo': 'View full catalogue',
  'Laboratorio clínico en El Inca': 'Clinical laboratory in El Inca', 'Abrir ubicación en Google Maps': 'Open location in Google Maps',
  'Lunes a viernes': 'Monday to Friday', 'Sábados': 'Saturdays', 'Domingos y feriados': 'Sundays and holidays', 'Consulte disponibilidad': 'Ask about availability',
  'Preguntas frecuentes': 'Frequently asked questions', 'Lo esencial antes de coordinar': 'What to know before coordinating', 'Ver todas las preguntas': 'View all questions',
  '¿Necesita orientación antes de acudir?': 'Need guidance before visiting?', 'Escríbanos por WhatsApp con el examen o servicio que necesita.': 'Message us on WhatsApp with the test or service you need.', 'Escríbanos': 'Message us',
  'Catálogo de laboratorio': 'Laboratory catalogue', 'Exámenes de laboratorio': 'Laboratory tests', 'Buscar examen': 'Search for a test', 'Categoría': 'Category', 'Todas': 'All', 'Incluir': 'Add', 'Ver preparación': 'View preparation',
  'Valor referencial. Consulte por WhatsApp para una cotización final.': 'Reference value. Ask on WhatsApp for a final quote.', 'Consulte el valor': 'Ask for the price', 'Estimado:': 'Estimated:',
  'Nombre completo': 'Full name', 'Teléfono': 'Phone', 'Dirección': 'Address', 'Exámenes que necesita': 'Tests you need', 'Fecha u horario preferido': 'Preferred date or time', '(opcional)': '(optional)', 'Continuar por WhatsApp': 'Continue on WhatsApp',
  'Se abrirá WhatsApp con su solicitud. La cobertura y disponibilidad se confirmarán por ese medio.': 'WhatsApp will open with your request. Coverage and availability will be confirmed there.',
  'Contacto': 'Contact', 'Síganos': 'Follow us', 'Enlaces': 'Links', 'Privacidad': 'Privacy', 'Términos': 'Terms', 'Instagram': 'Instagram', 'Facebook': 'Facebook',
  'Preparación para exámenes': 'Test preparation', 'Preparación': 'Preparation', 'Consultar este examen': 'Ask about this test', 'Ver otros exámenes': 'View other tests',
  'Para empresas': 'For companies', 'Salud ocupacional para empresas': 'Occupational health for companies', 'Nuestra sucursal': 'Our location',
  'Información legal': 'Legal information', 'Política de privacidad': 'Privacy policy', 'Términos de uso': 'Terms of use',
};

function translateText(root: ParentNode, locale: Locale) {
  const dictionary = locale === 'en' ? translations : Object.fromEntries(Object.entries(translations).map(([spanish, english]) => [english, spanish]));
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  nodes.forEach((node) => { const value = node.nodeValue?.trim() ?? ''; if (dictionary[value]) node.nodeValue = node.nodeValue?.replace(value, dictionary[value]) ?? null; });
  root.querySelectorAll<HTMLElement>('[placeholder]').forEach((element) => { const placeholder = element.getAttribute('placeholder'); if (placeholder && dictionary[placeholder]) element.setAttribute('placeholder', dictionary[placeholder]); });
}

export function SitePreferences() {
  const [locale, setLocale] = useState<Locale>(() => typeof window === 'undefined' ? 'es' : (localStorage.getItem('biodiagnossis-locale') as Locale | null) === 'en' ? 'en' : 'es');
  const [dark, setDark] = useState(() => typeof window !== 'undefined' && localStorage.getItem('biodiagnossis-theme') === 'dark');
  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light'; localStorage.setItem('biodiagnossis-theme', dark ? 'dark' : 'light'); }, [dark]);
  useEffect(() => { document.documentElement.lang = locale === 'es' ? 'es-EC' : 'en'; localStorage.setItem('biodiagnossis-locale', locale); translateText(document.body, locale); }, [locale]);
  return <div className="site-preferences" aria-label="Site preferences"><button type="button" onClick={() => setLocale((current) => current === 'es' ? 'en' : 'es')} aria-label="Change language"><Languages size={16} /><span>{locale === 'es' ? 'EN' : 'ES'}</span></button><button type="button" onClick={() => setDark((current) => !current)} aria-label={dark ? 'Use light theme' : 'Use dark theme'}>{dark ? <Sun size={16} /> : <Moon size={16} />}</button></div>;
}
