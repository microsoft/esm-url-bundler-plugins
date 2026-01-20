import * as path from 'path';
import * as fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import {
  createBundlerTestSuite,
  writePackageJson,
  TestOptions,
  TestFixture,
} from '../shared';

const execAsync = promisify(exec);

const fixturesDir = path.resolve(__dirname, '../../test-fixtures');
const snapshotsDir = path.resolve(__dirname, 'snapshots');
const tmpDir = path.resolve(__dirname, 'tmp');

function writeViteConfig(testDir: string, entry: string, options: TestOptions = {}): void {
  const bundleModulesIsolated = options.bundleModulesIsolated ?? false;
  const stripEsmQuery = options.stripEsmQuery ?? false;
  const customOutputFileName = options.customOutputFileName;
  // Use relative path from packages/rollup/src for the plugin
  const pluginPath = path.relative(testDir, path.resolve(__dirname, '../../packages/rollup/src/index.ts')).replace(/\\/g, '/');
  
  // Build getOutputFileName function if needed
  let getOutputFileNameCode = 'undefined';
  if (customOutputFileName === 'basename') {
    getOutputFileNameCode = `({ filePath }) => {
      // Extract just the filename without extension
      const lastSlash = Math.max(filePath.lastIndexOf('/'), filePath.lastIndexOf('\\\\'));
      const filename = lastSlash >= 0 ? filePath.slice(lastSlash + 1) : filePath;
      const dotIndex = filename.lastIndexOf('.');
      return dotIndex > 0 ? filename.slice(0, dotIndex) : filename;
    }`;
  }
  
  const configContent = `import { defineConfig } from 'vite';
import { esmUrlPlugin } from '${pluginPath}';
import path from 'path';

const getOutputFileName = ${getOutputFileNameCode};

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: false,
    rollupOptions: {
      input: path.resolve(__dirname, 'input/${entry}'),
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name][extname]',
      },
    },
  },
  plugins: [esmUrlPlugin({ bundleModulesIsolated: ${bundleModulesIsolated}, stripEsmQuery: ${stripEsmQuery}, getOutputFileName })],
});
`;
  fs.writeFileSync(path.join(testDir, 'vite.config.ts'), configContent);
  writePackageJson(testDir, 'vite build', 'module');
}

function runVite(testDir: string): Promise<void> {
  return execAsync('npx vite build', {
    cwd: testDir,
    env: { ...process.env, NODE_ENV: 'production' },
  }).then(() => {});
}

describe('Vite with esmUrlPlugin', () => {
  createBundlerTestSuite({
    bundler: 'vite',
    fixturesDir,
    snapshotsDir,
    tmpDir,
    runBuild: (testDir, entry, options) => {
      writeViteConfig(testDir, entry, options);
      return runVite(testDir);
    },
    writeConfig: writeViteConfig,
    getEntryPoint: (fixture) => fixture.files.has('index.js') ? 'index.js' : 'src/main.js',
    // Skip AMD format - Vite doesn't support AMD output
    fixtureFilter: (fixture: TestFixture) => fixture.testOptions?.format !== 'amd',
    getErrorMessage: (error) => {
      if (error instanceof Error) return error.message;
      return error ? String(error) : undefined;
    },
  });
});
