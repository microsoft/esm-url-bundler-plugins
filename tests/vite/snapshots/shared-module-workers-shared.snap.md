# shared-module-workers-shared (vite)

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
const worker1Url = new URL("input-worker1.js?esm", import.meta.url);
const worker2Url = new URL("input-worker2.js?esm", import.meta.url);
let count = 0;
function onMessage(e) {
  count++;
  if (count === 2) console.log("[WORKER_OK]", "both");
}
const w1 = new Worker(worker1Url, { type: "module" });
const w2 = new Worker(worker2Url, { type: "module" });
w1.onmessage = onMessage;
w2.onmessage = onMessage;
```

### input-worker1.js

```js
import { s as sharedUtil } from "./shared.js";
self.postMessage(sharedUtil("Worker 1"));
```

### input-worker2.js

```js
import { s as sharedUtil } from "./shared.js";
self.postMessage(sharedUtil("Worker 2"));
```

### shared.js

```js
function sharedUtil(name) {
  return `Hello from ${name} using shared module!`;
}
export {
  sharedUtil as s
};
```
