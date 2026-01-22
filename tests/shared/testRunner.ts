import * as path from 'path';
import * as fs from 'fs';
import { createTwoFilesPatch } from 'diff';
import {
  loadAllFixtures,
  writeFixtureFiles,
  readOutputFiles,
  compareSnapshot,
  compareErrorSnapshot,
  writeSnapshot,
  TestFixture,
  TestOptions,
  Bundler,
} from './index';

/**
 * Configuration for a bundler test suite
 */
export interface BundlerTestConfig<TBuildResult = void> {
  /** Name of the bundler (webpack, rollup, vite, esbuild) */
  bundler: Bundler;
  /** Path to the test-fixtures directory */
  fixturesDir: string;
  /** Path to the snapshots directory for this bundler */
  snapshotsDir: string;
  /** Path to the tmp directory for this bundler */
  tmpDir: string;
  /** Function to run the build */
  runBuild: (testDir: string, entry: string, options: TestOptions) => Promise<TBuildResult>;
  /** Optional function to write a bundler config file for debugging */
  writeConfig?: (testDir: string, entry: string, options: TestOptions) => void;
  /** Optional function to validate build result (return false to fail test) */
  validateBuild?: (result: TBuildResult) => boolean;
  /** Optional function to determine entry point from fixture files */
  getEntryPoint?: (fixture: TestFixture) => string;
  /** Additional filter for fixtures beyond standard bundler support check */
  fixtureFilter?: (fixture: TestFixture) => boolean;
  /** Optional function to extract error message from a failed build result or thrown error */
  getErrorMessage?: (error: unknown, result?: TBuildResult) => string | undefined;
}

/**
 * Writes a package.json file for standalone debugging
 */
export function writePackageJson(testDir: string, buildCommand: string, type?: 'module'): void {
  const packageJson: Record<string, unknown> = {
    name: path.basename(testDir),
    private: true,
    scripts: {
      build: buildCommand,
    },
  };
  if (type) {
    packageJson.type = type;
  }
  fs.writeFileSync(
    path.join(testDir, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );
}

/**
 * Default entry point detection
 */
function defaultGetEntryPoint(fixture: TestFixture): string {
  if (fixture.files.has('index.js')) return 'index.js';
  if (fixture.files.has('index.mts')) return 'index.mts';
  if (fixture.files.has('index.ts')) return 'index.ts';
  return 'src/main.js';
}

/**
 * Runs a fixture test and compares output to snapshot
 */
export async function runFixtureTest<TBuildResult>(
  config: BundlerTestConfig<TBuildResult>,
  fixture: TestFixture,
  options: TestOptions,
  testNameSuffix?: string
): Promise<void> {
  const suffix = testNameSuffix ? `-${testNameSuffix}` : '';
  const testDir = path.join(config.tmpDir, `${fixture.name}${suffix}`);
  const outputDir = path.join(testDir, 'dist');

  // Write fixture files to tmp/input directory
  writeFixtureFiles(fixture, testDir);

  // Determine entry point
  const getEntry = config.getEntryPoint || defaultGetEntryPoint;
  const entry = getEntry(fixture);

  // Write config files for standalone debugging
  if (config.writeConfig) {
    config.writeConfig(testDir, entry, options);
  }

  // Handle expected errors
  if (options.expectedError) {
    let errorMessage: string | undefined;
    let result: TBuildResult | undefined;
    
    try {
      result = await config.runBuild(testDir, entry, options);
      
      // Some bundlers don't throw on error, check validation
      if (config.validateBuild && !config.validateBuild(result)) {
        // Build failed - get error message from result
        if (config.getErrorMessage) {
          errorMessage = config.getErrorMessage(undefined, result);
        }
      }
    } catch (err) {
      // Build threw an error
      if (config.getErrorMessage) {
        errorMessage = config.getErrorMessage(err, result);
      } else {
        errorMessage = err instanceof Error ? err.message : String(err);
      }
    }
    
    if (!errorMessage) {
      throw new Error(
        `Expected build to fail with error containing "${options.expectedError}", but build succeeded.`
      );
    }
    
    // Convert fixture files to input array
    const inputs = Array.from(fixture.files.entries()).map(([p, content]) => ({
      path: p,
      content,
    }));

    // Compare with error snapshot
    const snapshotName = `${fixture.name}${suffix}`;
    const snapshotPath = path.join(config.snapshotsDir, `${snapshotName}.snap.md`);
    const comparison = compareErrorSnapshot(snapshotPath, snapshotName, config.bundler, inputs, errorMessage);

    if (!comparison.matches) {
      if (process.env.UPDATE_SNAPSHOTS === 'true') {
        writeSnapshot(snapshotPath, comparison.actual);
        console.log(`Updated snapshot: ${snapshotPath}`);
      } else if (comparison.expected === null) {
        writeSnapshot(snapshotPath, comparison.actual);
        console.log(`Created snapshot: ${snapshotPath}`);
      } else {
        // Print a unified diff of expected vs actual
        const diff = createTwoFilesPatch(
          snapshotPath,
          'actual',
          comparison.expected!,
          comparison.actual,
          'expected',
          'actual'
        );
        console.log(diff);
        throw new Error(
          `Snapshot mismatch for ${snapshotName}.\n` +
          `Run with UPDATE_SNAPSHOTS=true to update.\n` +
          `Snapshot path: ${snapshotPath}`
        );
      }
    }
    return;
  }

  // Run build
  const result = await config.runBuild(testDir, entry, options);

  // Validate build result if validator provided
  if (config.validateBuild && !config.validateBuild(result)) {
    throw new Error(`Build validation failed for ${fixture.name}${suffix}`);
  }

  // Read output files
  const outputs = readOutputFiles(outputDir);
  expect(outputs.length).toBeGreaterThan(0);

  // Convert fixture files to input array
  const inputs = Array.from(fixture.files.entries()).map(([p, content]) => ({
    path: p,
    content,
  }));

  // Compare with snapshot
  const snapshotName = `${fixture.name}${suffix}`;
  const snapshotPath = path.join(config.snapshotsDir, `${snapshotName}.snap.md`);
  const comparison = compareSnapshot(snapshotPath, snapshotName, config.bundler, inputs, outputs);

  if (!comparison.matches) {
    if (process.env.UPDATE_SNAPSHOTS === 'true') {
      writeSnapshot(snapshotPath, comparison.actual);
      console.log(`Updated snapshot: ${snapshotPath}`);
    } else if (comparison.expected === null) {
      writeSnapshot(snapshotPath, comparison.actual);
      console.log(`Created snapshot: ${snapshotPath}`);
    } else {
      // Print a unified diff of expected vs actual
      const diff = createTwoFilesPatch(
        snapshotPath,
        'actual',
        comparison.expected!,
        comparison.actual,
        'expected',
        'actual'
      );
      console.log(diff);
      throw new Error(
        `Snapshot mismatch for ${snapshotName}.\n` +
        `Run with UPDATE_SNAPSHOTS=true to update.\n` +
        `Snapshot path: ${snapshotPath}`
      );
    }
  }
}

/**
 * Creates and runs a bundler test suite
 */
export function createBundlerTestSuite<TBuildResult>(
  config: BundlerTestConfig<TBuildResult>
): void {
  // Ensure directories exist
  if (!fs.existsSync(config.tmpDir)) {
    fs.mkdirSync(config.tmpDir, { recursive: true });
  }
  if (!fs.existsSync(config.snapshotsDir)) {
    fs.mkdirSync(config.snapshotsDir, { recursive: true });
  }

  const fixtures = loadAllFixtures(config.fixturesDir);
  const getEntry = config.getEntryPoint || defaultGetEntryPoint;

  // Filter fixtures that have an entry point and support this bundler
  const baseFilter = (f: TestFixture) => {
    // Must have an entry point
    const entry = getEntry(f);
    if (!f.files.has(entry) && !f.files.has('index.js') && !f.files.has('index.mts') && 
        !f.files.has('index.ts') && !f.files.has('src/main.js')) {
      return false;
    }
    // Must support this bundler
    if (f.testOptions?.bundlers && !f.testOptions.bundlers.includes(config.bundler)) {
      return false;
    }
    // Apply additional bundler-specific filter
    if (config.fixtureFilter && !config.fixtureFilter(f)) {
      return false;
    }
    return true;
  };

  // Filter fixtures without variants
  const testableFixtures = fixtures.filter(f => baseFilter(f) && !f.testOptions?.variants);

  // Run non-variant tests
  test.concurrent.each(testableFixtures.map(f => [f.name, f]))(
    'fixture: %s',
    async (name, fixture) => {
      await runFixtureTest(config, fixture, fixture.testOptions || {});
    }
  );

  // Filter fixtures with variants
  const variantFixtures = fixtures.filter(f => baseFilter(f) && f.testOptions?.variants);

  // Run variant tests
  for (const fixture of variantFixtures) {
    describe(`fixture: ${fixture.name}`, () => {
      for (const variant of fixture.testOptions!.variants!) {
        // Skip variants that don't match bundler filter
        if (config.fixtureFilter) {
          const testFixture = { ...fixture, testOptions: variant };
          if (!config.fixtureFilter(testFixture as TestFixture)) {
            continue;
          }
        }
        test(`variant: ${variant.name}`, async () => {
          await runFixtureTest(config, fixture, variant, variant.name);
        });
      }
    });
  }
}
