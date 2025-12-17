# basic-worker (rollup)

## Input Files

### index.js

```js
const workerUrl = new URL('./worker.js?esm', import.meta.url);
const worker = new Worker(workerUrl);
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

### worker.js

```js
self.postMessage('basic-worker');
```

## Output Files

### index.js

```js
const workerUrl = new URL('tests-rollup-tmp-basic-worker-input-worker.js?esm', import.meta.url);
const worker = new Worker(workerUrl);
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

### tests-rollup-tmp-basic-worker-input-worker.js

```js
self.postMessage('basic-worker');
```
