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
const worker = new Worker(new URL("input-worker.js?esm", import.meta.url), { type: "module" });
worker.onmessage = (e) => console.log("[WORKER_OK]", e.data);
```

### input-worker.js

```js
self.postMessage("Inline worker URL loaded");
```
