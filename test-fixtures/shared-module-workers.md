````markdown
# shared-module-workers

Test with two workers that share a common module. Used to verify behavior of `bundleModulesIsolated` option.

## Files

```json path=test-options.json
{
  "variants": [
    { "name": "shared", "bundleModulesIsolated": false },
    { "name": "isolated", "bundleModulesIsolated": true }
  ]
}
```

```js path=index.js
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

```js path=worker1.js
import { sharedUtil } from './shared.js';
self.postMessage(sharedUtil('Worker 1'));
```

```js path=worker2.js
import { sharedUtil } from './shared.js';
self.postMessage(sharedUtil('Worker 2'));
```

```js path=shared.js
export function sharedUtil(name) {
  return `Hello from ${name} using shared module!`;
}
```

## Expected Behavior

With `bundleModulesIsolated: false` (default):
- The shared module may be extracted as a common chunk
- Workers reference the shared chunk

With `bundleModulesIsolated: true`:
- Each worker is built in isolation
- The shared module is inlined into each worker bundle
- No shared chunks between workers

````