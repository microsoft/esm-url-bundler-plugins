# esm-with-other-params-preserved (esbuild)

## Input Files

### index.js

```js
// Test ?esm with additional parameters - should preserve foo=true when stripping
const workerUrl = new URL('./worker.js?esm&foo=true', import.meta.url);
const worker = new Worker(workerUrl, { type: 'module' });
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

### worker.js

```js
self.postMessage('Worker loaded successfully');
```

## Output Files

### index.js

```js
// tests/esbuild/tmp/esm-with-other-params-preserved/input/index.js
var workerUrl = new URL("./worker.js?esm&foo=true", import.meta.url);
var worker = new Worker(workerUrl, { type: "module" });
worker.onmessage = (e) => console.log("[WORKER_OK]", e.data);
```

### worker.js

```js
// tests/esbuild/tmp/esm-with-other-params-preserved/input/worker.js
self.postMessage("Worker loaded successfully");
```
