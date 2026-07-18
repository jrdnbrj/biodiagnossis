# BioDiagnossis Web

Sitio público estático de BioDiagnossis, laboratorio clínico en Quito. Está construido con Next.js App Router, TypeScript estricto y exportación estática; no comparte backend, autenticación ni datos sensibles con `jrdn-manager`.

El sitio orienta a visitantes hacia WhatsApp para confirmar requisitos, disponibilidad y cotizaciones. No confirma una atención ni guarda solicitudes.

## Rutas públicas

- `/`: inicio.
- `/examenes/` y `/examenes/[slug]/`: catálogo y páginas de los exámenes activos.
- `/atencion-domicilio-quito/`: formulario local que abre WhatsApp con una solicitud estructurada.
- `/laboratorio-clinico-quito/`, `/laboratorio-clinico-el-inca/` y `/sucursal/`: información de ubicación y horarios.
- `/examen-de-sangre/`, `/examen-de-orina/`, `/preparacion-examenes/` y `/salud-ocupacional-empresas/`: páginas de orientación.
- `/preguntas-frecuentes/`, `/contacto/`, `/privacidad/` y `/terminos/`.

Las páginas legales se marcan como `noindex` y muestran un aviso de revisión jurídica pendiente.

## Desarrollo local

Requiere Node.js 22 o superior y npm.

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Validación y build

```bash
npm run lint
npm run typecheck
SITE_ENV=production npm run build
```

El resultado queda en `out/`, con URLs de barra final y HTML prerenderizado. Puede publicarse detrás de Nginx o un CDN que sirva archivos estáticos.

## Docker

```bash
docker build --build-arg SITE_ENV=production -t biodiagnossis-web .
docker run -d --name biodiagnossis-web -p 8080:80 biodiagnossis-web
```

El sitio quedará disponible en [http://localhost:8080](http://localhost:8080). Nginx sirve rutas como `/examenes/` y `/examenes/biometria/` desde el export estático, sin fallback de SPA.

## Configuración y SEO

El dominio canónico está definido como `https://www.biodiagnossis.com/`. Copie `.env.example` a `.env.local` solo si desea controlar el comportamiento del build:

```bash
cp .env.example .env.local
```

- `SITE_ENV=production`: permite el rastreo en `robots.txt` durante el build.
- Cualquier valor distinto de `production`: genera un `robots.txt` con `Disallow: /`, útil para previews.

`sitemap.xml`, `robots.txt`, metadatos, canonicales, Open Graph y JSON-LD se generan durante el build. Antes de lanzar el sitio, revise los datos en `src/data/` y complete únicamente activos verificados, por ejemplo logo, imagen Open Graph, coordenadas o textos legales finales. No se deben inventar esos datos.

## Datos y límites

- `src/data/business.ts`: datos de contacto, horarios, redes y navegación.
- `src/data/services.ts`: catálogo de exámenes y precios estimados.
- `src/data/faqs.ts`: preguntas frecuentes.

Los precios publicados son estimaciones. La cotización final, la preparación y la disponibilidad deben confirmarse por WhatsApp. No publique resultados, diagnósticos ni datos clínicos sensibles en el sitio.
