# no-dot-slash (esbuild)

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
// tests/esbuild/tmp/no-dot-slash/input/index.js
var workerUrl = new URL("./worker.js?esm", import.meta.url);
var worker = new Worker(workerUrl);
worker.onmessage = (e) => console.log("[WORKER_OK]", e.data);
```

### worker.js

```js
// tests/esbuild/tmp/no-dot-slash/input/worker.js
self.postMessage("no-dot-slash");
```
