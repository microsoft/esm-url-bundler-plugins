# inline-worker-url

Test the pattern where `new URL(...?esm)` is directly passed to `new Worker()`.
This pattern may conflict with Vite's built-in worker handling.

## Files

```js path=index.js
// The URL is created inline with the Worker constructor
const worker = new Worker(new URL('./worker.js?esm', import.meta.url), { type: 'module' });
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

```js path=worker.js
self.postMessage('Inline worker URL loaded');
```

## Expected Behavior

- The plugin should transform the `new URL('./worker.js?esm', import.meta.url)` pattern
- The worker should be bundled as a separate ESM file
- For Vite: If there's a conflict with Vite's native worker handling, Vite's handling takes precedence
