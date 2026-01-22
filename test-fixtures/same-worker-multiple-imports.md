````markdown
# same-worker-multiple-imports

Two different modules both import the same worker ESM module.

## Files

```js path=index.js
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

```js path=module1.js
export function createWorker1() {
  const workerUrl = new URL('./worker.js?esm', import.meta.url);
  return new Worker(workerUrl, { type: 'module' });
}
```

```js path=module2.js
export function createWorker2() {
  const workerUrl = new URL('./worker.js?esm', import.meta.url);
  return new Worker(workerUrl, { type: 'module' });
}
```

```js path=worker.js
self.postMessage('shared-worker');
```

## Expected Behavior

- The worker file should only be bundled once, not duplicated
- Both `module1.js` and `module2.js` reference the same worker output file
- Only one `worker.js` output file should exist in the output directory

````
