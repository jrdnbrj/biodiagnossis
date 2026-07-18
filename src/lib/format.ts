export function formatEstimatedPrice(price?: number) {
  if (price === undefined) return 'Consulte el valor';
  return `Estimado: US$ ${price.toFixed(2)}`;
}
