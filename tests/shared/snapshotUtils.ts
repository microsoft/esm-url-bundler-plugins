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
    lines.push(output.content.trim());
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
