# no-dot-slash (vite)

## Input Files

### index.js

```js
const workerUrl = new URL('worker.js?esm', import.meta.url);
const worker = new Worker(workerUrl);
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

### worker.js

```js
self.postMessage('no-dot-slash');
```

## Output Files

### index.js

```js
const workerUrl = new URL("input-worker.js?esm", import.meta.url);
const worker = new Worker(workerUrl);
worker.onmessage = (e) => console.log("[WORKER_OK]", e.data);
```

### input-worker.js

```js
self.postMessage("no-dot-slash");
```
