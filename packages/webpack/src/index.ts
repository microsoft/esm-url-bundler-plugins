import * as path from 'path';
import * as fs from 'fs';
import type { Compiler, Compilation } from 'webpack';
import {
  ESM_QUERY,
  stripEsmFromQuery,
  generateEntryName,
  type OutputFileNameInfo,
} from '@vscode/esm-url-plugin-common';

export type { OutputFileNameInfo };

// Try to import HtmlWebpackPlugin types if available, but don't fail if not
let HtmlWebpackPlugin: any;
try {
  HtmlWebpackPlugin = require('html-webpack-plugin');
} catch {
  // HtmlWebpackPlugin not installed
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

export class EsmUrlPlugin {
  private options: EsmUrlPluginOptions;

  constructor(options: EsmUrlPluginOptions = {}) {
    this.options = options;
  }

  apply(compiler: Compiler) {
    const { stripEsmQuery = false, getOutputFileName } = this.options;
    const { webpack } = compiler;
    const EntryPlugin = webpack.EntryPlugin;
    const ConstDependency = webpack.dependencies.ConstDependency;

    // Detect if webpack is configured to output ES modules
    const isOutputModule = compiler.options.experiments?.outputModule === true 
      || compiler.options.output?.module === true;

    compiler.hooks.compilation.tap('EsmUrlPlugin', (compilation: Compilation, { normalModuleFactory }) => {
      const entriesToAdd = new Map<string, string>();
      const addedEntryNames = new Set<string>();

      const handler = (parser: any) => {
        parser.hooks.new.for('URL').tap('EsmUrlPlugin', (expression: any): true | void => {
          if (expression.arguments.length !== 2) return;

          const arg1 = expression.arguments[0];
          const arg2 = expression.arguments[1];

          // Check if second argument is import.meta.url
          if (
            arg2.type !== 'MemberExpression' ||
            arg2.object.type !== 'MetaProperty' ||
            arg2.property.name !== 'url'
          ) {
            return;
          }

          // Check if first argument is a string literal with ?esm
          if (arg1.type !== 'Literal' || typeof arg1.value !== 'string') return;
          if (!arg1.value.includes(ESM_QUERY)) return;
          
          const [workerPath, ...queryParts] = arg1.value.split('?');
          const originalQuery = queryParts.length > 0 ? '?' + queryParts.join('?') : '';
          const context = parser.state.module.context;
          if (!context) return;
          
          const absolutePath = path.resolve(context, workerPath);
          
          // Check that the file exists
          if (!fs.existsSync(absolutePath)) {
            const WebpackError = webpack.WebpackError;
            const error = new WebpackError(
              `File not found: '${workerPath}' resolved to '${absolutePath}'. Check that the path in new URL('${arg1.value}', import.meta.url) points to an existing file.`
            );
            error.name = 'EsmUrlPluginError';
            error.module = parser.state.module;
            error.loc = expression.loc;
            compilation.errors.push(error);
            return;
          }
          
          let entryName = generateEntryName(absolutePath, compiler.context);
          
          // Apply custom output file name if provided
          if (getOutputFileName) {
            entryName = getOutputFileName({ filePath: absolutePath, suggestedName: entryName });
          }
          
          if (!entriesToAdd.has(absolutePath)) {
            entriesToAdd.set(absolutePath, entryName);
            addedEntryNames.add(entryName);
          }

          // Replace the entire new URL(...) expression
          // Use import.meta.url for ESM output, otherwise use self.location.href for compatibility
          // Note: The non-ESM version assumes worker files are served from the same base path as the HTML
          const suffix = stripEsmQuery ? stripEsmFromQuery(originalQuery) : originalQuery;
          const replacement = isOutputModule
            ? `new URL('./${entryName}.js${suffix}', import.meta.url)`
            : `new URL('./${entryName}.js${suffix}', self.location.href)`;
          
          const dep = new ConstDependency(replacement, expression.range!);
          dep.loc = expression.loc;
          parser.state.module.addDependency(dep);

          // Return true to prevent Webpack's default handling of new URL(...)
          return true;
        });
      };

      // Tap into all JS parser types
      normalModuleFactory.hooks.parser.for('javascript/auto').tap('EsmUrlPlugin', handler);
      normalModuleFactory.hooks.parser.for('javascript/dynamic').tap('EsmUrlPlugin', handler);
      normalModuleFactory.hooks.parser.for('javascript/esm').tap('EsmUrlPlugin', handler);

      // Add entries after modules are built
      compilation.hooks.finishModules.tapAsync('EsmUrlPlugin', (modules, callback) => {
        if (entriesToAdd.size === 0) return callback();

        const promises: Promise<void>[] = [];

        for (const [absolutePath, entryName] of entriesToAdd) {
          // Check if entry already exists to avoid duplicates/errors
          if (compilation.entries.has(entryName)) {
            continue;
          }

          const dep = EntryPlugin.createDependency(absolutePath, {
            name: entryName
          });

          promises.push(new Promise((resolve, reject) => {
            compilation.addEntry(compiler.context, dep, { name: entryName }, (err) => {
              if (err) reject(err);
              else resolve();
            });
          }));
        }
        
        // Clear processed entries
        entriesToAdd.clear();

        Promise.all(promises).then(() => callback(), (err) => callback(err));
      });

      // Filter out worker entries from HtmlWebpackPlugin
      if (HtmlWebpackPlugin && HtmlWebpackPlugin.getHooks) {
        HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
          'EsmUrlPlugin',
          (data: any, cb: any) => {
            const workerFiles = new Set<string>();
            for (const name of addedEntryNames) {
              const entrypoint = compilation.entrypoints.get(name);
              if (entrypoint) {
                entrypoint.getFiles().forEach(file => workerFiles.add(file));
              }
            }

            data.assets.js = data.assets.js.filter((asset: string) => !workerFiles.has(asset));
            cb(null, data);
          }
        );
      }
    });
  }
}

export { EsmUrlPlugin as WebpackEsmUrlPlugin };
