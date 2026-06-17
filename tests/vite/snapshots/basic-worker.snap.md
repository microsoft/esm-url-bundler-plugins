# basic-worker (vite)

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
//#region input/index.js
var workerUrl = new URL("input-worker.js?esm", import.meta.url);
var worker = new Worker(workerUrl);
worker.onmessage = (e) => console.log("[WORKER_OK]", e.data);
//#endregion
```

### input-worker.js

```js
//#region input/worker.js
self.postMessage("basic-worker");
//#endregion
```
