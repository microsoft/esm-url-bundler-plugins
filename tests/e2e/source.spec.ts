import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import { getTestOptionsFromMarkdown } from '../shared';

const fixturesDir = path.resolve(__dirname, '../../test-fixtures');

// Parse fixture markdown to extract files
function parseFixture(fixturePath: string): Map<string, string> {
  const content = fs.readFileSync(fixturePath, 'utf-8');
  const files = new Map<string, string>();
  const codeBlockRegex = /```(?:\w+)?\s+path=([^\n]+)\n([\s\S]*?)```/g;
  
  let match;
  while ((match = codeBlockRegex.exec(content)) !== null) {
    const filePath = match[1].trim();
    const fileContent = match[2];
    // Skip test-options.json
    if (filePath !== 'test-options.json') {
      files.set(filePath, fileContent);
    }
  }
  return files;
}

// Get fixtures that can run from source (ESM only, no bundler-specific features)
function getSourceTestableFixtures(): string[] {
  const allFixtures = fs.readdirSync(fixturesDir)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''));
  
  // Skip fixtures that require bundler features
  const skip = [
    'amd-with-esm-worker',       // AMD requires bundler
    'esm-output-with-html-plugin', // Tests bundler-specific output
  ];
  
  return allFixtures.filter(f => {
    if (skip.includes(f)) return false;
    // Skip fixtures that are restricted to specific bundlers
    const mdPath = path.join(fixturesDir, `${f}.md`);
    const options = getTestOptionsFromMarkdown(mdPath);
    if (options?.bundlers && options.bundlers.length > 0) return false;
    return true;
  });
}

function serve(files: Map<string, string>): Promise<{ server: http.Server; port: number }> {
  // Determine main entry point
  const mainEntry = files.has('index.js') ? 'index.js' : 
                    files.has('src/main.js') ? 'src/main.js' : null;
  
  const html = mainEntry ? `<!DOCTYPE html>
<html><head><script type="module" src="${mainEntry}"></script></head><body></body></html>` : '';

  return new Promise(resolve => {
    const server = http.createServer((req, res) => {
      // Strip query string (like ?esm) for file lookup
      const urlPath = req.url!.split('?')[0];
      let filePath = urlPath === '/' ? 'index.html' : urlPath.slice(1);
      const ext = path.extname(filePath);
      const contentType = ext === '.js' ? 'application/javascript' : 'text/html';
      
      if (filePath === 'index.html') {
        // Serve generated HTML if no index.html in fixture
        const content = files.has('index.html') ? files.get('index.html')! : html;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
        return;
      }
      
      // Check for file with various path forms
      let content = files.get(filePath);
      if (!content) {
        // Try with ./ prefix
        content = files.get('./' + filePath);
      }
      if (!content) {
        // Try all files and match by basename or relative path
        for (const [key, val] of files) {
          const normalizedKey = key.replace(/^\.\//, '');
          if (normalizedKey === filePath || key.endsWith('/' + filePath)) {
            content = val;
            break;
          }
        }
      }
      
      if (content) {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      } else {
        console.log('Not found:', filePath, 'Available:', Array.from(files.keys()));
        res.writeHead(404);
        res.end('Not found: ' + filePath);
      }
    });
    
    server.listen(0, () => {
      const port = (server.address() as any).port;
      resolve({ server, port });
    });
  });
}

const fixtures = getSourceTestableFixtures();

for (const fixtureName of fixtures) {
  test(`[source] ${fixtureName} works without bundler`, async ({ page }) => {
    const fixturePath = path.join(fixturesDir, `${fixtureName}.md`);
    const files = parseFixture(fixturePath);
    
    // Skip if no entry point
    if (!files.has('index.js') && !files.has('src/main.js')) {
      test.skip();
      return;
    }
    
    const { server, port } = await serve(files);
    
    try {
      const messages: string[] = [];
      const errors: string[] = [];
      page.on('console', msg => messages.push(msg.text()));
      page.on('pageerror', err => errors.push(err.message));
      page.on('requestfailed', req => errors.push(`Failed to load: ${req.url()}`));
      
      await page.goto(`http://localhost:${port}/`);
      
      await expect.poll(() => messages.some(m => m.includes('[WORKER_OK]')), {
        timeout: 5000,
        message: `Expected [WORKER_OK] in console.\nMessages: ${messages.join(', ')}\nErrors: ${errors.join(', ')}`,
      }).toBe(true);
      
      // Fail if there were any errors
      expect(errors, `Unexpected errors: ${errors.join(', ')}`).toHaveLength(0);
    } finally {
      server.close();
    }
  });
}
