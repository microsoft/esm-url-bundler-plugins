import * as fs from 'fs';
import * as path from 'path';
import type { OutputFile } from './types';

/**
 * Generates a markdown snapshot from bundle inputs and outputs
 */
export function generateSnapshot(
  fixture: string,
  bundler: string,
  inputs: OutputFile[],
  outputs: OutputFile[]
): string {
  const lines: string[] = [
    `# ${fixture} (${bundler})`,
    '',
    '## Input Files',
    '',
  ];

  // Sort inputs for consistent ordering
  const sortedInputs = [...inputs].sort((a, b) => a.path.localeCompare(b.path));

  for (const input of sortedInputs) {
    const ext = path.extname(input.path).slice(1) || 'txt';
    lines.push(`### ${input.path}`);
    lines.push('');
    lines.push('```' + ext);
    lines.push(input.content.trim());
    lines.push('```');
    lines.push('');
  }

  lines.push('## Output Files');
  lines.push('');

  // Sort outputs for consistent ordering
  const sortedOutputs = [...outputs].sort((a, b) => a.path.localeCompare(b.path));

  for (const output of sortedOutputs) {
    const ext = path.extname(output.path).slice(1) || 'txt';
    lines.push(`### ${output.path}`);
    lines.push('');
    lines.push('```' + ext);
    // Skip source map content as it contains non-deterministic paths
    if (output.path.endsWith('.map')) {
      lines.push('(skipped in snapshot)');
    } else {
      lines.push(normalizeOutputContent(output.content.trim()));
    }
    lines.push('```');
    lines.push('');
  }

  return lines.join('\n');
}

/**
 * Reads an existing snapshot file
 */
export function readSnapshot(snapshotPath: string): string | null {
  if (!fs.existsSync(snapshotPath)) {
    return null;
  }
  return fs.readFileSync(snapshotPath, 'utf-8');
}

/**
 * Writes a snapshot file
 */
export function writeSnapshot(snapshotPath: string, content: string): void {
  fs.mkdirSync(path.dirname(snapshotPath), { recursive: true });
  fs.writeFileSync(snapshotPath, content);
}

/**
 * Normalizes output content to remove non-deterministic parts for consistent snapshots
 */
function normalizeOutputContent(content: string): string {
  return content
    // Normalize rollup file URL references (e.g., ROLLUP_FILE_URL_Cz0EJ_Cq -> ROLLUP_FILE_URL_####)
    .replace(/ROLLUP_FILE_URL_[A-Za-z0-9_]+/g, 'ROLLUP_FILE_URL_####');
}

/**
 * Normalizes error messages to remove non-deterministic parts for consistent snapshots
 */
function normalizeErrorMessage(errorMessage: string): string {
  return errorMessage
    // Remove absolute paths, keeping just the relative part
    // Windows paths (e.g., C:\path\to\tests\...)
    .replace(/[A-Za-z]:[\\\/][^'"\s\n]+[\\\/](tests[\\\/])/gi, '$1')
    // file:// URLs
    .replace(/file:\/\/\/[^'"\s\n]+[\\\/](tests[\\\/])/gi, '$1')
    // Unix absolute paths (e.g., /home/user/project/tests/...)
    .replace(/\/[^'"\s\n]+\/(tests\/)/gi, '$1')
    // Normalize path separators
    .replace(/\\/g, '/')
    // Remove vite timestamp-based paths
    .replace(/\.vite-temp\/[^\s]+\.timestamp-\d+-[a-f0-9]+\.mjs/gi, '.vite-temp/<config>')
    // Remove timing information (e.g., "in 12ms", "in 1.5s")
    .replace(/\b(in|took)\s+[\d.]+\s*(ms|s|seconds?|milliseconds?)\b/gi, 'in <time>')
    // Remove stack trace lines (file paths with line numbers)
    .replace(/^\s+at\s+.*$/gm, '')
    // Remove ANSI color codes
    .replace(/\x1B\[[0-9;]*[a-zA-Z]/g, '')
    // Clean up excessive blank lines from stack trace removal
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Generates a markdown snapshot for an error case
 */
export function generateErrorSnapshot(
  fixture: string,
  bundler: string,
  inputs: OutputFile[],
  errorMessage: string
): string {
  const lines: string[] = [
    `# ${fixture} (${bundler})`,
    '',
    '## Input Files',
    '',
  ];

  // Sort inputs for consistent ordering
  const sortedInputs = [...inputs].sort((a, b) => a.path.localeCompare(b.path));

  for (const input of sortedInputs) {
    const ext = path.extname(input.path).slice(1) || 'txt';
    lines.push(`### ${input.path}`);
    lines.push('');
    lines.push('```' + ext);
    lines.push(input.content.trim());
    lines.push('```');
    lines.push('');
  }

  lines.push('## Error');
  lines.push('');
  lines.push('```');
  lines.push(normalizeErrorMessage(errorMessage));
  lines.push('```');
  lines.push('');

  return lines.join('\n');
}

/**
 * Compares current output against stored snapshot
 * Returns null if they match, or the new snapshot content if they differ
 */
export function compareSnapshot(
  snapshotPath: string,
  fixture: string,
  bundler: string,
  inputs: OutputFile[],
  outputs: OutputFile[]
): { matches: boolean; actual: string; expected: string | null } {
  const actual = generateSnapshot(fixture, bundler, inputs, outputs);
  const expected = readSnapshot(snapshotPath);

  if (expected === null) {
    return { matches: false, actual, expected: null };
  }

  // Normalize line endings for comparison
  const normalizedActual = actual.replace(/\r\n/g, '\n').trim();
  const normalizedExpected = expected.replace(/\r\n/g, '\n').trim();

  return {
    matches: normalizedActual === normalizedExpected,
    actual,
    expected,
  };
}

/**
 * Compares current error against stored snapshot
 */
export function compareErrorSnapshot(
  snapshotPath: string,
  fixture: string,
  bundler: string,
  inputs: OutputFile[],
  errorMessage: string
): { matches: boolean; actual: string; expected: string | null } {
  const actual = generateErrorSnapshot(fixture, bundler, inputs, errorMessage);
  const expected = readSnapshot(snapshotPath);

  if (expected === null) {
    return { matches: false, actual, expected: null };
  }

  // Normalize line endings for comparison
  const normalizedActual = actual.replace(/\r\n/g, '\n').trim();
  const normalizedExpected = expected.replace(/\r\n/g, '\n').trim();

  return {
    matches: normalizedActual === normalizedExpected,
    actual,
    expected,
  };
}

/**
 * Reads all output files from a directory
 */
export function readOutputFiles(outputDir: string): OutputFile[] {
  const outputs: OutputFile[] = [];

  function walkDir(dir: string, prefix: string = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        walkDir(fullPath, relativePath);
      } else {
        outputs.push({
          path: relativePath,
          content: fs.readFileSync(fullPath, 'utf-8'),
        });
      }
    }
  }

  if (fs.existsSync(outputDir)) {
    walkDir(outputDir);
  }

  return outputs;
}
