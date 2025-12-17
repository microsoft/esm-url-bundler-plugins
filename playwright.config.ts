import { defineConfig } from '@playwright/test';
import os from 'os';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 10000,
  // Parallelization settings
  fullyParallel: true,
  workers: Math.max(1, Math.floor(os.cpus().length / 2)), // Use half of available CPU cores
  use: {
    headless: true,
  },
});
