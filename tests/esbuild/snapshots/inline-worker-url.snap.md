# inline-worker-url (esbuild)

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
// tests/esbuild/tmp/inline-worker-url/input/index.js
var worker = new Worker(new URL("./worker.js?esm", import.meta.url), { type: "module" });
worker.onmessage = (e) => console.log("[WORKER_OK]", e.data);
```

### worker.js

```js
// tests/esbuild/tmp/inline-worker-url/input/worker.js
self.postMessage("Inline worker URL loaded");
```
