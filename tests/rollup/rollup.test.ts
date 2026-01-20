import * as path from 'path';
import * as fs from 'fs';
import { rollup, OutputOptions } from 'rollup';
import { esmUrlPlugin } from '../../packages/rollup/src';
import {
  createBundlerTestSuite,
  writePackageJson,
  TestOptions,
  getOutputFileNameFunction,
} from '../shared';

const fixturesDir = path.resolve(__dirname, '../../test-fixtures');
const snapshotsDir = path.resolve(__dirname, 'snapshots');
const tmpDir = path.resolve(__dirname, 'tmp');

function writeRollupConfig(testDir: string, entry: string, options: TestOptions = {}): void {
  const format = options.format || 'es';
  const bundleModulesIsolated = options.bundleModulesIsolated ?? false;
  const stripEsmQuery = options.stripEsmQuery ?? false;
  const configContent = `import { esmUrlPlugin } from '@esm-url/rollup';

export default {
  input: 'input/${entry}',
  output: {
    dir: 'dist',
    format: '${format}',
    entryFileNames: '[name].js',
    chunkFileNames: '[name].js',
    assetFileNames: '[name][extname]',
  },
  plugins: [esmUrlPlugin({ bundleModulesIsolated: ${bundleModulesIsolated}, stripEsmQuery: ${stripEsmQuery} })],
};
`;
  fs.writeFileSync(path.join(testDir, 'rollup.config.js'), configContent);
  writePackageJson(testDir, 'rollup --config rollup.config.js');
}

async function runRollup(testDir: string, entry: string, options: TestOptions = {}): Promise<void> {
  const inputDir = path.join(testDir, 'input');
  const outputDir = path.join(testDir, 'dist');
  const format = options.format || 'es';
  const bundleModulesIsolated = options.bundleModulesIsolated ?? false;
  const stripEsmQuery = options.stripEsmQuery ?? false;
  const getOutputFileName = getOutputFileNameFunction(options.customOutputFileName);
  
  const bundle = await rollup({
    input: path.join(inputDir, entry),
    plugins: [esmUrlPlugin({ bundleModulesIsolated, stripEsmQuery, getOutputFileName })],
    onwarn: (warning, warn) => {
      // Suppress certain warnings for cleaner test output
      if (warning.code === 'UNRESOLVED_IMPORT') return;
      warn(warning);
    },
  });

  const outputOptions: OutputOptions = {
    dir: outputDir,
    format,
    entryFileNames: '[name].js',
    chunkFileNames: '[name].js',
    assetFileNames: '[name][extname]',
  };

  // AMD requires a name for single entry builds
  if (format === 'amd') {
    outputOptions.amd = { autoId: true };
  }

  await bundle.write(outputOptions);
  await bundle.close();
}

describe('Rollup esmUrlPlugin', () => {
  createBundlerTestSuite({
    bundler: 'rollup',
    fixturesDir,
    snapshotsDir,
    tmpDir,
    runBuild: runRollup,
    writeConfig: writeRollupConfig,
    getEntryPoint: (fixture) => fixture.files.has('index.js') ? 'index.js' : 'src/main.js',
    getErrorMessage: (error) => {
      if (error instanceof Error) {
        // Rollup errors have 'loc' property with line/column info
        const rollupError = error as Error & { loc?: { line: number; column: number }; id?: string; frame?: string; pos?: number };
        let message = rollupError.message;
        if (rollupError.loc && rollupError.id) {
          const fileName = path.basename(rollupError.id);
          message = `${fileName}:${rollupError.loc.line}:${rollupError.loc.column} - ${message}`;
        }
        if (rollupError.frame) {
          message += '\n' + rollupError.frame;
        }
        return message;
      }
      return error ? String(error) : undefined;
    },
  });
});
