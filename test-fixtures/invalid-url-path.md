# invalid-url-path

Test that the plugin reports a helpful error when the referenced file does not exist.

## Files

```json path=test-options.json
{
  "bundlers": ["esbuild", "rollup", "webpack", "vite"],
  "expectedError": "File not found:"
}
```

```js path=index.js
// This is a common mistake - using placeholder text instead of a real path
const workerUrl = new URL('./non-existent-file.js?esm', import.meta.url);
const worker = new Worker(workerUrl);
```

## Expected Behavior

- The plugin detects that the file does not exist
- A clear error message is shown with the resolved path
- The error message suggests checking the path
