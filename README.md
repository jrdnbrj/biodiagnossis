# BioDiagnossis Web

Sitio público de BioDiagnossis, laboratorio clínico en Quito. Es una aplicación React estática independiente del dashboard y de `jrdn-manager`.

## Objetivo

Convertir consultas de pacientes en conversaciones por WhatsApp, visitas a sucursal o solicitudes de toma de muestras a domicilio. La página no confirma disponibilidad, atención clínica ni valores especiales automáticamente.

## Estructura

```text
src/
  data/site.js            Datos comerciales, catálogo inicial y FAQs revisadas
  lib/whatsapp.js         Enlaces y navegación de WhatsApp
  services/public-site.js Capa opcional de API pública; usa datos locales sin API
  styles/index.css        Entrada global de Tailwind
  App.jsx                 Composición visual de la landing
  main.jsx                Entrada React
public/
  robots.txt              Instrucciones de rastreo
  sitemap.xml             Mapa del sitio
Dockerfile                Imagen de producción con Nginx
nginx.conf                Caché segura para HTML y assets versionados
```

## Desarrollo local

Requiere Node.js 20 o superior y Yarn mediante Corepack.

```bash
corepack enable
yarn install
yarn dev
```

Abra la URL que muestre Vite, normalmente `http://localhost:5173`.

## Build de producción sin Docker

```bash
yarn lint
yarn build
```

El resultado queda en `dist/`. Puede publicarlo en un hosting estático, CDN o Nginx. Para un servidor propio, configure una regla de fallback a `index.html` para rutas de cliente.

## Build de producción con Docker

```bash
docker build -t biodiagnossis-web .
docker run -d --name biodiagnossis-web -p 8080:80 biodiagnossis-web
```

Luego estará disponible en `http://localhost:8080`. En producción, sitúe el contenedor detrás de un proxy HTTPS y apunte el dominio a ese proxy.

## Configuración

Copie `.env.example` a `.env.local` solo si tendrá una API pública:

```bash
cp .env.example .env.local
```

- `VITE_PUBLIC_API_URL`: base URL de una API pública que exponga catálogo y solicitudes. Si queda vacía, se usa el contenido local revisado en `src/data/site.js`.
- `VITE_SITE_URL`: referencia para el build; manténgala alineada con el dominio canónico.

Nunca incluya secretos, claves de Evolution API, JWT ni credenciales administrativas en variables `VITE_*`: estas variables llegan al navegador.

## Integración futura con API

La capa `src/services/public-site.js` espera opcionalmente:

- `GET /public/site`: catálogo activo y preguntas frecuentes públicas.
- `POST /public/home-service-requests`: una solicitud inicial de domicilio.

La API debe validar, limitar tráfico, aplicar CORS al dominio del sitio y no devolver información clínica sensible. WhatsApp debe seguir siendo la confirmación de disponibilidad.

## SEO y lanzamiento

Antes de indexar la web:

1. Revise `src/data/site.js`: nombre legal, teléfono, correo, dirección, horarios, mapa, cobertura, redes, precios y preparación.
2. Mantenga el mismo dominio en `index.html`, `public/sitemap.xml`, `public/robots.txt` y `VITE_SITE_URL`.
3. Añada un logo real en `public/` y una imagen social Open Graph antes de compartir enlaces.
4. Cree y publique páginas legales reales de privacidad y tratamiento de datos; un laboratorio no debe publicar una política genérica sin revisión legal.
5. Verifique que el sitio responda con HTTPS, que `www` y la raíz redirijan a una única URL canónica y que las URLs no devuelvan contenido duplicado.
6. Registre el dominio en Google Search Console y envíe `https://www.biodiagnossis.com/sitemap.xml`.
7. Mantenga actualizado el perfil de Google Business Profile con la misma dirección, teléfono, horario y sitio web.
8. Publique contenido útil y verificable: preparación de exámenes, horarios, atención a domicilio y preguntas frecuentes. No cree páginas repetitivas para ciudades o barrios sin información real.

## Datos clínicos y privacidad

El sitio debe orientar, no diagnosticar. No publique resultados ni solicite información clínica innecesaria en formularios. La solicitud de domicilio debe recopilar únicamente datos mínimos y dirigir la confirmación al equipo humano por WhatsApp.
