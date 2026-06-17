# relative-paths (vite)

## Input Files

### src/main.js

```js
const workerUrl = new URL('../workers/processor.js?esm', import.meta.url);
const worker = new Worker(workerUrl);
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

### workers/processor.js

```js
self.postMessage('relative-paths');
```

## Output Files

### input-workers-processor.js

```js
//#region input/workers/processor.js
self.postMessage("relative-paths");
//#endregion
```

### main.js

```js
//#region input/src/main.js
var workerUrl = new URL("input-workers-processor.js?esm", import.meta.url);
var worker = new Worker(workerUrl);
worker.onmessage = (e) => console.log("[WORKER_OK]", e.data);
//#endregion
```
