# worker-with-imports (esbuild)

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
// tests/esbuild/tmp/worker-with-imports/input/index.js
var workerUrl = new URL("./worker.js?esm", import.meta.url);
var worker = new Worker(workerUrl, { type: "module" });
worker.onmessage = (e) => console.log("[WORKER_OK]", e.data);
```

### worker.js

```js
// tests/esbuild/tmp/worker-with-imports/input/utils.js
function greet(name) {
  return `Hello, ${name}!`;
}

// tests/esbuild/tmp/worker-with-imports/input/worker.js
self.postMessage(greet("worker-with-imports"));
```
