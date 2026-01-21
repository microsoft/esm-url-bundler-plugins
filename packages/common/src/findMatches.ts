import type { RawMatch } from './types';

export const ESM_QUERY = '?esm';

/**
 * Finds `new URL('...?esm...', import.meta.url)` patterns using regex.
 * May have false positives in comments or strings, but this is rare in practice.
 */
export function findMatches(code: string): RawMatch[] {
  const urlPattern = /new\s+URL\s*\(\s*(['"`])([^'"`]+\?esm[^'"`]*)\1\s*,\s*import\.meta\.url\s*\)/g;
  const matches: RawMatch[] = [];
  let match;
  
  while ((match = urlPattern.exec(code)) !== null) {
    const urlString = match[2];
    if (urlString.includes(ESM_QUERY)) {
      matches.push({
        urlString,
        start: match.index,
        end: match.index + match[0].length,
      });
    }
  }
  
  return matches;
}
