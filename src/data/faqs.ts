import type { Faq } from '@/types/site';

export const FAQS: readonly Faq[] = [
  { question: '¿Necesito una orden médica para realizarme exámenes?', answer: 'Depende del examen y del motivo de la solicitud. Escríbanos con el nombre del examen para orientarle sin asumir requisitos.' },
  { question: '¿Todos los exámenes requieren ayuno?', answer: 'No. La preparación depende del examen solicitado. Confirme los requisitos antes de acudir o de coordinar una toma a domicilio.' },
  { question: '¿La atención a domicilio queda confirmada al enviar la solicitud?', answer: 'No. Al enviarla coordinaremos por WhatsApp la cobertura, fecha, horario y demás condiciones.' },
  { question: '¿Puedo consultar precios por WhatsApp?', answer: 'Sí. Indíquenos los exámenes que necesita. Los valores publicados son estimaciones y deben confirmarse para recibir una cotización final.' },
  { question: '¿Cómo recibo mis resultados?', answer: 'Consulte por WhatsApp el método disponible para su examen. No publicamos información clínica sensible directamente en esta página.' },
];
