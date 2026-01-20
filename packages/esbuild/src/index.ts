import * as path from 'path';
import * as fs from 'fs';
import type { Plugin } from 'esbuild';

/** Query parameter that marks a URL for ESM bundling */
const ESM_QUERY = '?esm';

/**
 * Strips only the 'esm' parameter from a query string, preserving other parameters.
 * @param queryString The full query string (e.g., '?esm&foo=true' or '?foo=true&esm&bar=1')
 * @returns The query string without the 'esm' parameter, or empty string if no params remain
 */
function stripEsmFromQuery(queryString: string): string {
  if (!queryString || queryString === '?esm') return '';
  const params = new URLSearchParams(queryString.startsWith('?') ? queryString.slice(1) : queryString);
  params.delete('esm');
  const result = params.toString();
  return result ? '?' + result : '';
}

interface EsmUrlMatch {
  filePath: string;
  entryName: string;
  originalQuery: string;
  start: number;
  end: number;
}

/**
 * Information passed to the getOutputFileName callback.
 */
export interface OutputFileNameInfo {
  /** Full absolute path to the worker/module file */
  filePath: string;
  /** The auto-generated suggested name (without extension) */
  suggestedName: string;
}

export interface EsmUrlPluginOptions {
  /**
   * When true, strips the ?esm query parameter from output URLs.
   * When false (default), preserves ?esm for re-bundling scenarios.
   */
  stripEsmQuery?: boolean;
  /**
   * Custom function to generate output file names for worker/module files.
   * Receives the file path and suggested name, should return the desired name (without extension).
   */
  getOutputFileName?: (info: OutputFileNameInfo) => string;
}

export function esmUrlPlugin(options: EsmUrlPluginOptions = {}): Plugin {
  const { stripEsmQuery = false, getOutputFileName } = options;
  
  return {
    name: 'esm-url-plugin',
    setup(build) {
      const workerEntries = new Map<string, string>(); // absolutePath -> entryName
      const workerBuilds = new Map<string, string>(); // entryName -> output filename
      const usedEntryNames = new Set<string>();

      // Get the output directory from build options
      const outdir = build.initialOptions.outdir || 'dist';
      const absOutdir = path.resolve(process.cwd(), outdir);
      
      // Track first entry point directory as the "context" for relative paths
      let contextDir: string | undefined;

      build.onLoad({ filter: /\.(c|m)?[jt]sx?$/ }, async (args) => {
        
        // Set context directory based on first loaded file (usually the entry point)
        if (!contextDir) {
          contextDir = path.dirname(args.path);
        }

        const contents = await fs.promises.readFile(args.path, 'utf8');

        // Quick check: skip files that don't contain ?esm
        if (!contents.includes(ESM_QUERY)) {
          return null;
        }

        // Simple regex to find new URL patterns with ?esm
        const urlPattern = /new\s+URL\s*\(\s*(['"`])([^'"`]+\?esm[^'"`]*)\1\s*,\s*import\.meta\.url\s*\)/g;

        const matches: EsmUrlMatch[] = [];
        let match;

        while ((match = urlPattern.exec(contents)) !== null) {
          const fullMatch = match[0];
          const urlString = match[2];

          if (urlString.includes(ESM_QUERY)) {
            const [workerPath, ...queryParts] = urlString.split('?');
            const originalQuery = queryParts.length > 0 ? '?' + queryParts.join('?') : '';
            const importerDir = path.dirname(args.path);
            const absolutePath = path.resolve(importerDir, workerPath);

            // Generate entry name from relative path to context directory
            let relativePath = path.relative(contextDir!, absolutePath);
            
            // Handle cross-drive paths on Windows: path.relative() returns absolute path
            // when paths are on different drives (e.g., C: vs D:)
            if (path.isAbsolute(relativePath)) {
              // Strip drive letter (e.g., "D:" or "D:\") on Windows
              relativePath = relativePath.replace(/^[a-zA-Z]:[\\\/]?/, '');
            }
            
            let entryName = relativePath
              .replace(/\.[^/.]+$/, '')   // Remove extension
              .replace(/\\/g, '/')        // Normalize Windows slashes
              .replace(/^(\.\.\/)+/g, '') // Remove leading ../ segments
              .replace(/^\.\//, '')        // Remove leading ./
              .replace(/\//g, '-')         // Replace slashes with dashes
              .replace(/^\.+/, '');        // Remove any remaining leading dots
            
            // Handle duplicate names by adding a suffix
            let finalEntryName = entryName;
            let counter = 1;
            while (usedEntryNames.has(finalEntryName) && workerEntries.get(absolutePath) !== finalEntryName) {
              finalEntryName = `${entryName}-${counter++}`;
            }
            
            // Apply custom output file name if provided
            if (getOutputFileName) {
              finalEntryName = getOutputFileName({ filePath: absolutePath, suggestedName: finalEntryName });
            }
            
            usedEntryNames.add(finalEntryName);

            workerEntries.set(absolutePath, finalEntryName);

            matches.push({
              filePath: absolutePath,
              entryName: finalEntryName,
              originalQuery,
              start: match.index,
              end: match.index + fullMatch.length,
            });
          }
        }

        if (matches.length === 0) {
          return null;
        }

        // Replace matches in reverse order to preserve positions
        let newContents = contents;
        for (const m of matches.reverse()) {
          // Replace with new URL pointing to the worker output
          const suffix = stripEsmQuery ? stripEsmFromQuery(m.originalQuery) : m.originalQuery;
          const replacement = `new URL('./${m.entryName}.js${suffix}', import.meta.url)`;
          newContents = newContents.slice(0, m.start) + replacement + newContents.slice(m.end);
        }

        // Determine the loader based on file extension
        const ext = path.extname(args.path).toLowerCase();
        let loader: 'js' | 'ts' | 'jsx' | 'tsx';
        if (ext === '.ts' || ext === '.mts' || ext === '.cts') {
          loader = 'ts';
        } else if (ext === '.tsx' || ext === '.mtsx' || ext === '.ctsx') {
          loader = 'tsx';
        } else if (ext === '.jsx' || ext === '.mjsx' || ext === '.cjsx') {
          loader = 'jsx';
        } else {
          loader = 'js';
        }

        return {
          contents: newContents,
          loader,
        };
      });

      // Build workers at the end
      build.onEnd(async (result) => {
        if (result.errors.length > 0) {
          return;
        }

        // Import esbuild dynamically to build workers
        const esbuild = await import('esbuild');

        // Build each worker as a separate entry point
        for (const [absolutePath, entryName] of workerEntries) {
          const workerOutfile = path.join(absOutdir, `${entryName}.js`);

          await esbuild.build({
            entryPoints: [absolutePath],
            bundle: true,
            format: 'esm',
            outfile: workerOutfile,
            // Don't apply the plugin to worker builds to avoid infinite recursion
            plugins: [],
            // Use same settings as parent build where applicable
            minify: build.initialOptions.minify,
            sourcemap: build.initialOptions.sourcemap,
            target: build.initialOptions.target,
            define: build.initialOptions.define,
            external: build.initialOptions.external,
          });

          workerBuilds.set(entryName, `${entryName}.js`);
        }
      });
    },
  };
}

export { esmUrlPlugin as esbuildEsmUrlPlugin };
