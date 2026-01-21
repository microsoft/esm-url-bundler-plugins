import * as path from 'path';
import * as fs from 'fs';
import type { Plugin } from 'esbuild';
import {
  ESM_QUERY,
  stripEsmFromQuery,
  generateEntryName,
  findMatches,
  type OutputFileNameInfo,
  type EsmUrlMatch,
} from '@vscode/esm-url-plugin-common';

export type { OutputFileNameInfo };

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

        const rawMatches = findMatches(contents);

        if (rawMatches.length === 0) {
          return null;
        }

        // Convert raw matches to full matches with resolved paths
        const errors: { text: string; location: { file: string; line: number; column: number } }[] = [];
        const matches: EsmUrlMatch[] = [];
        
        for (const raw of rawMatches) {
          const [workerPath, ...queryParts] = raw.urlString.split('?');
          const originalQuery = queryParts.length > 0 ? '?' + queryParts.join('?') : '';
          const importerDir = path.dirname(args.path);
          const absolutePath = path.resolve(importerDir, workerPath);

          // Check that the file exists
          if (!fs.existsSync(absolutePath)) {
            const lines = contents.slice(0, raw.start).split('\n');
            const line = lines.length;
            const column = lines[lines.length - 1].length;
            errors.push({
              text: `File not found: '${workerPath}' resolved to '${absolutePath}'. Check that the path in new URL('${raw.urlString}', import.meta.url) points to an existing file.`,
              location: { file: args.path, line, column }
            });
            continue;
          }

          let entryName = generateEntryName(absolutePath, contextDir!);
          
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
            start: raw.start,
            end: raw.end,
          });
        }

        // Return errors if any files were not found
        if (errors.length > 0) {
          return { errors };
        }

        // Replace matches in reverse order to preserve positions
        let newContents = contents;
        for (const m of matches.slice().reverse()) {
          const suffix = stripEsmQuery ? stripEsmFromQuery(m.originalQuery) : m.originalQuery;
          const replacement = `new URL('./${m.entryName}.js${suffix}', import.meta.url)`;
          newContents = newContents.slice(0, m.start) + replacement + newContents.slice(m.end);
        }

        return {
          contents: newContents,
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
