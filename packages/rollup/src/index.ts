import * as path from 'path';
import * as fs from 'fs';
import type { Plugin } from 'rollup';
import { rollup } from 'rollup';
import {
  ESM_QUERY,
  stripEsmFromQuery,
  generateEntryName,
  findMatches,
  type OutputFileNameInfo,
  type EsmUrlMatch,
} from '@vscode/esm-url-plugin-common';

export type { OutputFileNameInfo };

/** Prefix for virtual module IDs */
const VIRTUAL_PREFIX = '\0esm-url:';

interface EsmUrlPluginOptions {
  /**
   * When true, each ?esm referenced module is built in its own isolated rollup step.
   * This ensures complete isolation between worker bundles but may be slower.
   * When false (default), workers are emitted as chunks in the main build and
   * only recompiled as ESM if the main output format is non-ESM.
   */
  bundleModulesIsolated?: boolean;
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
  const { bundleModulesIsolated = false, stripEsmQuery = false, getOutputFileName } = options;
  
  // State variables - reset in buildStart to support multiple builds
  let workerEntries: Map<string, string>; // absolutePath -> entryName
  let emittedChunks: Map<string, { referenceId: string; originalQuery: string }>; // entryName -> { referenceId, originalQuery }
  let referenceIdToQuery: Map<string, string>; // referenceId -> originalQuery
  // For isolated builds: referenceId -> build info (emitted as assets, built separately)
  let pendingIsolatedBuilds: Map<string, { filePath: string; entryName: string }>;
  // For non-isolated builds with non-ESM output: referenceId -> build info (emitted as chunks, need recompilation)
  let pendingRecompilation: Map<string, { filePath: string; entryName: string }>;
  // Additional assets to emit (for multi-chunk isolated workers)
  let additionalAssets: Array<{ fileName: string; source: string }>;
  // Track our emitted reference IDs
  let ourReferenceIds: Set<string>;
  
  let outputFormat: string = 'es';
  let outputDir: string | undefined;

  return {
    name: 'esm-url-plugin',

    buildStart() {
      // Reset all state for new build
      workerEntries = new Map();
      emittedChunks = new Map();
      referenceIdToQuery = new Map();
      pendingIsolatedBuilds = new Map();
      pendingRecompilation = new Map();
      additionalAssets = [];
      ourReferenceIds = new Set();
      outputFormat = 'es';
      outputDir = undefined;
    },

    outputOptions(outputOpts) {
      outputFormat = outputOpts.format || 'es';
      outputDir = outputOpts.dir || (outputOpts.file ? path.dirname(outputOpts.file) : undefined);
      return null;
    },

    resolveFileUrl({ referenceId, fileName, relativePath }) {
      // Only customize resolution for files we emitted
      if (!ourReferenceIds.has(referenceId)) {
        return null; // Let other plugins or default handling take over
      }
      // Return the relative path, optionally with ?esm preserved for re-bundling
      const originalQuery = referenceIdToQuery.get(referenceId) || ESM_QUERY;
      const suffix = stripEsmQuery ? stripEsmFromQuery(originalQuery) : originalQuery;
      return `'${relativePath}${suffix}'`;
    },

    async resolveId(source, importer) {
      // Handle virtual worker entry points
      if (source.startsWith(VIRTUAL_PREFIX)) {
        return source;
      }
      return null;
    },

    async load(id) {
      // Load virtual worker entry points
      if (id.startsWith(VIRTUAL_PREFIX)) {
        const actualPath = id.slice(VIRTUAL_PREFIX.length);
        // Re-export from the actual file
        return `export * from ${JSON.stringify(actualPath)};`;
      }
      return null;
    },

    async renderStart() {
      // Build isolated workers and set their asset sources before rendering
      for (const [referenceId, buildInfo] of pendingIsolatedBuilds) {
        const esmBundle = await rollup({
          input: buildInfo.filePath,
          onwarn: (warning, warn) => {
            if (warning.code === 'UNRESOLVED_IMPORT') return;
            warn(warning);
          },
        });

        const { output } = await esmBundle.generate({
          format: 'es',
          entryFileNames: '[name].js',
          chunkFileNames: '[name]-[hash].js',
        });

        await esmBundle.close();

        // Set the asset source to the built ESM code
        const entryChunk = output.find(o => o.type === 'chunk' && o.isEntry);
        if (entryChunk && entryChunk.type === 'chunk') {
          this.setAssetSource(referenceId, entryChunk.code);
        }

        // Store additional chunks to emit later in generateBundle
        for (const chunk of output) {
          if (chunk.type === 'chunk' && !chunk.isEntry) {
            additionalAssets.push({ fileName: chunk.fileName, source: chunk.code });
          }
        }
      }
      pendingIsolatedBuilds.clear();
    },

    async transform(code, id) {
      // Skip non-JS files
      if (!/\.[jt]sx?$/.test(id)) {
        return null;
      }
      
      // Quick check: skip files that don't contain ?esm
      if (!code.includes(ESM_QUERY)) {
        return null;
      }

      const rawMatches = findMatches(code);
      
      if (rawMatches.length === 0) {
        return null;
      }

      // Convert raw matches to full matches with resolved paths
      const contextDir = process.cwd();
      const matches: EsmUrlMatch[] = [];
      
      for (const raw of rawMatches) {
        const [workerPath, ...queryParts] = raw.urlString.split('?');
        const originalQuery = queryParts.length > 0 ? '?' + queryParts.join('?') : '';
        const importerDir = path.dirname(id);
        const absolutePath = path.resolve(importerDir, workerPath);

        // Check that the file exists
        if (!fs.existsSync(absolutePath)) {
          const lines = code.slice(0, raw.start).split('\n');
          const line = lines.length;
          const column = lines[lines.length - 1].length;
          this.error({
            message: `File not found: '${workerPath}' resolved to '${absolutePath}'. Check that the path in new URL('${raw.urlString}', import.meta.url) points to an existing file.`,
            id,
            loc: { line, column },
          });
        }
        
        let entryName = generateEntryName(absolutePath, contextDir);
        
        // Apply custom output file name if provided
        if (getOutputFileName) {
          entryName = getOutputFileName({ filePath: absolutePath, suggestedName: entryName });
        }
        
        workerEntries.set(absolutePath, entryName);

        matches.push({
          filePath: absolutePath,
          entryName,
          originalQuery,
          start: raw.start,
          end: raw.end,
        });
      }

      // Replace matches in reverse order to preserve positions
      let newCode = code;
      for (const m of matches.reverse()) {
        let referenceId: string;
        
        if (bundleModulesIsolated) {
          // Emit as asset - will be built separately, not part of main module graph
          referenceId = this.emitFile({
            type: 'asset',
            name: `${m.entryName}.js`,
          });
          pendingIsolatedBuilds.set(referenceId, { filePath: m.filePath, entryName: m.entryName });
        } else {
          // Emit as chunk - part of main module graph, may share code with main bundle
          referenceId = this.emitFile({
            type: 'chunk',
            id: m.filePath,
            name: m.entryName,
          });
          pendingRecompilation.set(referenceId, { filePath: m.filePath, entryName: m.entryName });
        }
        
        ourReferenceIds.add(referenceId);
        referenceIdToQuery.set(referenceId, m.originalQuery);
        emittedChunks.set(m.entryName, { referenceId, originalQuery: m.originalQuery });

        // Replace with new URL using the resolved file URL
        // import.meta.ROLLUP_FILE_URL_<referenceId> will be replaced by resolveFileUrl hook
        const replacement = `new URL(import.meta.ROLLUP_FILE_URL_${referenceId}, import.meta.url)`;
        newCode = newCode.slice(0, m.start) + replacement + newCode.slice(m.end);
      }

      return {
        code: newCode,
        map: null, // TODO: Generate proper source map
      };
    },

    async generateBundle(outputOpts, bundle) {
      const isEsmOutput = outputFormat === 'es' || outputFormat === 'esm';

      // Emit additional assets from isolated worker builds (multi-chunk workers)
      for (const asset of additionalAssets) {
        this.emitFile({
          type: 'asset',
          fileName: asset.fileName,
          source: asset.source,
        });
      }
      additionalAssets.length = 0;

      // Handle non-isolated builds with non-ESM output - recompile chunks as ESM
      if (!isEsmOutput) {
        for (const [referenceId, buildInfo] of pendingRecompilation) {
          const fileName = this.getFileName(referenceId);
          const originalChunk = bundle[fileName];
          
          if (!originalChunk || originalChunk.type !== 'chunk') {
            continue;
          }

          // Build the worker as ESM using a separate rollup instance
          const esmBundle = await rollup({
            input: buildInfo.filePath,
            onwarn: (warning, warn) => {
              if (warning.code === 'UNRESOLVED_IMPORT') return;
              warn(warning);
            },
          });

          const { output } = await esmBundle.generate({
            format: 'es',
            entryFileNames: '[name].js',
            chunkFileNames: '[name]-[hash].js',
          });

          await esmBundle.close();

          // Replace the chunk content with ESM
          if (output.length === 1 && output[0].type === 'chunk') {
            originalChunk.code = output[0].code;
            if (output[0].map) {
              originalChunk.map = output[0].map;
            }
          } else {
            const entryChunk = output.find(o => o.type === 'chunk' && o.isEntry);
            if (entryChunk && entryChunk.type === 'chunk') {
              originalChunk.code = entryChunk.code;
              if (entryChunk.map) {
                originalChunk.map = entryChunk.map;
              }
            }

            for (const chunk of output) {
              if (chunk.type === 'chunk' && !chunk.isEntry) {
                this.emitFile({
                  type: 'asset',
                  fileName: chunk.fileName,
                  source: chunk.code,
                });
              }
            }
          }
        }
      }
      pendingRecompilation.clear();
    },
  };
}

export { esmUrlPlugin as rollupEsmUrlPlugin };
