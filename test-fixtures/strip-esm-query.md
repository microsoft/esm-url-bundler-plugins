# strip-esm-query

Test the `stripEsmQuery` option which controls whether `?esm` is preserved in output URLs.

## Files

```json path=test-options.json
{
  "variants": [
    { "name": "preserved", "stripEsmQuery": false },
    { "name": "stripped", "stripEsmQuery": true }
  ]
}
```

```js path=index.js
const workerUrl = new URL('./worker.js?esm', import.meta.url);
const worker = new Worker(workerUrl, { type: 'module' });
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

```js path=worker.js
self.postMessage('Worker loaded successfully');
```

## Expected Behavior

With `stripEsmQuery: false` (default):
- Output URLs preserve `?esm` query parameter: `new URL('./worker.js?esm', ...)`
- Useful for re-bundling scenarios where the query triggers transformation

With `stripEsmQuery: true`:
- Output URLs have no query parameter: `new URL('./worker.js', ...)`
- Useful for production builds where re-bundling is not needed
