import { FAQS, INITIAL_SERVICES } from '../data/site';

const apiBaseUrl = (import.meta.env.VITE_PUBLIC_API_URL ?? '').replace(/\/$/, '');

const fallbackPublicData = {
  services: INITIAL_SERVICES.filter((service) => service.active),
  faqs: FAQS,
};

/**
 * Uses the local, reviewed catalogue until a public API is configured.
 * The public site is intentionally independent from the admin dashboard.
 */
export async function loadPublicData() {
  if (!apiBaseUrl) return fallbackPublicData;

  const response = await fetch(`${apiBaseUrl}/public/site`);
  if (!response.ok) throw new Error('Unable to load public site data.');
  return response.json();
}

/**
 * Sends a lightweight lead only when a dedicated public endpoint exists.
 * WhatsApp remains the safe fallback and confirmation channel.
 */
export async function submitHomeRequest(payload) {
  if (!apiBaseUrl) return { delivered: false };

  const response = await fetch(`${apiBaseUrl}/public/home-service-requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Unable to submit home-service request.');
  return response.json();
}
