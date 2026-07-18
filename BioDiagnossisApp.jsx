import React, { useEffect, useMemo, useState } from "react";
import {
  Accessibility,
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Facebook,
  FlaskConical,
  HeartHandshake,
  Home,
  Instagram,
  Loader2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Microscope,
  Phone,
  Search,
  ShieldCheck,
  Stethoscope,
  Truck,
  X,
} from "lucide-react";

/**
 * BioDiagnossis — sitio público
 * React + Tailwind CSS + lucide-react
 *
 * Antes de publicar:
 * 1. Revise todos los valores de BUSINESS.
 * 2. Reemplace los enlaces sociales pendientes.
 * 3. Confirme catálogo, precios, preparación, cobertura y horarios.
 * 4. Configure el dominio canónico y las páginas legales.
 * 5. Conecte loadPublicData() y submitHomeRequest() con su API NestJS.
 */

const BUSINESS = {
  name: "BioDiagnossis",
  legalName: "BioDiagnossis",
  description:
    "Laboratorio clínico en Quito con atención presencial y coordinación de toma de muestras a domicilio.",
  city: "Quito",
  country: "Ecuador",
  countryCode: "EC",
  phoneE164: "593983883998",
  phoneDisplay: "098 388 3998",
  email: "laboratorioclinico@biodiagnossis.com",
  address:
    "Joaquín Sumaita E10-13 y Esteban Meniz, sector El Inca, Quito, Ecuador",
  mapsUrl: "https://maps.app.goo.gl/kLr2tPhxtqav5UHU7",
  websiteUrl: "https://www.biodiagnossis.com",
  logoUrl: "/logo-biodiagnossis.png",
  social: {
    instagram: "", // Agregue URL oficial.
    facebook: "", // Agregue URL oficial.
  },
  hours: [
    { days: "Lunes a viernes", value: "07:30–16:30" },
    { days: "Sábados", value: "08:00–12:00" },
    { days: "Domingos y feriados", value: "Consulte disponibilidad" },
  ],
  parking: "", // Ej.: "Parqueadero disponible".
  accessibility: "", // Ej.: "Ingreso accesible para silla de ruedas".
  homeCoverage:
    "La cobertura y disponibilidad se confirman según la dirección y el horario solicitado.",
};

const NAV_ITEMS = [
  { id: "inicio", label: "Inicio" },
  { id: "servicios", label: "Exámenes" },
  { id: "domicilio", label: "Domicilio" },
  { id: "empresas", label: "Empresas" },
  { id: "sucursal", label: "Sucursal" },
  { id: "preguntas", label: "Preguntas" },
];

const INITIAL_SERVICES = [
  {
    id: "biometria",
    name: "Biometría hemática",
    category: "Hematología",
    price: 8,
    preparation:
      "La preparación puede variar según la indicación recibida. Confírmela antes de acudir.",
    active: true,
  },
  {
    id: "glucosa",
    name: "Glucosa",
    category: "Química sanguínea",
    price: 4,
    preparation:
      "Consulte si su solicitud requiere ayuno y por cuántas horas.",
    active: true,
  },
  {
    id: "urea",
    name: "Urea",
    category: "Química sanguínea",
    price: 4,
    preparation: "Confirme los requisitos específicos antes de la toma.",
    active: true,
  },
  {
    id: "creatinina",
    name: "Creatinina",
    category: "Química sanguínea",
    price: 4,
    preparation: "Confirme los requisitos específicos antes de la toma.",
    active: true,
  },
  {
    id: "perfil-lipidico",
    name: "Perfil lipídico básico",
    category: "Perfiles",
    price: 18,
    preparation:
      "Consulte previamente los requisitos de ayuno aplicables a su solicitud.",
    active: true,
  },
  {
    id: "perfil-renal",
    name: "Perfil renal básico",
    category: "Perfiles",
    price: 15,
    preparation: "Confirme la preparación correspondiente antes de acudir.",
    active: true,
  },
  {
    id: "uroanalisis",
    name: "Uroanálisis",
    category: "Uroanálisis",
    price: 6,
    preparation:
      "Solicite instrucciones de recolección y recipiente antes de tomar la muestra.",
    active: true,
  },
  {
    id: "coproparasitario",
    name: "Coproparasitario",
    category: "Parasitología",
    price: 6,
    preparation:
      "Solicite instrucciones de recolección y conservación de la muestra.",
    active: true,
  },
  {
    id: "toxicologico-5",
    name: "Panel toxicológico de 5 sustancias",
    category: "Salud ocupacional",
    price: 25,
    preparation:
      "Consulte el alcance del panel, el tipo de muestra y los requisitos de identificación.",
    active: true,
  },
];

const FAQS = [
  {
    question: "¿Necesito una orden médica para realizarme exámenes?",
    answer:
      "Depende del examen y del motivo de la solicitud. Escríbanos con el nombre del examen para orientarle sin asumir requisitos.",
  },
  {
    question: "¿Todos los exámenes requieren ayuno?",
    answer:
      "No. La preparación depende del examen solicitado. Confirme los requisitos antes de acudir o de coordinar una toma a domicilio.",
  },
  {
    question: "¿La atención a domicilio queda confirmada al enviar la solicitud?",
    answer:
      "No. La solicitud queda pendiente de revisión. El equipo confirma por WhatsApp la cobertura, fecha, horario y demás condiciones.",
  },
  {
    question: "¿Puedo consultar precios por WhatsApp?",
    answer:
      "Sí. Indíquenos los exámenes que necesita. Los valores publicados deben confirmarse cuando existan condiciones especiales o cambios en el catálogo.",
  },
  {
    question: "¿Cómo recibo mis resultados?",
    answer:
      "Consulte por WhatsApp el método disponible para su examen. No publicamos información clínica sensible directamente en esta página.",
  },
];

const COMPANY_SERVICES = [
  "Perfiles de ingreso y periódicos según requerimiento",
  "Coordinación para grupos de colaboradores",
  "Toma de muestras en empresa sujeta a disponibilidad",
  "Cotización revisada por el equipo",
];

const joinClassNames = (...classes) => classes.filter(Boolean).join(" ");

const buildWhatsAppUrl = (message) =>
  `https://wa.me/${BUSINESS.phoneE164}?text=${encodeURIComponent(message)}`;

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
  window.history.replaceState(null, "", `#${id}`);
};

function WhatsAppLink({
  message,
  children = "Escríbanos por WhatsApp",
  className = "",
  ariaLabel,
  onClick,
}) {
  return (
    <a
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel || String(children)}
      onClick={onClick}
      className={joinClassNames(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold transition focus:outline-none focus:ring-4 focus:ring-emerald-200",
        className
      )}
    >
      <MessageCircle aria-hidden="true" size={20} />
      {children}
    </a>
  );
}

function SectionHeading({ eyebrow, title, description, align = "center" }) {
  return (
    <div
      className={joinClassNames(
        "mb-10",
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.16em] text-emerald-700">
          {eyebrow}
        </p>
      )}
      <h2 className="text-balance text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-pretty text-lg leading-8 text-slate-600">
          {description}
        </p>
      )}
    </div>
  );
}

function TrustItem({ icon: Icon, title, description }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
        <Icon aria-hidden="true" size={22} />
      </div>
      <div>
        <h3 className="font-extrabold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
      </div>
    </div>
  );
}

function ServiceCard({ service, selected, onToggle }) {
  const hasPrice = Number.isFinite(service.price);

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-800">
          {service.category}
        </span>
        {hasPrice && (
          <span className="whitespace-nowrap text-lg font-black text-slate-900">
            ${service.price.toFixed(2)}
          </span>
        )}
      </div>

      <h3 className="text-lg font-extrabold text-slate-900">{service.name}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
        {service.preparation}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onToggle(service.id)}
          aria-pressed={selected}
          className={joinClassNames(
            "min-h-11 rounded-xl border px-3 text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-blue-100",
            selected
              ? "border-blue-800 bg-blue-800 text-white"
              : "border-slate-300 text-slate-800 hover:border-blue-800"
          )}
        >
          {selected ? "Agregado" : "Agregar"}
        </button>
        <WhatsAppLink
          message={`Hola ${BUSINESS.name}, deseo consultar el examen: ${service.name}.`}
          className="min-h-11 border border-emerald-700 px-3 py-2 text-sm text-emerald-800 hover:bg-emerald-50"
        >
          Consultar
        </WhatsAppLink>
      </div>
    </article>
  );
}

function AccordionItem({ item, open, onToggle }) {
  return (
    <div className="border-b border-slate-200">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-5 py-5 text-left font-extrabold text-slate-900 focus:outline-none focus:ring-4 focus:ring-inset focus:ring-blue-100"
        >
          <span>{item.question}</span>
          <ChevronDown
            aria-hidden="true"
            className={joinClassNames(
              "shrink-0 transition",
              open && "rotate-180"
            )}
            size={20}
          />
        </button>
      </h3>
      {open && (
        <p className="pb-5 pr-8 leading-7 text-slate-600">{item.answer}</p>
      )}
    </div>
  );
}

async function loadPublicData() {
  // Reemplace con:
  // const response = await fetch(`${import.meta.env.VITE_API_URL}/public/site`);
  // if (!response.ok) throw new Error("No se pudo cargar la información.");
  // return response.json();

  return {
    services: INITIAL_SERVICES.filter((service) => service.active),
    faqs: FAQS,
  };
}

async function submitHomeRequest(payload) {
  // Reemplace con una llamada real al backend:
  // const response = await fetch(
  //   `${import.meta.env.VITE_API_URL}/public/home-service-requests`,
  //   {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(payload),
  //   }
  // );
  // if (!response.ok) throw new Error("No se pudo enviar la solicitud.");
  // return response.json();

  return { ok: true };
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("Todos");
  const [selectedServices, setSelectedServices] = useState([]);
  const [openFaq, setOpenFaq] = useState(0);
  const [formStatus, setFormStatus] = useState("idle");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const title =
      "Laboratorio clínico en Quito | BioDiagnossis | Atención a domicilio";
    const description =
      "Consulte exámenes, preparación, ubicación y atención a domicilio con BioDiagnossis en Quito. Coordinación directa por WhatsApp.";

    document.documentElement.lang = "es-EC";
    document.title = title;

    const setMeta = (name, content, property = false) => {
      const selector = property
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`;
      let tag = document.head.querySelector(selector);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(property ? "property" : "name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("robots", "index,follow,max-image-preview:large");
    setMeta("theme-color", "#17357A");
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:type", "website", true);
    setMeta("og:locale", "es_EC", true);
    setMeta("og:url", BUSINESS.websiteUrl, true);
    setMeta("twitter:card", "summary_large_image");

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", BUSINESS.websiteUrl);

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      name: BUSINESS.name,
      legalName: BUSINESS.legalName,
      description: BUSINESS.description,
      url: BUSINESS.websiteUrl,
      telephone: `+${BUSINESS.phoneE164}`,
      email: BUSINESS.email,
      image: BUSINESS.logoUrl,
      address: {
        "@type": "PostalAddress",
        streetAddress: BUSINESS.address,
        addressLocality: BUSINESS.city,
        addressCountry: BUSINESS.countryCode,
      },
      areaServed: {
        "@type": "City",
        name: BUSINESS.city,
      },
      sameAs: [
        BUSINESS.social.instagram,
        BUSINESS.social.facebook,
      ].filter(Boolean),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "biodiagnossis-structured-data";
    script.text = JSON.stringify(jsonLd);
    document.head
      .querySelector("#biodiagnossis-structured-data")
      ?.remove();
    document.head.appendChild(script);

    return () => script.remove();
  }, []);

  useEffect(() => {
    let active = true;

    loadPublicData()
      .then((data) => {
        if (!active) return;
        setServices(data.services || []);
        setFaqs(data.faqs || []);
      })
      .catch(() => {
        if (!active) return;
        setLoadError(
          "No pudimos cargar el catálogo en este momento. Puede consultar directamente por WhatsApp."
        );
      })
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(
    () => [
      "Todos",
      ...Array.from(new Set(services.map((service) => service.category))).sort(),
    ],
    [services]
  );

  const filteredServices = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return services.filter((service) => {
      const matchesCategory =
        category === "Todos" || service.category === category;
      const matchesSearch =
        !normalizedSearch ||
        `${service.name} ${service.category}`
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [services, searchTerm, category]);

  const selectedServiceObjects = useMemo(
    () =>
      selectedServices
        .map((id) => services.find((service) => service.id === id))
        .filter(Boolean),
    [selectedServices, services]
  );

  const estimatedTotal = selectedServiceObjects.reduce(
    (sum, service) =>
      Number.isFinite(service.price) ? sum + service.price : sum,
    0
  );

  const selectedWhatsAppMessage = selectedServiceObjects.length
    ? `Hola ${BUSINESS.name}, deseo confirmar disponibilidad, preparación y valor para estos exámenes:\n${selectedServiceObjects
        .map((service) => `• ${service.name}`)
        .join(
          "\n"
        )}\n\nModalidad de interés: [EN SUCURSAL / A DOMICILIO].`
    : `Hola ${BUSINESS.name}, deseo información sobre exámenes de laboratorio.`;

  const toggleService = (id) => {
    setSelectedServices((current) =>
      current.includes(id)
        ? current.filter((serviceId) => serviceId !== id)
        : [...current, id]
    );
  };

  const handleHomeRequest = async (event) => {
    event.preventDefault();
    setFormStatus("loading");
    setFormError("");

    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    if (!payload.name || !payload.phone || !payload.sector) {
      setFormStatus("error");
      setFormError("Complete nombre, teléfono y sector para continuar.");
      return;
    }

    try {
      await submitHomeRequest(payload);
      setFormStatus("success");

      const message = `Hola ${BUSINESS.name}, deseo solicitar revisión para una toma a domicilio.
• Nombre: ${payload.name}
• Teléfono: ${payload.phone}
• Sector o dirección: ${payload.sector}
• Exámenes: ${payload.exams || "Por confirmar"}
• Fecha preferida: ${payload.date || "Por coordinar"}
• Rango horario: ${payload.timeRange || "Por coordinar"}

Entiendo que la visita queda pendiente de confirmación.`;

      window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
      event.currentTarget.reset();
    } catch {
      setFormStatus("error");
      setFormError(
        "No pudimos enviar la solicitud. Intente nuevamente o escríbanos por WhatsApp."
      );
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <a
        href="#contenido"
        className="fixed left-4 top-3 z-[200] -translate-y-24 rounded-lg bg-white px-4 py-3 font-bold text-blue-900 shadow-xl transition focus:translate-y-0"
      >
        Saltar al contenido
      </a>

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="bg-blue-950 text-white">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2 text-center text-xs sm:justify-between sm:px-6">
            <span>
              Atención en Quito · La disponibilidad se confirma por WhatsApp
            </span>
            <a
              href={`tel:+${BUSINESS.phoneE164}`}
              className="font-bold underline-offset-4 hover:underline"
            >
              Llame al {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-5 px-4 sm:px-6">
          <button
            type="button"
            onClick={() => scrollToSection("inicio")}
            className="flex items-center gap-3 text-left focus:outline-none focus:ring-4 focus:ring-blue-100"
            aria-label="Ir al inicio"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-900 text-xl font-black text-emerald-300">
              B
            </div>
            <div>
              <span className="block text-xl font-black leading-none text-blue-950">
                BioDiagnossis
              </span>
              <span className="mt-1 block text-xs font-semibold text-slate-500">
                Laboratorio clínico
              </span>
            </div>
          </button>

          <nav
            aria-label="Navegación principal"
            className="hidden items-center gap-1 lg:flex"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="rounded-lg px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 hover:text-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-100"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-2 sm:flex">
            <WhatsAppLink
              message={`Hola ${BUSINESS.name}, necesito información sobre sus servicios.`}
              className="bg-emerald-600 text-white hover:bg-emerald-700"
            >
              WhatsApp
            </WhatsAppLink>
          </div>

          <button
            type="button"
            aria-label="Abrir menú"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(true)}
            className="rounded-xl p-3 text-blue-950 hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-100 lg:hidden"
          >
            <Menu aria-hidden="true" />
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[100] bg-slate-950/50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menú móvil"
        >
          <div className="ml-auto flex h-full w-[min(88%,24rem)] flex-col bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xl font-black text-blue-950">
                BioDiagnossis
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Cerrar menú"
                className="rounded-xl p-3 hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-100"
              >
                <X aria-hidden="true" />
              </button>
            </div>

            <nav className="mt-8 flex flex-col" aria-label="Navegación móvil">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollToSection(item.id);
                  }}
                  className="border-b border-slate-100 py-4 text-left text-lg font-extrabold text-slate-900"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <WhatsAppLink
              message={`Hola ${BUSINESS.name}, necesito información sobre sus servicios.`}
              className="mt-8 bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Consultar por WhatsApp
            </WhatsAppLink>
          </div>
        </div>
      )}

      <main id="contenido">
        <section
          id="inicio"
          className="scroll-mt-28 overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white"
        >
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[1.08fr_.92fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-blue-50">
                <MapPin aria-hidden="true" size={17} />
                Sector El Inca, Quito
              </div>

              <h1 className="max-w-3xl text-balance text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Exámenes de laboratorio con orientación clara y atención
                cercana
              </h1>

              <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-blue-100 sm:text-xl">
                Consulte disponibilidad, preparación, precios configurados y
                atención a domicilio. Nuestro equipo revisa cada solicitud
                antes de confirmarla.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <WhatsAppLink
                  message={`Hola ${BUSINESS.name}, deseo consultar un examen y conocer su preparación, valor y disponibilidad.`}
                  className="bg-emerald-400 text-blue-950 hover:bg-emerald-300"
                >
                  Consultar por WhatsApp
                </WhatsAppLink>
                <button
                  type="button"
                  onClick={() => scrollToSection("domicilio")}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 px-5 py-3 font-bold text-white transition hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-white/20"
                >
                  Solicitar domicilio
                  <ArrowRight aria-hidden="true" size={19} />
                </button>
              </div>

              <p className="mt-4 text-sm leading-6 text-blue-200">
                No se confirma una visita, precio especial ni disponibilidad
                automáticamente.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 rounded-full bg-emerald-300/10 blur-3xl" />
              <div className="relative rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur">
                <div className="rounded-[1.5rem] bg-white p-6 text-slate-900 sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-emerald-700">
                        Atención sencilla
                      </p>
                      <h2 className="mt-1 text-2xl font-black text-blue-950">
                        ¿Qué necesita consultar?
                      </h2>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                      <HeartHandshake aria-hidden="true" />
                    </div>
                  </div>

                  <div className="mt-7 space-y-3">
                    {[
                      {
                        label: "Exámenes y preparación",
                        target: "servicios",
                        icon: FlaskConical,
                      },
                      {
                        label: "Toma de muestras a domicilio",
                        target: "domicilio",
                        icon: Home,
                      },
                      {
                        label: "Horarios y cómo llegar",
                        target: "sucursal",
                        icon: MapPin,
                      },
                    ].map((option) => (
                      <button
                        key={option.target}
                        type="button"
                        onClick={() => scrollToSection(option.target)}
                        className="flex min-h-14 w-full items-center justify-between rounded-xl border border-slate-200 px-4 text-left font-bold text-slate-800 transition hover:border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-100"
                      >
                        <span className="flex items-center gap-3">
                          <option.icon
                            aria-hidden="true"
                            className="text-blue-800"
                            size={21}
                          />
                          {option.label}
                        </span>
                        <ChevronRight aria-hidden="true" size={18} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Razones de confianza" className="border-b border-slate-200">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
            <TrustItem
              icon={MessageCircle}
              title="Respuesta por un canal directo"
              description="Continúe su consulta en WhatsApp y reciba orientación según la información configurada."
            />
            <TrustItem
              icon={ShieldCheck}
              title="Sin promesas automáticas"
              description="Las solicitudes sensibles, domicilios y disponibilidades pasan por revisión humana."
            />
            <TrustItem
              icon={Accessibility}
              title="Información fácil de entender"
              description="Diseño legible, botones grandes y pasos breves para facilitar el uso desde el celular."
            />
          </div>
        </section>

        <section id="servicios" className="scroll-mt-28 bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Exámenes y servicios"
              title="Encuentre el examen que necesita"
              description="Los precios se muestran únicamente cuando están configurados. Confirme preparación, disponibilidad y valor final antes de acudir."
            />

            <div className="mb-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_auto]">
              <label className="relative block">
                <span className="sr-only">Buscar examen</span>
                <Search
                  aria-hidden="true"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Busque por nombre o categoría"
                  className="min-h-12 w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-700 focus:ring-4 focus:ring-blue-100"
                />
              </label>

              <label>
                <span className="sr-only">Filtrar por categoría</span>
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 font-bold outline-none focus:border-blue-700 focus:ring-4 focus:ring-blue-100 md:w-64"
                >
                  {categories.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
            </div>

            {loading && (
              <div className="flex items-center justify-center gap-3 py-14 text-slate-600">
                <Loader2 className="animate-spin" aria-hidden="true" />
                Cargando catálogo…
              </div>
            )}

            {loadError && (
              <div
                role="alert"
                className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-950"
              >
                {loadError}
              </div>
            )}

            {!loading && filteredServices.length > 0 && (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    selected={selectedServices.includes(service.id)}
                    onToggle={toggleService}
                  />
                ))}
              </div>
            )}

            {!loading && filteredServices.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
                <FlaskConical
                  aria-hidden="true"
                  className="mx-auto text-slate-400"
                  size={38}
                />
                <h3 className="mt-4 text-xl font-black text-slate-900">
                  No encontramos ese examen
                </h3>
                <p className="mx-auto mt-2 max-w-xl text-slate-600">
                  El catálogo público puede no incluir todos los servicios.
                  Consulte por WhatsApp con el nombre exacto de su solicitud.
                </p>
              </div>
            )}

            {selectedServiceObjects.length > 0 && (
              <aside className="sticky bottom-4 z-30 mx-auto mt-8 max-w-4xl rounded-2xl border border-blue-200 bg-white p-4 shadow-2xl">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="font-black text-slate-900">
                      {selectedServiceObjects.length} examen
                      {selectedServiceObjects.length === 1 ? "" : "es"} seleccionado
                      {selectedServiceObjects.length === 1 ? "" : "s"}
                    </p>
                    <p className="text-sm text-slate-600">
                      Suma referencial configurada: ${estimatedTotal.toFixed(2)}.
                      Falta confirmar condiciones y modalidad.
                    </p>
                  </div>
                  <div className="flex w-full gap-2 sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setSelectedServices([])}
                      className="min-h-12 flex-1 rounded-xl border border-slate-300 px-4 font-bold text-slate-700 sm:flex-none"
                    >
                      Limpiar
                    </button>
                    <WhatsAppLink
                      message={selectedWhatsAppMessage}
                      className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700 sm:flex-none"
                    >
                      Confirmar por WhatsApp
                    </WhatsAppLink>
                  </div>
                </div>
              </aside>
            )}
          </div>
        </section>

        <section id="domicilio" className="scroll-mt-28 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid items-start gap-14 lg:grid-cols-[.9fr_1.1fr]">
              <div className="lg:sticky lg:top-32">
                <SectionHeading
                  eyebrow="Atención a domicilio"
                  title="Solicite revisión para una toma de muestras en casa"
                  description="Comparta los datos iniciales. El equipo verificará cobertura, fecha, horario, preparación y condiciones antes de confirmar."
                  align="left"
                />

                <ol className="space-y-5">
                  {[
                    "Indique los exámenes o envíe una foto legible de la orden por WhatsApp.",
                    "Comparta sector o ubicación y una fecha preferida.",
                    "Espere la revisión y confirmación del equipo.",
                  ].map((step, index) => (
                    <li key={step} className="flex gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-900 font-black text-white">
                        {index + 1}
                      </span>
                      <p className="pt-1 leading-7 text-slate-700">{step}</p>
                    </li>
                  ))}
                </ol>

                <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                  <h3 className="flex items-center gap-2 font-black text-emerald-950">
                    <MapPin aria-hidden="true" size={20} />
                    Cobertura
                  </h3>
                  <p className="mt-2 leading-7 text-emerald-900">
                    {BUSINESS.homeCoverage}
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleHomeRequest}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8"
              >
                <div className="mb-7">
                  <h3 className="text-2xl font-black text-blue-950">
                    Datos iniciales
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Este formulario no confirma la visita. Al enviarlo se abrirá
                    WhatsApp para continuar.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-slate-800">
                      Nombre *
                    </span>
                    <input
                      name="name"
                      autoComplete="name"
                      required
                      className="min-h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-700 focus:ring-4 focus:ring-blue-100"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-slate-800">
                      Teléfono *
                    </span>
                    <input
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      required
                      placeholder="09XXXXXXXX"
                      className="min-h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-700 focus:ring-4 focus:ring-blue-100"
                    />
                  </label>

                  <label className="block sm:col-span-2">
                    <span className="mb-2 block text-sm font-bold text-slate-800">
                      Sector o dirección de referencia *
                    </span>
                    <input
                      name="sector"
                      autoComplete="street-address"
                      required
                      placeholder="Ej.: El Inca, cerca de…"
                      className="min-h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-700 focus:ring-4 focus:ring-blue-100"
                    />
                  </label>

                  <label className="block sm:col-span-2">
                    <span className="mb-2 block text-sm font-bold text-slate-800">
                      Exámenes solicitados
                    </span>
                    <textarea
                      name="exams"
                      rows={3}
                      placeholder="Escriba los nombres o indique que enviará la orden por WhatsApp"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-700 focus:ring-4 focus:ring-blue-100"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-slate-800">
                      Fecha preferida
                    </span>
                    <input
                      name="date"
                      type="date"
                      className="min-h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-700 focus:ring-4 focus:ring-blue-100"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-slate-800">
                      Rango horario
                    </span>
                    <select
                      name="timeRange"
                      defaultValue=""
                      className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 outline-none focus:border-blue-700 focus:ring-4 focus:ring-blue-100"
                    >
                      <option value="">Por coordinar</option>
                      <option>Mañana</option>
                      <option>Mediodía</option>
                      <option>Tarde</option>
                    </select>
                  </label>
                </div>

                <label className="mt-5 flex items-start gap-3 text-sm leading-6 text-slate-600">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 h-5 w-5 rounded accent-blue-900"
                  />
                  <span>
                    Acepto enviar estos datos para que BioDiagnossis revise mi
                    solicitud y me contacte. La visita queda pendiente de
                    confirmación.
                  </span>
                </label>

                {formError && (
                  <p
                    role="alert"
                    className="mt-5 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-800"
                  >
                    {formError}
                  </p>
                )}

                {formStatus === "success" && (
                  <p
                    role="status"
                    className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-900"
                  >
                    Se abrió WhatsApp para continuar con la revisión.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="mt-6 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-blue-900 px-5 py-4 font-black text-white transition hover:bg-blue-950 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  {formStatus === "loading" ? (
                    <Loader2 className="animate-spin" aria-hidden="true" />
                  ) : (
                    <MessageCircle aria-hidden="true" />
                  )}
                  Continuar por WhatsApp
                </button>
              </form>
            </div>
          </div>
        </section>

        <section id="empresas" className="scroll-mt-28 bg-blue-950 py-20 text-white">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-emerald-300">
                Empresas
              </p>
              <h2 className="mt-3 text-balance text-3xl font-black md:text-4xl">
                Coordinación de servicios para salud ocupacional
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
                Cuéntenos el número de colaboradores, los exámenes requeridos,
                la ubicación y la fecha tentativa. Prepararemos una respuesta
                revisada, sin asumir perfiles ni condiciones.
              </p>

              <ul className="mt-7 grid gap-4 sm:grid-cols-2">
                {COMPANY_SERVICES.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
                  >
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-emerald-300"
                      size={20}
                    />
                    <span className="text-sm leading-6 text-blue-50">{item}</span>
                  </li>
                ))}
              </ul>

              <WhatsAppLink
                message={`Hola ${BUSINESS.name}, deseo solicitar una cotización para empresa.\n• Número aproximado de colaboradores: [COMPLETAR]\n• Exámenes o perfil requerido: [COMPLETAR]\n• Lugar: [COMPLETAR]\n• Fecha tentativa: [COMPLETAR]`}
                className="mt-8 bg-emerald-400 text-blue-950 hover:bg-emerald-300"
              >
                Solicitar cotización empresarial
              </WhatsAppLink>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  {
                    icon: Building2,
                    title: "Solicitud estructurada",
                    text: "Recopile datos clave antes de cotizar.",
                  },
                  {
                    icon: CalendarDays,
                    title: "Coordinación",
                    text: "Fecha y disponibilidad revisadas por el equipo.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Confidencialidad",
                    text: "Defina el tratamiento de datos antes de publicar el flujo.",
                  },
                  {
                    icon: Stethoscope,
                    title: "Alcance claro",
                    text: "Sin inventar perfiles, requisitos ni promesas clínicas.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl bg-white p-5 text-slate-900"
                  >
                    <item.icon
                      aria-hidden="true"
                      className="text-blue-800"
                      size={28}
                    />
                    <h3 className="mt-4 font-black">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="sucursal" className="scroll-mt-28 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Sucursal"
              title="Visítenos en el sector El Inca"
              description="Revise la ubicación y el horario. Para evitar desplazamientos innecesarios, confirme previamente la disponibilidad del examen."
            />

            <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl lg:grid-cols-[.9fr_1.1fr]">
              <div className="p-6 sm:p-9">
                <h3 className="text-2xl font-black text-blue-950">
                  BioDiagnossis
                </h3>

                <dl className="mt-7 space-y-6">
                  <div className="flex gap-4">
                    <MapPin
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-emerald-700"
                    />
                    <div>
                      <dt className="font-black text-slate-900">Dirección</dt>
                      <dd className="mt-1 leading-7 text-slate-600">
                        {BUSINESS.address}
                      </dd>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Clock3
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-emerald-700"
                    />
                    <div>
                      <dt className="font-black text-slate-900">Horarios</dt>
                      <dd className="mt-1 space-y-1 text-slate-600">
                        {BUSINESS.hours.map((hour) => (
                          <p key={hour.days}>
                            <strong>{hour.days}:</strong> {hour.value}
                          </p>
                        ))}
                      </dd>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Phone
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-emerald-700"
                    />
                    <div>
                      <dt className="font-black text-slate-900">Contacto</dt>
                      <dd className="mt-1 text-slate-600">
                        <a
                          href={`tel:+${BUSINESS.phoneE164}`}
                          className="font-bold text-blue-900 hover:underline"
                        >
                          {BUSINESS.phoneDisplay}
                        </a>
                      </dd>
                    </div>
                  </div>

                  {(BUSINESS.parking || BUSINESS.accessibility) && (
                    <div className="flex gap-4">
                      <Accessibility
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-emerald-700"
                      />
                      <div>
                        <dt className="font-black text-slate-900">
                          Acceso y parqueadero
                        </dt>
                        <dd className="mt-1 leading-7 text-slate-600">
                          {[BUSINESS.accessibility, BUSINESS.parking]
                            .filter(Boolean)
                            .join(" · ")}
                        </dd>
                      </div>
                    </div>
                  )}
                </dl>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={BUSINESS.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-900 px-5 py-3 font-black text-white transition hover:bg-blue-950 focus:outline-none focus:ring-4 focus:ring-blue-200"
                  >
                    <MapPin aria-hidden="true" size={20} />
                    Cómo llegar
                  </a>
                  <WhatsAppLink
                    message={`Hola ${BUSINESS.name}, deseo confirmar si puedo acudir hoy y si está disponible el examen que necesito.`}
                    className="border border-emerald-700 text-emerald-800 hover:bg-emerald-50"
                  >
                    Confirmar antes de ir
                  </WhatsAppLink>
                </div>
              </div>

              <div className="min-h-[360px] bg-slate-100">
                <iframe
                  title="Ubicación de BioDiagnossis en Google Maps"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    BUSINESS.address
                  )}&output=embed`}
                  className="h-full min-h-[360px] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="preguntas" className="scroll-mt-28 bg-slate-50 py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Preguntas frecuentes"
              title="Respuestas claras antes de su visita"
              description="Cuando un requisito dependa del examen o de la situación del paciente, le pediremos confirmar directamente."
            />

            <div className="rounded-2xl border border-slate-200 bg-white px-5 shadow-sm sm:px-7">
              {faqs.map((item, index) => (
                <AccordionItem
                  key={item.question}
                  item={item}
                  open={openFaq === index}
                  onToggle={() =>
                    setOpenFaq((current) => (current === index ? -1 : index))
                  }
                />
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-blue-900 p-6 text-center text-white sm:p-8">
              <h3 className="text-2xl font-black">
                ¿Su pregunta no aparece aquí?
              </h3>
              <p className="mx-auto mt-3 max-w-2xl leading-7 text-blue-100">
                Escríbanos el nombre del examen y su duda concreta. Así podremos
                orientarle sin repetir preguntas innecesarias.
              </p>
              <WhatsAppLink
                message={`Hola ${BUSINESS.name}, tengo una pregunta sobre: [ESCRIBA AQUÍ].`}
                className="mt-6 bg-emerald-400 text-blue-950 hover:bg-emerald-300"
              >
                Hacer una consulta
              </WhatsAppLink>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-10 rounded-[2rem] bg-emerald-50 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="font-extrabold uppercase tracking-[0.14em] text-emerald-800">
                  Próximo paso
                </p>
                <h2 className="mt-3 text-balance text-3xl font-black text-blue-950">
                  Envíenos el nombre de sus exámenes y le orientamos
                </h2>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
                  Para responder mejor, incluya si desea acudir a la sucursal o
                  solicitar atención a domicilio.
                </p>
              </div>
              <WhatsAppLink
                message={`Hola ${BUSINESS.name}, necesito orientación para estos exámenes: [ESCRIBA AQUÍ]. Modalidad: [SUCURSAL / DOMICILIO].`}
                className="bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Iniciar consulta
              </WhatsAppLink>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 py-14 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-2xl font-black">BioDiagnossis</div>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Laboratorio clínico en Quito con atención presencial y
              coordinación de toma de muestras a domicilio.
            </p>
          </div>

          <div>
            <h2 className="font-black">Información</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {NAV_ITEMS.slice(1).map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className="hover:text-white hover:underline"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-black">Contacto</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>
                <a
                  href={`tel:+${BUSINESS.phoneE164}`}
                  className="hover:text-white hover:underline"
                >
                  {BUSINESS.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="break-all hover:text-white hover:underline"
                >
                  {BUSINESS.email}
                </a>
              </li>
              <li>{BUSINESS.address}</li>
            </ul>
          </div>

          <div>
            <h2 className="font-black">Canales oficiales</h2>
            <div className="mt-4 flex gap-3">
              {BUSINESS.social.facebook && (
                <a
                  href={BUSINESS.social.facebook}
                  aria-label="Facebook de BioDiagnossis"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                >
                  <Facebook aria-hidden="true" />
                </a>
              )}
              {BUSINESS.social.instagram && (
                <a
                  href={BUSINESS.social.instagram}
                  aria-label="Instagram de BioDiagnossis"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                >
                  <Instagram aria-hidden="true" />
                </a>
              )}
              <WhatsAppLink
                message={`Hola ${BUSINESS.name}, necesito información.`}
                ariaLabel="WhatsApp de BioDiagnossis"
                className="h-11 min-h-0 w-11 rounded-full bg-emerald-600 p-0"
              >
                <span className="sr-only">WhatsApp</span>
              </WhatsAppLink>
            </div>

            <div className="mt-6 space-y-2 text-sm text-slate-400">
              <a href="/privacidad" className="block hover:text-white">
                Privacidad y tratamiento de datos
              </a>
              <a href="/terminos" className="block hover:text-white">
                Términos de uso
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-4 pt-7 text-xs leading-6 text-slate-400 sm:px-6">
          © {new Date().getFullYear()} BioDiagnossis. La información de esta
          página no reemplaza la valoración de un profesional de salud. Revise
          todos los datos comerciales, clínicos y legales antes de publicar.
        </div>
      </footer>

      <WhatsAppLink
        message={`Hola ${BUSINESS.name}, necesito información.`}
        ariaLabel="Abrir WhatsApp"
        className="fixed bottom-5 right-5 z-40 h-14 min-h-0 w-14 rounded-full bg-emerald-600 p-0 text-white shadow-2xl hover:bg-emerald-700 sm:hidden"
      >
        <span className="sr-only">WhatsApp</span>
      </WhatsAppLink>
    </div>
  );
}
