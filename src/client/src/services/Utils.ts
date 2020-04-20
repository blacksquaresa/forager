export function slug(source: string): string {
  return String(source).trim().toLowerCase().replace(/[\W]+/g, '');
}
