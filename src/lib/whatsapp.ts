import { BUSINESS } from '@/data/business';

export function whatsappUrl(message: string) {
  return `https://wa.me/${BUSINESS.phoneE164}?text=${encodeURIComponent(message)}`;
}

export function quoteMessage(serviceNames: string[] = []) {
  const requested = serviceNames.length ? ` para: ${serviceNames.join(', ')}` : '';
  return `Hola, quisiera solicitar una cotización final${requested}.`;
}
