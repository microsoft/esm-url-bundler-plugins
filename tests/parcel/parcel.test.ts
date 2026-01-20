import * as path from 'path';
import * as fs from 'fs';
import { Parcel } from '@parcel/core';
import {
    createBundlerTestSuite,
    writePackageJson,
    TestOptions,
} from '../shared';

const fixturesDir = path.resolve(__dirname, '../../test-fixtures');
const snapshotsDir = path.resolve(__dirname, 'snapshots');
const tmpDir = path.resolve(__dirname, 'tmp');

function writeParcelConfig(testDir: string, entry: string, options: TestOptions = {}): void {
  // Parcel handles new URL('./file.js', import.meta.url) natively - no plugin needed
  // Just write a minimal .parcelrc that uses the default config
  const parcelRc = {
    extends: '@parcel/config-default',
  };
  fs.writeFileSync(path.join(testDir, '.parcelrc'), JSON.stringify(parcelRc, null, 2));

  writePackageJson(testDir, 'parcel build input/' + entry + ' --dist-dir dist', 'module');
}

async function runParcel(testDir: string, entry: string, options: TestOptions = {}): Promise<void> {
  const inputDir = path.join(testDir, 'input');
  const outputDir = path.join(testDir, 'dist');

  // Clean output directory
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true });
  }

  // Parcel natively handles new URL('./worker.js?esm', import.meta.url) patterns
  // so we use the default config without our custom transformer
  const bundler = new Parcel({
    entries: path.join(inputDir, entry),
    defaultConfig: '@parcel/config-default',
    mode: 'production',
    defaultTargetOptions: {
      distDir: outputDir,
      outputFormat: 'esmodule',
      isLibrary: false,
      shouldScopeHoist: true,
    },
    shouldDisableCache: true,
    additionalReporters: [],
  });

  await bundler.run();
}

describe('Parcel esmUrlPlugin', () => {
  createBundlerTestSuite({
    bundler: 'parcel',
    fixturesDir,
    snapshotsDir,
    tmpDir,
    runBuild: runParcel,
    writeConfig: writeParcelConfig,
    getEntryPoint: (fixture) => fixture.files.has('index.js') ? 'index.js' : 'src/main.js',
    // Parcel has some limitations - filter fixtures that work with Parcel
    fixtureFilter: (fixture) => {
      // Skip fixtures that use features not supported by this Parcel integration
      const options = fixture.testOptions;
      // Skip AMD/CJS format tests as they're Rollup-specific
      if (options?.format && options.format !== 'es') {
        return false;
      }
      // Skip bundleModulesIsolated tests as they're Rollup-specific
      if (options?.bundleModulesIsolated) {
        return false;
      }
      // Skip outputModule tests as they're Webpack-specific
      if (options?.outputModule !== undefined) {
        return false;
      }
      return true;
    },
    getErrorMessage: (error) => {
      if (error instanceof Error) return error.message;
      return error ? String(error) : undefined;
    },
  });
});
