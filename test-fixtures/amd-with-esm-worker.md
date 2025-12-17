````markdown
# amd-with-esm-worker

Test where the main bundle uses AMD format but workers with ?esm are still outputted as ESM modules.

## Files

```json path=test-options.json
{
  "format": "amd"
}
```

```js path=index.js
const workerUrl = new URL('./worker.js?esm', import.meta.url);
const worker = new Worker(workerUrl, { type: 'module' });
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

```js path=worker.js
import { greet } from './utils.js';
self.postMessage(greet('amd-with-esm-worker'));
```

```js path=utils.js
export function greet(name) {
  return `Hello, ${name}!`;
}
```

## Expected Behavior

- Main `index.js` is bundled as AMD format
- `worker.js` and its dependencies are bundled as ESM format (separate compilation)
- The worker bundle uses `import`/`export` syntax, not AMD `define()`
- The URL in `index.js` is replaced with the output filename pointing to the ESM worker bundle

````