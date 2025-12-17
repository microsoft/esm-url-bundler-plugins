# relative-paths (rollup)

## Input Files

### src/main.js

```js
const workerUrl = new URL('../workers/processor.js?esm', import.meta.url);
const worker = new Worker(workerUrl);
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

### workers/processor.js

```js
self.postMessage('relative-paths');
```

## Output Files

### main.js

```js
const workerUrl = new URL('tests-rollup-tmp-relative-paths-input-workers-processor.js?esm', import.meta.url);
const worker = new Worker(workerUrl);
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

### tests-rollup-tmp-relative-paths-input-workers-processor.js

```js
self.postMessage('relative-paths');
```
