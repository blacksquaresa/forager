export function slug(source: string): string {
  return String(source).trim().toLowerCase().replace(/[\W]+/g, '');
}

export function quantity(quantity: number, units: string): string {
  return `${quantity} ${units}${quantity === 1 ? '' : 's'}`;
}
