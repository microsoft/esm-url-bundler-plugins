# relative-paths

Test for various relative path patterns.

## Files

```js path=src/main.js
const workerUrl = new URL('../workers/processor.js?esm', import.meta.url);
const worker = new Worker(workerUrl);
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

```js path=workers/processor.js
self.postMessage('relative-paths');
```

## Expected Behavior

- The relative path `../workers/processor.js` resolves correctly from `src/main.js`
- Worker bundle is created as `workers-processor.js` (based on path from root)
- Import statement in main is rewritten with correct output path
