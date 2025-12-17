# @vscode/rollup-plugin-esm-url

Rollup plugin for handling `?esm` URL imports.

## Installation

```bash
npm install @vscode/rollup-plugin-esm-url --save-dev
```

## Usage

```js
// rollup.config.js
import { esmUrlPlugin } from '@vscode/rollup-plugin-esm-url';

export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'es',
  },
  plugins: [esmUrlPlugin()],
};
```

## How it works

The plugin detects `new URL('./path?esm', import.meta.url)` patterns and:

1. Emits the referenced file as a separate chunk
2. Bundles it with all its dependencies
3. Replaces the URL with the output filename

## Features

- Works with TypeScript (via @rollup/plugin-typescript)
- Handles multiple workers with the same filename in different directories
- Compatible with Rollup 3.x and 4.x
- **Also works with Vite** (which uses Rollup under the hood)

## Usage with Vite

```js
// vite.config.js
import { defineConfig } from 'vite';
import { esmUrlPlugin } from '@vscode/rollup-plugin-esm-url';

export default defineConfig({
  plugins: [esmUrlPlugin()],
});
```

## Options

```typescript
interface EsmUrlPluginOptions {
  /**
   * When true, each ?esm referenced module is built in its own isolated rollup step.
   * This ensures complete isolation between worker bundles but may be slower.
   * When false (default), workers are emitted as chunks in the main build and
   * only recompiled as ESM if the main output format is non-ESM.
   */
  bundleModulesIsolated?: boolean;
  
  /**
   * When true, strips the ?esm query parameter from output URLs.
   * When false (default), preserves ?esm for re-bundling scenarios.
   */
  stripEsmQuery?: boolean;
  
  /**
   * Custom function to generate output file names for worker/module files.
   * Receives the file path and suggested name, should return the desired name (without extension).
   */
  getOutputFileName?: (info: { filePath: string; suggestedName: string }) => string;
}
```

### Example with options

```js
esmUrlPlugin({
  bundleModulesIsolated: true,
  stripEsmQuery: true,
  getOutputFileName: ({ suggestedName }) => `worker-${suggestedName}`,
})
```
