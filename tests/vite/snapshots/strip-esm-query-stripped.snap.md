# strip-esm-query-stripped (vite)

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
const workerUrl = new URL("input-worker.js", import.meta.url);
const worker = new Worker(workerUrl, { type: "module" });
worker.onmessage = (e) => console.log("[WORKER_OK]", e.data);
```

### input-worker.js

```js
self.postMessage("Worker loaded successfully");
```
