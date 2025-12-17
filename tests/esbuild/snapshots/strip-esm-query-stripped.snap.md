# strip-esm-query-stripped (esbuild)

## Input Files

### index.js

```js
const workerUrl = new URL('./worker.js?esm', import.meta.url);
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
// tests/esbuild/tmp/strip-esm-query-stripped/input/index.js
var workerUrl = new URL("./worker.js", import.meta.url);
var worker = new Worker(workerUrl, { type: "module" });
worker.onmessage = (e) => console.log("[WORKER_OK]", e.data);
```

### worker.js

```js
// tests/esbuild/tmp/strip-esm-query-stripped/input/worker.js
self.postMessage("Worker loaded successfully");
```
