import * as fs from 'fs';
import * as path from 'path';
import type { TestFixture, TestOptions, Bundler } from './types';
import { TestOptionsWithVariantsSchema } from './types';

/**
 * Parses test-options.json content and validates with Zod
 */
export function parseTestOptions(jsonContent: string, fixtureName: string): TestOptions | undefined {
  try {
    const parsed = JSON.parse(jsonContent);
    const result = TestOptionsWithVariantsSchema.safeParse(parsed);
    if (!result.success) {
      console.error(`Invalid test-options.json in ${fixtureName}:`, result.error.format());
      throw new Error(`Invalid test-options.json in ${fixtureName}: ${result.error.message}`);
    }
    return result.data;
  } catch (e) {
    if (e instanceof SyntaxError) {
      console.warn(`Failed to parse test-options.json in ${fixtureName}:`, e);
      return undefined;
    }
    throw e;
  }
}

/**
 * Extracts and validates test-options.json from a fixture markdown file
 * Useful for e2e tests that need to read options without full fixture parsing
 */
export function getTestOptionsFromMarkdown(fixturePath: string): TestOptions | undefined {
  if (!fs.existsSync(fixturePath)) return undefined;
  
  const content = fs.readFileSync(fixturePath, 'utf-8');
  const match = content.match(/```json\s+path=test-options\.json\n([\s\S]*?)```/);
  if (!match) return undefined;
  
  const fixtureName = path.basename(fixturePath, '.md');
  return parseTestOptions(match[1], fixtureName);
}

/**
 * Checks if a fixture supports a specific bundler
 */
export function isFixtureSupportedFor(testOptions: TestOptions | undefined, bundler: Bundler): boolean {
  if (!testOptions?.bundlers) return true; // No restriction = all bundlers
  return testOptions.bundlers.includes(bundler);
}

/**
 * Parses a test fixture markdown file into a TestFixture object
 * 
 * Expected format:
 * ```
 * # fixture-name
 * 
 * Description text...
 * 
 * ## Files
 * 
 * ```json path=test-options.json
 * { "format": "amd" }
 * ```
 * 
 * ```js path=relative/path.js
 * file contents
 * ```
 * 
 * ## Expected Behavior
 * 
 * - behavior 1
 * - behavior 2
 * ```
 */
export function parseFixture(fixturePath: string): TestFixture {
  const content = fs.readFileSync(fixturePath, 'utf-8');
  const name = path.basename(fixturePath, '.md');
  
  // Extract description (text between title and ## Files)
  const descriptionMatch = content.match(/^#\s+[\w-]+\n\n([\s\S]*?)(?=\n## Files)/);
  const description = descriptionMatch ? descriptionMatch[1].trim() : '';
  
  // Extract files from code blocks with path= attribute
  const files = new Map<string, string>();
  const codeBlockRegex = /```(?:\w+)?\s+path=([^\n]+)\n([\s\S]*?)```/g;
  
  let match;
  while ((match = codeBlockRegex.exec(content)) !== null) {
    const filePath = match[1].trim();
    const fileContent = match[2];
    files.set(filePath, fileContent);
  }
  
  // Extract test options from test-options.json if present
  let testOptions: TestOptions | undefined;
  const testOptionsContent = files.get('test-options.json');
  if (testOptionsContent) {
    testOptions = parseTestOptions(testOptionsContent, name);
    // Remove test-options.json from files - it's not a source file
    files.delete('test-options.json');
  }
  
  // Extract expected behaviors
  const behaviorsMatch = content.match(/## Expected Behavior\n\n([\s\S]*?)(?=$|\n## )/);
  const expectedBehaviors: string[] = [];
  
  if (behaviorsMatch) {
    const behaviorLines = behaviorsMatch[1].split('\n');
    for (const line of behaviorLines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('- ')) {
        expectedBehaviors.push(trimmed.slice(2));
      }
    }
  }
  
  return {
    name,
    description,
    files,
    expectedBehaviors,
    testOptions,
  };
}

/**
 * Loads all fixtures from the test-fixtures directory
 */
export function loadAllFixtures(fixturesDir: string): TestFixture[] {
  const files = fs.readdirSync(fixturesDir).filter(f => f.endsWith('.md'));
  return files.map(f => parseFixture(path.join(fixturesDir, f)));
}

/**
 * Writes fixture files to a temporary directory for bundling
 * Files are written to targetDir/input/
 */
export function writeFixtureFiles(fixture: TestFixture, targetDir: string): void {
  const inputDir = path.join(targetDir, 'input');
  
  // Clean and create target directory
  if (fs.existsSync(targetDir)) {
    fs.rmSync(targetDir, { recursive: true, force: true });
  }
  fs.mkdirSync(inputDir, { recursive: true });
  
  // Write each file to input/
  for (const [filePath, content] of fixture.files) {
    const fullPath = path.join(inputDir, filePath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content);
  }
}
