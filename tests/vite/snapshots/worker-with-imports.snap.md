# worker-with-imports (vite)

## Input Files

### index.js

```js
const workerUrl = new URL('./worker.js?esm', import.meta.url);
const worker = new Worker(workerUrl, { type: 'module' });
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

### utils.js

```js
export function greet(name) {
  return `Hello, ${name}!`;
}
```

### worker.js

```js
import { greet } from './utils.js';
self.postMessage(greet('worker-with-imports'));
```

## Output Files

### index.js

```js
const workerUrl = new URL("input-worker.js?esm", import.meta.url);
const worker = new Worker(workerUrl, { type: "module" });
worker.onmessage = (e) => console.log("[WORKER_OK]", e.data);
```

### input-worker.js

```js
function greet(name) {
  return `Hello, ${name}!`;
}
self.postMessage(greet("worker-with-imports"));
```
