import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { spawn, ChildProcess } from 'child_process';

const WORKER_OK_MARKER = '[WORKER_OK]';
const VITE_PORT = 5199;
const tmpDir = path.resolve(__dirname, '../vite/tmp');
const pluginPath = path.resolve(__dirname, '../../packages/rollup/dist/esm/index.js');

async function startViteDevServer(projectDir: string): Promise<ChildProcess> {
  const viteBin = path.resolve(__dirname, '../../node_modules/.bin/vite');
  
  const proc = spawn(viteBin, ['--port', String(VITE_PORT)], {
    cwd: projectDir,
    shell: true,
    stdio: 'ignore',
    env: { ...process.env },
  });

  // Give Vite time to start
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return proc;
}

async function setupViteServeProject(name: string): Promise<string> {
  const projectDir = path.join(tmpDir, `serve-mode-${name}`);
  const inputDir = path.join(projectDir, 'input');

  // Clean and create directories
  if (fs.existsSync(projectDir)) {
    fs.rmSync(projectDir, { recursive: true });
  }
  fs.mkdirSync(inputDir, { recursive: true });

  // Write test files
  fs.writeFileSync(
    path.join(inputDir, 'index.js'),
    `const workerUrl = new URL('./worker.js?esm', import.meta.url);
const worker = new Worker(workerUrl, { type: 'module' });
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
`
  );

  fs.writeFileSync(
    path.join(inputDir, 'worker.js'),
    `self.postMessage('serve-mode-worker');
`
  );

  // Write index.html for Vite dev server
  fs.writeFileSync(
    path.join(inputDir, 'index.html'),
    `<!DOCTYPE html>
<html>
<head><script type="module" src="./index.js"></script></head>
<body></body>
</html>
`
  );

  // Write Vite config
  const relativePluginPath = path.relative(projectDir, pluginPath).replace(/\\/g, '/');
  fs.writeFileSync(
    path.join(projectDir, 'vite.config.ts'),
    `import { defineConfig } from 'vite';
import { esmUrlPlugin } from '${relativePluginPath}';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, 'input'),
  plugins: [esmUrlPlugin()],
});
`
  );

  // Write package.json
  fs.writeFileSync(
    path.join(projectDir, 'package.json'),
    JSON.stringify({ name: `serve-mode-${name}`, private: true, type: 'module' }, null, 2)
  );

  return projectDir;
}

test.describe('Vite serve mode', () => {
  test('plugin is disabled in serve mode - worker runs without URL rewriting', async ({ page }) => {
    const projectDir = await setupViteServeProject('basic');
    let serverProcess: ChildProcess | null = null;

    try {
      serverProcess = await startViteDevServer(projectDir);

      const messages: string[] = [];
      const errors: string[] = [];
      page.on('console', (msg) => messages.push(msg.text()));
      page.on('pageerror', (err) => errors.push(err.message));
      page.on('requestfailed', (req) => errors.push(`Failed to load: ${req.url()}`));

      await page.goto(`http://localhost:${VITE_PORT}/`);

      await expect
        .poll(() => messages.some((m) => m.includes(WORKER_OK_MARKER)), {
          timeout: 10000,
          message: `Expected ${WORKER_OK_MARKER} in console.\nMessages: ${messages.join(', ')}\nErrors: ${errors.join(', ')}`,
        })
        .toBe(true);

      // Fail if there were any errors
      expect(errors, `Unexpected errors: ${errors.join(', ')}`).toHaveLength(0);
    } finally {
      if (serverProcess) {
        serverProcess.kill();
      }
    }
  });
});
