# esm-url-plugin

Bundler plugins that preserve the semantics of `new URL('./file.js', import.meta.url)` after bundling.

This library simplifies the distribution of libraries that use web workers, such as the [Monaco Editor](https://github.com/microsoft/monaco-editor). Note that the scope of this project is intentionally narrow — feature requests are unlikely to be addressed.

## The Problem

In native ESM, this pattern works perfectly:

```js
const workerUrl = new URL('./worker.js', import.meta.url);
// Use it anywhere:
new Worker(workerUrl);
fetch(workerUrl);
passToLibrary(workerUrl);
```

The URL resolves correctly at runtime because `import.meta.url` points to the current module.

**But bundlers break this.** After bundling:
- `import.meta.url` now points to the *bundled* file's location
- The relative path `./worker.js` no longer resolves to the right file
- The worker file wasn't included in the bundle output at all

### Bundler Workarounds

Bundlers have added special detection for specific patterns:

```js
// Webpack 5 detects this:
new Worker(new URL('./worker.js', import.meta.url));
```

But this only works when `new Worker()` directly wraps the URL. The moment you separate them, it breaks:

```js
// ❌ Bundler doesn't recognize this as a worker entry:
const workerUrl = new URL('./worker.js', import.meta.url);
new Worker(workerUrl);
```

Your code runs correctly from source, but breaks after bundling. That's a correctness problem.

## The Solution: `?esm` Query Parameter

Mark URLs that should be bundled as separate entry points with `?esm`:

```js
const workerUrl = new URL('./worker.js?esm', import.meta.url);
```

The plugin ensures this code behaves identically before and after bundling:
1. The referenced file is bundled as a separate entry with all its dependencies
2. The URL is rewritten to point to the bundled output
3. `import.meta.url` resolution continues to work correctly

---

## Specification

### Syntax

```js
new URL('<path>?esm', import.meta.url)
```

Where:
- `<path>` is a relative path to the file to bundle
- `?esm` signals that this file should be bundled as a separate entry point
- `import.meta.url` provides the base URL for resolution

### Semantics

The plugin guarantees that **bundled code behaves the same as source code**:

#### Path Resolution

Paths resolve relative to the importing file, just like in native ESM:

```js
// In /src/features/chat/index.js:
new URL('./workers/processor.js?esm', import.meta.url)
// Resolves to: /src/features/chat/workers/processor.js

new URL('../shared/worker.js?esm', import.meta.url)
// Resolves to: /src/features/shared/worker.js
```

#### Bundling

The resolved file becomes a **separate entry point**:
- Gets its own bundle with all its dependencies
- Emitted alongside the main bundle
- Output filename may differ to avoid collisions

#### URL Replacement

The path is updated to point to the bundled output:

```js
// Source:
new URL('./worker.js?esm', import.meta.url)

// After bundling:
new URL('./worker.js', import.meta.url)
```

---

## Packages

| Package | Bundler | Status |
|---------|---------|--------|
| `@vscode/esm-url-webpack-plugin` | Webpack 5 | ✅ Available |
| `@vscode/rollup-plugin-esm-url` | Rollup | ✅ Available |
| `@vscode/rollup-plugin-esm-url` | Vite | ✅ Available (uses Rollup plugin) |
| `@vscode/esbuild-plugin-esm-url` | esbuild | ✅ Available |
| — | Parcel | ✅ Works natively (no plugin needed) |

### Parcel

Parcel natively handles `new URL('./file.js', import.meta.url)` patterns without requiring a plugin. The `?esm` query parameter is ignored, but the file will be bundled as a separate entry point. We test Parcel compatibility as part of our test suite.

## Installation

```bash
# For Webpack
npm install @vscode/esm-url-webpack-plugin --save-dev

# For Rollup
npm install @vscode/rollup-plugin-esm-url --save-dev

# For Vite (uses the Rollup plugin)
npm install @vscode/rollup-plugin-esm-url --save-dev

# For esbuild
npm install @vscode/esbuild-plugin-esm-url --save-dev
```

## Usage

### Webpack

```js
// webpack.config.js
const { EsmUrlPlugin } = require('@vscode/esm-url-webpack-plugin');

module.exports = {
  plugins: [new EsmUrlPlugin()],
};
```

### Rollup

```js
// rollup.config.js
import { esmUrlPlugin } from '@vscode/rollup-plugin-esm-url';

export default {
  plugins: [esmUrlPlugin()],
};
```

### Vite

```js
// vite.config.js
import { defineConfig } from 'vite';
import { esmUrlPlugin } from '@vscode/rollup-plugin-esm-url';

export default defineConfig({
  plugins: [esmUrlPlugin()],
});
```

### esbuild

```js
// build.mjs
import * as esbuild from 'esbuild';
import { esmUrlPlugin } from '@vscode/esbuild-plugin-esm-url';

await esbuild.build({
  entryPoints: ['src/index.js'],
  bundle: true,
  format: 'esm',
  outdir: 'dist',
  plugins: [esmUrlPlugin()],
});
```

## License

MIT
