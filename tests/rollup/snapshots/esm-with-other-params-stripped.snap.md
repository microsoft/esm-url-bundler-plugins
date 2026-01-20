# esm-with-other-params-stripped (rollup)

## Input Files

### index.js

```js
// Test ?esm with additional parameters - should preserve foo=true when stripping
const workerUrl = new URL('./worker.js?esm&foo=true', import.meta.url);
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
// Test ?esm with additional parameters - should preserve foo=true when stripping
const workerUrl = new URL('tests-rollup-tmp-esm-with-other-params-stripped-input-worker.js?foo=true', import.meta.url);
const worker = new Worker(workerUrl, { type: 'module' });
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

### tests-rollup-tmp-esm-with-other-params-stripped-input-worker.js

```js
self.postMessage('Worker loaded successfully');
```
