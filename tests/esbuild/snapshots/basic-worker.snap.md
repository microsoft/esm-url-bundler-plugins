# basic-worker (esbuild)

## Input Files

### index.js

```js
const workerUrl = new URL('./worker.js?esm', import.meta.url);
const worker = new Worker(workerUrl);
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

### worker.js

```js
self.postMessage('basic-worker');
```

## Output Files

### index.js

```js
// tests/esbuild/tmp/basic-worker/input/index.js
var workerUrl = new URL("./worker.js?esm", import.meta.url);
var worker = new Worker(workerUrl);
worker.onmessage = (e) => console.log("[WORKER_OK]", e.data);
```

### worker.js

```js
// tests/esbuild/tmp/basic-worker/input/worker.js
self.postMessage("basic-worker");
```
