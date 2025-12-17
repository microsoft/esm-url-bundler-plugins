# custom-output-filename

Test that the `getOutputFileName` option can be used to customize worker output file names.
This is useful when bundling code from node_modules that would otherwise produce very long file names.

## Files

```json path=test-options.json
{
  "customOutputFileName": "basename"
}
```

```js path=index.js
// Simulate a deeply nested path like node_modules/monaco-editor/esm/vs/editor/...
// The worker is in a nested directory structure
const workerUrl = new URL('./lib/deeply/nested/services/editorWebWorkerMain.js?esm', import.meta.url);
const worker = new Worker(workerUrl, { type: 'module' });
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

```js path=lib/deeply/nested/services/editorWebWorkerMain.js
// This simulates a worker deep in a nested path
// Without customOutputFileName, this would become: lib-deeply-nested-services-editorWebWorkerMain.js
// With customOutputFileName: 'basename', this becomes: editorWebWorkerMain.js
self.postMessage('Editor worker loaded');
```

## Expected Behavior

- Without `getOutputFileName`, the worker output would be named something like `lib-deeply-nested-services-editorWebWorkerMain.js`
- With `getOutputFileName` using 'basename' strategy, the worker output should be named `editorWebWorkerMain.js`
- The URL reference in the main bundle should be updated to match
