````markdown
# esm-with-other-params

Test that when `stripEsmQuery: true`, only the `esm` parameter is removed while other query parameters are preserved.

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
// Test ?esm with additional parameters - should preserve foo=true when stripping
const workerUrl = new URL('./worker.js?esm&foo=true', import.meta.url);
const worker = new Worker(workerUrl, { type: 'module' });
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

```js path=worker.js
self.postMessage('Worker loaded successfully');
```

## Expected Behavior

With `stripEsmQuery: false` (default):
- Output URLs preserve full query: `new URL('./worker.js?esm&foo=true', ...)`

With `stripEsmQuery: true`:
- Only `esm` param is removed, others preserved: `new URL('./worker.js?foo=true', ...)`
- NOT `new URL('./worker.js', ...)` which would lose the `foo=true` param

````
