# external-worker (rollup)

## Input Files

### ../external/worker.js

```js
self.postMessage('External worker loaded');
```

### index.js

```js
// Reference a worker from an "external" (simulated node_modules) location
const workerUrl = new URL('../external/worker.js?esm', import.meta.url);
const worker = new Worker(workerUrl, { type: 'module' });
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

## Output Files

### index.js

```js
// Reference a worker from an "external" (simulated node_modules) location
const workerUrl = new URL('tests-rollup-tmp-external-worker-external-worker.js?esm', import.meta.url);
const worker = new Worker(workerUrl, { type: 'module' });
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

### tests-rollup-tmp-external-worker-external-worker.js

```js
self.postMessage('External worker loaded');
```
