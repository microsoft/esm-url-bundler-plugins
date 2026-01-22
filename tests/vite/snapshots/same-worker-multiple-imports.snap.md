# same-worker-multiple-imports (vite)

## Input Files

### index.js

```js
import { createWorker1 } from './module1.js';
import { createWorker2 } from './module2.js';

let count = 0;
function onMessage(e) {
  count++;
  if (count === 2) console.log('[WORKER_OK]', 'both');
}

const w1 = createWorker1();
const w2 = createWorker2();
w1.onmessage = onMessage;
w2.onmessage = onMessage;
```

### module1.js

```js
export function createWorker1() {
  const workerUrl = new URL('./worker.js?esm', import.meta.url);
  return new Worker(workerUrl, { type: 'module' });
}
```

### module2.js

```js
export function createWorker2() {
  const workerUrl = new URL('./worker.js?esm', import.meta.url);
  return new Worker(workerUrl, { type: 'module' });
}
```

### worker.js

```js
self.postMessage('shared-worker');
```

## Output Files

### index.js

```js
function createWorker1() {
  const workerUrl = new URL("input-worker.js?esm", import.meta.url);
  return new Worker(workerUrl, { type: "module" });
}
function createWorker2() {
  const workerUrl = new URL("input-worker.js?esm", import.meta.url);
  return new Worker(workerUrl, { type: "module" });
}
let count = 0;
function onMessage(e) {
  count++;
  if (count === 2) console.log("[WORKER_OK]", "both");
}
const w1 = createWorker1();
const w2 = createWorker2();
w1.onmessage = onMessage;
w2.onmessage = onMessage;
```

### input-worker.js

```js
self.postMessage("shared-worker");
```
