# basic-worker

Basic test with a single worker file.

## Files

```js path=index.js
const workerUrl = new URL('./worker.js?esm', import.meta.url);
const worker = new Worker(workerUrl);
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

```js path=worker.js
self.postMessage('basic-worker');
```

## Expected Behavior

- `worker.js` is bundled as a separate entry point
- The URL in `index.js` is replaced with the output filename (e.g., `./worker.js`)
- Both files are emitted to the output directory
- The worker bundle contains only worker code, not main code
