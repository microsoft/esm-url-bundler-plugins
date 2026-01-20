# invalid-url-path (webpack)

## Input Files

### index.js

```js
// This is a common mistake - using placeholder text instead of a real path
const workerUrl = new URL('./non-existent-file.js?esm', import.meta.url);
const worker = new Worker(workerUrl);
```

## Error

```
index.js:2:18-72 - File not found: './non-existent-file.js' resolved to 'tests/webpack/tmp/invalid-url-path/input/non-existent-file.js'. Check that the path in new URL('./non-existent-file.js?esm', import.meta.url) points to an existing file.
index.js:2:18-72 - Module not found: Error: Can't resolve './non-existent-file.js?esm' in 'tests/webpack/tmp/invalid-url-path/input'
```
