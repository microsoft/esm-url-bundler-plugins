# mts-extension (esbuild)

## Input Files

### index.mts

```mts
const workerUrl = new URL('./worker.mts?esm', import.meta.url);
const worker = new Worker(workerUrl, { type: 'module' });
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

### worker.mts

```mts
self.postMessage('MTS worker loaded');
```

## Output Files

### index.js

```js
// tests/esbuild/tmp/mts-extension/input/index.mts
var workerUrl = new URL("./worker.js?esm", import.meta.url);
var worker = new Worker(workerUrl, { type: "module" });
worker.onmessage = (e) => console.log("[WORKER_OK]", e.data);
```

### worker.js

```js
// tests/esbuild/tmp/mts-extension/input/worker.mts
self.postMessage("MTS worker loaded");
```
