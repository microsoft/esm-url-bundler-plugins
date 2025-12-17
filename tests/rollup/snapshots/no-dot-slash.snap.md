# no-dot-slash (rollup)

## Input Files

### index.js

```js
const workerUrl = new URL('worker.js?esm', import.meta.url);
const worker = new Worker(workerUrl);
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

### worker.js

```js
self.postMessage('no-dot-slash');
```

## Output Files

### index.js

```js
const workerUrl = new URL('tests-rollup-tmp-no-dot-slash-input-worker.js?esm', import.meta.url);
const worker = new Worker(workerUrl);
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

### tests-rollup-tmp-no-dot-slash-input-worker.js

```js
self.postMessage('no-dot-slash');
```
