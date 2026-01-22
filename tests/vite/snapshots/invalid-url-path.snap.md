# invalid-url-path (vite)

## Input Files

### index.js

```js
// This is a common mistake - using placeholder text instead of a real path
const workerUrl = new URL('./non-existent-file.js?esm', import.meta.url);
const worker = new Worker(workerUrl);
```

## Error

```
[esm-url-plugin] [plugin esm-url-plugin] input/index.js (2:18): File not found: './non-existent-file.js' resolved to 'tests/vite/tmp/invalid-url-path/input/non-existent-file.js'. Check that the path in new URL('./non-existent-file.js?esm', import.meta.url) points to an existing file.
```
