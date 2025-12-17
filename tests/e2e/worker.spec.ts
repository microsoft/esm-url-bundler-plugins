import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import { getTestOptionsFromMarkdown, isFixtureSupportedFor, Bundler } from '../shared';

/** Marker string that workers output to indicate successful execution */
const WORKER_OK_MARKER = '[WORKER_OK]';

const bundlers: Bundler[] = ['webpack', 'rollup', 'vite', 'esbuild'];

const fixturesDir = path.resolve(__dirname, '../../test-fixtures');

function getMainEntry(distDir: string): string | null {
  if (fs.existsSync(path.join(distDir, 'main.js'))) return 'main.js';
  if (fs.existsSync(path.join(distDir, 'index.js'))) return 'index.js';
  return null;
}

function getTestOptionsForFixture(fixtureName: string) {
  // Handle variant names (e.g., "shared-module-workers-isolated" -> "shared-module-workers")
  const baseName = fixtureName.replace(/-isolated$|-shared$/, '');
  const mdPath = path.join(fixturesDir, `${baseName}.md`);
  return getTestOptionsFromMarkdown(mdPath);
}

// AMD wrapper uses RequireJS from CDN
function getHtmlWrapper(mainEntry: string, isAmd: boolean): string {
  if (isAmd) {
    return `<!DOCTYPE html>
<html><head>
<script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.7/require.min.js"></script>
<script>require(['${mainEntry.replace('.js', '')}']);</script>
</head><body></body></html>`;
  }
  return `<!DOCTYPE html>
<html><head><script type="module" src="${mainEntry}"></script></head><body></body></html>`;
}

function serve(dir: string, mainEntry: string, isAmd: boolean): Promise<{ server: http.Server; port: number }> {
  const wrapperHtml = getHtmlWrapper(mainEntry, isAmd);

  return new Promise(resolve => {
    const server = http.createServer((req, res) => {
      // Strip query string for file resolution
      const urlPath = req.url!.split('?')[0];
      let filePath = path.join(dir, urlPath === '/' ? 'index.html' : urlPath);
      const ext = path.extname(filePath);
      const contentType = ext === '.js' ? 'application/javascript' : 'text/html';
      
      // If no index.html exists, serve wrapper
      if (urlPath === '/' && !fs.existsSync(filePath)) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(wrapperHtml);
        return;
      }
      
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end('Not found');
        } else {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(data);
        }
      });
    });
    
    server.listen(0, () => {
      const port = (server.address() as any).port;
      resolve({ server, port });
    });
  });
}

for (const bundler of bundlers) {
  const tmpDir = path.resolve(__dirname, `../${bundler}/tmp`);
  
  // Skip if tmp directory doesn't exist yet (run jest first)
  if (!fs.existsSync(tmpDir)) continue;
  
  // Get all fixtures that have a dist folder with main.js or index.js
  // and are supported for this bundler
  const fixtures = fs.readdirSync(tmpDir).filter(name => {
    const distDir = path.join(tmpDir, name, 'dist');
    if (getMainEntry(distDir) === null) return false;
    const testOptions = getTestOptionsForFixture(name);
    return isFixtureSupportedFor(testOptions, bundler);
  });

  for (const fixture of fixtures) {
    test(`[${bundler}] ${fixture} worker runs correctly`, async ({ page }) => {
      const distDir = path.join(tmpDir, fixture, 'dist');
      const mainEntry = getMainEntry(distDir)!;
      const isAmd = fixture.includes('amd');
      const { server, port } = await serve(distDir, mainEntry, isAmd);
      
      try {
        const messages: string[] = [];
        const errors: string[] = [];
        page.on('console', msg => messages.push(msg.text()));
        page.on('pageerror', err => errors.push(err.message));
        page.on('requestfailed', req => errors.push(`Failed to load: ${req.url()}`));
        
        await page.goto(`http://localhost:${port}/`);
        
        await expect.poll(() => messages.some(m => m.includes(WORKER_OK_MARKER)), {
          timeout: 5000,
          message: `Expected ${WORKER_OK_MARKER} in console.\nMessages: ${messages.join(', ')}\nErrors: ${errors.join(', ')}`,
        }).toBe(true);
        
        // Fail if there were any errors
        expect(errors, `Unexpected errors: ${errors.join(', ')}`).toHaveLength(0);
      } finally {
        server.close();
      }
    });
  }
}
