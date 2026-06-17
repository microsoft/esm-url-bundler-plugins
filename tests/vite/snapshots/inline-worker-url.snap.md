# inline-worker-url (vite)

## Input Files

### index.js

```js
// The URL is created inline with the Worker constructor
const worker = new Worker(new URL('./worker.js?esm', import.meta.url), { type: 'module' });
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

### worker.js

```js
self.postMessage('Inline worker URL loaded');
```

## Output Files

### index.js

```js
//#region input/index.js
var worker = new Worker(new URL("input-worker.js?esm", import.meta.url), { type: "module" });
worker.onmessage = (e) => console.log("[WORKER_OK]", e.data);
//#endregion
```

### input-worker.js

```js
//#region input/worker.js
self.postMessage("Inline worker URL loaded");
//#endregion
```
