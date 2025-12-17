# mts-extension

Test that the plugin handles `.mts` (module TypeScript) file extensions as entry points.

## Files

```json path=test-options.json
{
  "bundlers": ["esbuild"]
}
```

```ts path=index.mts
const workerUrl = new URL('./worker.mts?esm', import.meta.url);
const worker = new Worker(workerUrl, { type: 'module' });
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

```ts path=worker.mts
self.postMessage('MTS worker loaded');
```

## Expected Behavior

- The `.mts` extension should be recognized and processed by the plugin
- The worker should be compiled to a `.js` output file
- The URL reference should be updated to point to the compiled worker
