export const SITE_URL = 'https://www.biodiagnossis.com';

export const BUSINESS = {
  name: 'BioDiagnossis',
  description:
    'Laboratorio clínico en Quito con atención presencial y coordinación de toma de muestras a domicilio.',
  city: 'Quito',
  country: 'Ecuador',
  phoneE164: '593983883998',
  phoneDisplay: '098 388 3998',
  email: 'laboratorioclinico@biodiagnossis.com',
  address: 'Joaquín Sumaita E10-13 y Esteban Meniz, sector El Inca, Quito, Ecuador',
  mapsUrl: 'https://maps.app.goo.gl/kLr2tPhxtqav5UHU7',
  social: {
    instagram: 'https://www.instagram.com/biodiagnossis?igsh=ZWkwd2VrejM4NzB4',
    facebook: 'https://www.facebook.com/share/192TgigmGL/',
  },
  hours: [
    { days: 'Lunes a viernes', value: '07:30–16:30' },
    { days: 'Sábados', value: '08:00–12:00' },
    { days: 'Domingos y feriados', value: 'Consulte disponibilidad' },
  ],
  homeCoverage:
    'La cobertura y disponibilidad se confirman según la dirección y el horario solicitado.',
} as const;

export const NAVIGATION = [
  { href: '/examenes/', label: 'Exámenes' },
  { href: '/atencion-domicilio-quito/', label: 'Domicilio' },
  { href: '/salud-ocupacional-empresas/', label: 'Empresas' },
  { href: '/sucursal/', label: 'Sucursal' },
  { href: '/preguntas-frecuentes/', label: 'Preguntas' },
] as const;

export const COMPANY_SERVICES = [
  'Perfiles de ingreso y periódicos según requerimiento',
  'Coordinación para grupos de colaboradores',
  'Toma de muestras en empresa sujeta a disponibilidad',
  'Cotización revisada por el equipo',
] as const;
