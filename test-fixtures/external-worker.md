# external-worker

Test referencing an ESM worker from an external location (simulating node_modules).

## Files

```js path=index.js
// Reference a worker from an "external" (simulated node_modules) location
const workerUrl = new URL('../external/worker.js?esm', import.meta.url);
const worker = new Worker(workerUrl, { type: 'module' });
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

```js path=../external/worker.js
self.postMessage('External worker loaded');
```

## Expected Behavior

- The worker file outside the main source directory should be bundled
- The output should correctly reference the bundled worker file
- Works for node_modules or any external directory
