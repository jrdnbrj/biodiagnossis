export const BUSINESS = {
  name: 'BioDiagnossis',
  legalName: 'BioDiagnossis',
  description:
    'Laboratorio clínico en Quito con atención presencial y coordinación de toma de muestras a domicilio.',
  city: 'Quito',
  country: 'Ecuador',
  countryCode: 'EC',
  phoneE164: '593983883998',
  phoneDisplay: '098 388 3998',
  email: 'laboratorioclinico@biodiagnossis.com',
  address:
    'Joaquín Sumaita E10-13 y Esteban Meniz, sector El Inca, Quito, Ecuador',
  mapsUrl: 'https://maps.app.goo.gl/kLr2tPhxtqav5UHU7',
  websiteUrl: 'https://www.biodiagnossis.com',
  logoUrl: '/logo-biodiagnossis.png',
  social: {
    instagram: '',
    facebook: '',
  },
  hours: [
    { days: 'Lunes a viernes', value: '07:30–16:30' },
    { days: 'Sábados', value: '08:00–12:00' },
    { days: 'Domingos y feriados', value: 'Consulte disponibilidad' },
  ],
  parking: '',
  accessibility: '',
  homeCoverage:
    'La cobertura y disponibilidad se confirman según la dirección y el horario solicitado.',
};

export const NAV_ITEMS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'servicios', label: 'Exámenes' },
  { id: 'domicilio', label: 'Domicilio' },
  { id: 'empresas', label: 'Empresas' },
  { id: 'sucursal', label: 'Sucursal' },
  { id: 'preguntas', label: 'Preguntas' },
];

export const INITIAL_SERVICES = [
  {
    id: 'biometria',
    name: 'Biometría hemática',
    category: 'Hematología',
    price: 8,
    preparation:
      'La preparación puede variar según la indicación recibida. Confírmela antes de acudir.',
    active: true,
  },
  {
    id: 'glucosa',
    name: 'Glucosa',
    category: 'Química sanguínea',
    price: 4,
    preparation: 'Consulte si su solicitud requiere ayuno y por cuántas horas.',
    active: true,
  },
  {
    id: 'urea',
    name: 'Urea',
    category: 'Química sanguínea',
    price: 4,
    preparation: 'Confirme los requisitos específicos antes de la toma.',
    active: true,
  },
  {
    id: 'creatinina',
    name: 'Creatinina',
    category: 'Química sanguínea',
    price: 4,
    preparation: 'Confirme los requisitos específicos antes de la toma.',
    active: true,
  },
  {
    id: 'perfil-lipidico',
    name: 'Perfil lipídico básico',
    category: 'Perfiles',
    price: 18,
    preparation:
      'Consulte previamente los requisitos de ayuno aplicables a su solicitud.',
    active: true,
  },
  {
    id: 'perfil-renal',
    name: 'Perfil renal básico',
    category: 'Perfiles',
    price: 15,
    preparation: 'Confirme la preparación correspondiente antes de acudir.',
    active: true,
  },
  {
    id: 'uroanalisis',
    name: 'Uroanálisis',
    category: 'Uroanálisis',
    price: 6,
    preparation:
      'Solicite instrucciones de recolección y recipiente antes de tomar la muestra.',
    active: true,
  },
  {
    id: 'coproparasitario',
    name: 'Coproparasitario',
    category: 'Parasitología',
    price: 6,
    preparation:
      'Solicite instrucciones de recolección y conservación de la muestra.',
    active: true,
  },
  {
    id: 'toxicologico-5',
    name: 'Panel toxicológico de 5 sustancias',
    category: 'Salud ocupacional',
    price: 25,
    preparation:
      'Consulte el alcance del panel, el tipo de muestra y los requisitos de identificación.',
    active: true,
  },
];

export const FAQS = [
  {
    question: '¿Necesito una orden médica para realizarme exámenes?',
    answer:
      'Depende del examen y del motivo de la solicitud. Escríbanos con el nombre del examen para orientarle sin asumir requisitos.',
  },
  {
    question: '¿Todos los exámenes requieren ayuno?',
    answer:
      'No. La preparación depende del examen solicitado. Confirme los requisitos antes de acudir o de coordinar una toma a domicilio.',
  },
  {
    question: '¿La atención a domicilio queda confirmada al enviar la solicitud?',
    answer:
      'No. La solicitud queda pendiente de revisión. El equipo confirma por WhatsApp la cobertura, fecha, horario y demás condiciones.',
  },
  {
    question: '¿Puedo consultar precios por WhatsApp?',
    answer:
      'Sí. Indíquenos los exámenes que necesita. Los valores publicados deben confirmarse cuando existan condiciones especiales o cambios en el catálogo.',
  },
  {
    question: '¿Cómo recibo mis resultados?',
    answer:
      'Consulte por WhatsApp el método disponible para su examen. No publicamos información clínica sensible directamente en esta página.',
  },
];

export const COMPANY_SERVICES = [
  'Perfiles de ingreso y periódicos según requerimiento',
  'Coordinación para grupos de colaboradores',
  'Toma de muestras en empresa sujeta a disponibilidad',
  'Cotización revisada por el equipo',
];
