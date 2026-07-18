import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/data/business';
import { ACTIVE_SERVICES } from '@/data/services';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap { const pages = ['/', '/laboratorio-clinico-quito/', '/laboratorio-clinico-el-inca/', '/examenes/', '/examen-de-sangre/', '/examen-de-orina/', '/atencion-domicilio-quito/', '/salud-ocupacional-empresas/', '/preparacion-examenes/', '/sucursal/', '/preguntas-frecuentes/', '/contacto/']; return [...pages, ...ACTIVE_SERVICES.map((service) => `/examenes/${service.slug}/`)].map((path) => ({ url: new URL(path, SITE_URL).toString() })); }
