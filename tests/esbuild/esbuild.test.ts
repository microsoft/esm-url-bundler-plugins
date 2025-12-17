import * as path from 'path';
import * as fs from 'fs';
import * as esbuild from 'esbuild';
import { esmUrlPlugin } from '../../packages/esbuild/src';
import {
  createBundlerTestSuite,
  writePackageJson,
  TestOptions,
  TestFixture,
  getOutputFileNameFunction,
} from '../shared';

const fixturesDir = path.resolve(__dirname, '../../test-fixtures');
const snapshotsDir = path.resolve(__dirname, 'snapshots');
const tmpDir = path.resolve(__dirname, 'tmp');

function writeEsbuildConfig(testDir: string, entry: string, options: TestOptions = {}): void {
  const stripEsmQuery = options.stripEsmQuery ?? false;
  const configContent = `import * as esbuild from 'esbuild';
import { esmUrlPlugin } from '@esm-url/esbuild';

await esbuild.build({
  entryPoints: ['input/${entry}'],
  bundle: true,
  format: 'esm',
  outdir: 'dist',
  plugins: [esmUrlPlugin({ stripEsmQuery: ${stripEsmQuery} })],
});
`;
  fs.writeFileSync(path.join(testDir, 'build.mjs'), configContent);
  writePackageJson(testDir, 'node build.mjs', 'module');
}

async function runEsbuild(testDir: string, entry: string, options: TestOptions = {}): Promise<esbuild.BuildResult> {
  const inputDir = path.join(testDir, 'input');
  const outputDir = path.join(testDir, 'dist');
  const stripEsmQuery = options.stripEsmQuery ?? false;
  const getOutputFileName = getOutputFileNameFunction(options.customOutputFileName);

  // Clean output directory
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true, force: true });
  }
  fs.mkdirSync(outputDir, { recursive: true });

  const result = await esbuild.build({
    entryPoints: [path.join(inputDir, entry)],
    bundle: true,
    format: 'esm',
    outdir: outputDir,
    write: true,
    plugins: [esmUrlPlugin({ stripEsmQuery, getOutputFileName })],
    logLevel: 'silent',
  });

  return result;
}

describe('esbuild esmUrlPlugin', () => {
  createBundlerTestSuite({
    bundler: 'esbuild',
    fixturesDir,
    snapshotsDir,
    tmpDir,
    runBuild: runEsbuild,
    writeConfig: writeEsbuildConfig,
    validateBuild: (result) => result.errors.length === 0,
    getEntryPoint: (fixture: TestFixture) => {
      if (fixture.files.has('index.js')) return 'index.js';
      if (fixture.files.has('index.mts')) return 'index.mts';
      if (fixture.files.has('index.ts')) return 'index.ts';
      return 'src/main.js';
    },
    // Skip AMD format - esbuild doesn't support AMD output
    fixtureFilter: (fixture: TestFixture) => fixture.testOptions?.format !== 'amd',
  });
});
