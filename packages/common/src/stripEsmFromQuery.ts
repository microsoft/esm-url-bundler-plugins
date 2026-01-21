/**
 * Strips only the 'esm' parameter from a query string, preserving other parameters.
 * @param queryString The full query string (e.g., '?esm&foo=true' or '?foo=true&esm&bar=1')
 * @returns The query string without the 'esm' parameter, or empty string if no params remain
 */
export function stripEsmFromQuery(queryString: string): string {
  if (!queryString || queryString === '?esm') return '';
  const params = new URLSearchParams(queryString.startsWith('?') ? queryString.slice(1) : queryString);
  params.delete('esm');
  const result = params.toString();
  return result ? '?' + result : '';
}
