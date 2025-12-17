# custom-output-filename (esbuild)

## Input Files

### index.js

```js
// Simulate a deeply nested path like node_modules/monaco-editor/esm/vs/editor/...
// The worker is in a nested directory structure
const workerUrl = new URL('./lib/deeply/nested/services/editorWebWorkerMain.js?esm', import.meta.url);
const worker = new Worker(workerUrl, { type: 'module' });
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

### lib/deeply/nested/services/editorWebWorkerMain.js

```js
// This simulates a worker deep in a nested path
// Without customOutputFileName, this would become: lib-deeply-nested-services-editorWebWorkerMain.js
// With customOutputFileName: 'basename', this becomes: editorWebWorkerMain.js
self.postMessage('Editor worker loaded');
```

## Output Files

### editorWebWorkerMain.js

```js
// tests/esbuild/tmp/custom-output-filename/input/lib/deeply/nested/services/editorWebWorkerMain.js
self.postMessage("Editor worker loaded");
```

### index.js

```js
// tests/esbuild/tmp/custom-output-filename/input/index.js
var workerUrl = new URL("./editorWebWorkerMain.js?esm", import.meta.url);
var worker = new Worker(workerUrl, { type: "module" });
worker.onmessage = (e) => console.log("[WORKER_OK]", e.data);
```
