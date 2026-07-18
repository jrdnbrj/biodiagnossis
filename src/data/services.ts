import type { Service } from '@/types/site';

export const SERVICES: readonly Service[] = [
  { slug: 'biometria', name: 'Biometría hemática', category: 'Hematología', estimatedPrice: 8, preparation: 'La preparación puede variar según la indicación recibida. Confírmela antes de acudir.', active: true },
  { slug: 'glucosa', name: 'Glucosa', category: 'Química sanguínea', estimatedPrice: 4, preparation: 'Consulte si su solicitud requiere ayuno y por cuántas horas.', active: true },
  { slug: 'urea', name: 'Urea', category: 'Química sanguínea', estimatedPrice: 4, preparation: 'Confirme los requisitos específicos antes de la toma.', active: true },
  { slug: 'creatinina', name: 'Creatinina', category: 'Química sanguínea', estimatedPrice: 4, preparation: 'Confirme los requisitos específicos antes de la toma.', active: true },
  { slug: 'perfil-lipidico', name: 'Perfil lipídico básico', category: 'Perfiles', estimatedPrice: 18, preparation: 'Consulte previamente los requisitos de ayuno aplicables a su solicitud.', active: true },
  { slug: 'perfil-renal', name: 'Perfil renal básico', category: 'Perfiles', estimatedPrice: 15, preparation: 'Confirme la preparación correspondiente antes de acudir.', active: true },
  { slug: 'uroanalisis', name: 'Uroanálisis', category: 'Uroanálisis', estimatedPrice: 6, preparation: 'Solicite instrucciones de recolección y recipiente antes de tomar la muestra.', active: true },
  { slug: 'coproparasitario', name: 'Coproparasitario', category: 'Parasitología', estimatedPrice: 6, preparation: 'Solicite instrucciones de recolección y conservación de la muestra.', active: true },
  { slug: 'toxicologico-5', name: 'Panel toxicológico de 5 sustancias', category: 'Salud ocupacional', estimatedPrice: 25, preparation: 'Consulte el alcance del panel, el tipo de muestra y los requisitos de identificación.', active: true },
];

export const ACTIVE_SERVICES = SERVICES.filter((service) => service.active);
export const SERVICE_CATEGORIES = [...new Set(ACTIVE_SERVICES.map((service) => service.category))];
export const getServiceBySlug = (slug: string) => ACTIVE_SERVICES.find((service) => service.slug === slug);
