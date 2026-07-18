import { BUSINESS } from '../data/site';

export const buildWhatsAppUrl = (message) =>
  `https://wa.me/${BUSINESS.phoneE164}?text=${encodeURIComponent(message)}`;

export const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
  window.history.replaceState(null, '', `#${id}`);
};
