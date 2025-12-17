# strip-esm-query-stripped (rollup)

## Input Files

### index.js

```js
const workerUrl = new URL('./worker.js?esm', import.meta.url);
const worker = new Worker(workerUrl, { type: 'module' });
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

### worker.js

```js
self.postMessage('Worker loaded successfully');
```

## Output Files

### index.js

```js
const workerUrl = new URL('tests-rollup-tmp-strip-esm-query-stripped-input-worker.js', import.meta.url);
const worker = new Worker(workerUrl, { type: 'module' });
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

### tests-rollup-tmp-strip-esm-query-stripped-input-worker.js

```js
self.postMessage('Worker loaded successfully');
```
