# @vscode/esm-url-webpack-plugin

Webpack 5 plugin for handling `?esm` URL imports.

## Installation

```bash
npm install @vscode/esm-url-webpack-plugin --save-dev
```

## Usage

```js
// webpack.config.js
const { EsmUrlPlugin } = require('@vscode/esm-url-webpack-plugin');

module.exports = {
  plugins: [new EsmUrlPlugin()],
};
```

## How it works

The plugin detects `new URL('./path?esm', import.meta.url)` patterns and:

1. Creates a separate entry point for the referenced file
2. Bundles it with all its dependencies
3. Replaces the URL with the output filename

## Features

- Works with TypeScript (via ts-loader)
- Integrates with HtmlWebpackPlugin (excludes worker scripts from HTML)
- Handles multiple workers with the same filename in different directories

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

```js
new EsmUrlPlugin({
  stripEsmQuery: true,
  getOutputFileName: ({ suggestedName }) => `worker-${suggestedName}`,
})
```
