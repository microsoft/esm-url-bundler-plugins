````markdown
# no-dot-slash

Test with URL path without `./` prefix - both `worker.js` and `./worker.js` should work.

## Files

```js path=index.js
const workerUrl = new URL('worker.js?esm', import.meta.url);
const worker = new Worker(workerUrl);
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

```js path=worker.js
self.postMessage('no-dot-slash');
```

## Expected Behavior

- The URL `worker.js?esm` (without `./` prefix) is correctly recognized
- `worker.js` is bundled as a separate entry point
- The URL is replaced with the output filename

````