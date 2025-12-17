# shared-module-workers-isolated (esbuild)

## Input Files

### index.js

```js
const worker1Url = new URL('./worker1.js?esm', import.meta.url);
const worker2Url = new URL('./worker2.js?esm', import.meta.url);

let count = 0;
function onMessage(e) {
  count++;
  if (count === 2) console.log('[WORKER_OK]', 'both');
}

const w1 = new Worker(worker1Url, { type: 'module' });
const w2 = new Worker(worker2Url, { type: 'module' });
w1.onmessage = onMessage;
w2.onmessage = onMessage;
```

### shared.js

```js
export function sharedUtil(name) {
  return `Hello from ${name} using shared module!`;
}
```

### worker1.js

```js
import { sharedUtil } from './shared.js';
self.postMessage(sharedUtil('Worker 1'));
```

### worker2.js

```js
import { sharedUtil } from './shared.js';
self.postMessage(sharedUtil('Worker 2'));
```

## Output Files

### index.js

```js
// tests/esbuild/tmp/shared-module-workers-isolated/input/index.js
var worker1Url = new URL("./worker1.js?esm", import.meta.url);
var worker2Url = new URL("./worker2.js?esm", import.meta.url);
var count = 0;
function onMessage(e) {
  count++;
  if (count === 2) console.log("[WORKER_OK]", "both");
}
var w1 = new Worker(worker1Url, { type: "module" });
var w2 = new Worker(worker2Url, { type: "module" });
w1.onmessage = onMessage;
w2.onmessage = onMessage;
```

### worker1.js

```js
// tests/esbuild/tmp/shared-module-workers-isolated/input/shared.js
function sharedUtil(name) {
  return `Hello from ${name} using shared module!`;
}

// tests/esbuild/tmp/shared-module-workers-isolated/input/worker1.js
self.postMessage(sharedUtil("Worker 1"));
```

### worker2.js

```js
// tests/esbuild/tmp/shared-module-workers-isolated/input/shared.js
function sharedUtil(name) {
  return `Hello from ${name} using shared module!`;
}

// tests/esbuild/tmp/shared-module-workers-isolated/input/worker2.js
self.postMessage(sharedUtil("Worker 2"));
```
