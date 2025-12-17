# @vscode/esbuild-plugin-esm-url

An esbuild plugin that transforms `new URL('./worker.js?esm', import.meta.url)` patterns into bundled worker entry points.

## Installation

```bash
npm install @vscode/esbuild-plugin-esm-url esbuild
```

## Usage

```javascript
import * as esbuild from 'esbuild';
import { esmUrlPlugin } from '@vscode/esbuild-plugin-esm-url';

await esbuild.build({
  entryPoints: ['src/index.js'],
  bundle: true,
  outdir: 'dist',
  format: 'esm',
  plugins: [esmUrlPlugin()],
});
```

## How it works

The plugin scans for `new URL('./path/to/worker.js?esm', import.meta.url)` patterns and:

1. Extracts the worker file path
2. Builds the worker as a separate ESM entry point
3. Replaces the URL pattern with a reference to the bundled worker

## Options

```typescript
interface EsmUrlPluginOptions {
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

```javascript
import { esmUrlPlugin } from '@vscode/esbuild-plugin-esm-url';

esmUrlPlugin({
  stripEsmQuery: true,
  getOutputFileName: ({ suggestedName }) => `worker-${suggestedName}`,
});
```

## License

MIT
