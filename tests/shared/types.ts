import { z } from 'zod';

/**
 * Zod schema for test options that can be specified per fixture
 */
export const TestOptionsSchema = z.object({
  /** Rollup output format */
  format: z.enum(['es', 'amd', 'cjs', 'iife', 'umd', 'system']).optional(),
  /** Whether to bundle modules in isolation */
  bundleModulesIsolated: z.boolean().optional(),
  /** Whether to enable webpack ESM output (experiments.outputModule) */
  outputModule: z.boolean().optional(),
  /** Which bundlers this fixture supports (defaults to all) */
  bundlers: z.array(z.enum(['webpack', 'rollup', 'vite', 'esbuild', 'parcel'])).optional(),
  /** Whether to strip ?esm from output URLs (default: false, preserves ?esm) */
  stripEsmQuery: z.boolean().optional(),
  /** 
   * Custom output file name strategy for worker files.
   * 'basename' - Use just the file basename (e.g., 'editorWorkerMain' instead of 'node_modules-monaco-editor-esm-...')
   */
  customOutputFileName: z.enum(['basename']).optional(),
  /**
   * Expected error message substring. When set, the test expects the build to fail
   * with an error containing this string.
   */
  expectedError: z.string().optional(),
}).strict();

/**
 * Zod schema for test options with variants (recursive)
 */
export const TestOptionsWithVariantsSchema: z.ZodType<TestOptions> = TestOptionsSchema.extend({
  /** Test variants with different options */
  variants: z.lazy(() => z.array(TestOptionsSchema.extend({ name: z.string() }))).optional(),
});

/**
 * Test options that can be specified per fixture
 */
export type TestOptions = z.infer<typeof TestOptionsSchema> & {
  variants?: Array<z.infer<typeof TestOptionsSchema> & { name: string }>;
};

/** Bundler type */
export type Bundler = 'webpack' | 'rollup' | 'vite' | 'esbuild' | 'parcel';

/**
 * Represents a parsed test fixture
 */
export interface TestFixture {
  /** Name of the fixture (derived from filename) */
  name: string;
  /** Description from the markdown */
  description: string;
  /** Map of relative file paths to their contents */
  files: Map<string, string>;
  /** Expected behaviors (for documentation) */
  expectedBehaviors: string[];
  /** Test options parsed from test-options.json */
  testOptions?: TestOptions;
}

/**
 * Represents a compiled output file
 */
export interface OutputFile {
  /** Relative path in output directory */
  path: string;
  /** File contents */
  content: string;
}

/**
 * Result of running a bundler on a fixture
 */
export interface BundleResult {
  /** Whether bundling succeeded */
  success: boolean;
  /** Error message if failed */
  error?: string;
  /** Output files produced */
  outputs: OutputFile[];
}

/**
 * Snapshot format for storing bundler outputs
 */
export interface Snapshot {
  /** Fixture name */
  fixture: string;
  /** Bundler name */
  bundler: string;
  /** Output files */
  outputs: OutputFile[];
}
