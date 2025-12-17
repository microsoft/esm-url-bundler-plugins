# worker-with-imports

Worker that imports shared modules.

## Files

```js path=index.js
const workerUrl = new URL('./worker.js?esm', import.meta.url);
const worker = new Worker(workerUrl, { type: 'module' });
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

```js path=worker.js
import { greet } from './utils.js';
self.postMessage(greet('worker-with-imports'));
```

```js path=utils.js
export function greet(name) {
  return `Hello, ${name}!`;
}
```

## Expected Behavior

- Worker bundle includes the `utils.js` dependency
- Main bundle does NOT include `utils.js` (unless it uses it)
- The worker can successfully import and use shared utilities
