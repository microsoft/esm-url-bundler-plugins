# external-worker (esbuild)

## Input Files

### ../external/worker.js

```js
self.postMessage('External worker loaded');
```

### index.js

```js
// Reference a worker from an "external" (simulated node_modules) location
const workerUrl = new URL('../external/worker.js?esm', import.meta.url);
const worker = new Worker(workerUrl, { type: 'module' });
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

## Output Files

### external-worker.js

```js
// tests/esbuild/tmp/external-worker/external/worker.js
self.postMessage("External worker loaded");
```

### index.js

```js
// tests/esbuild/tmp/external-worker/input/index.js
var workerUrl = new URL("./external-worker.js?esm", import.meta.url);
var worker = new Worker(workerUrl, { type: "module" });
worker.onmessage = (e) => console.log("[WORKER_OK]", e.data);
```
