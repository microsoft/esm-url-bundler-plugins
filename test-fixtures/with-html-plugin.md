# with-html-plugin

Test that worker bundles are excluded from HtmlWebpackPlugin script injection.

## Files

```js path=index.js
const workerUrl = new URL('./worker.js?esm', import.meta.url);
const worker = new Worker(workerUrl);
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

```js path=worker.js
self.postMessage('with-html-plugin');
```

```html path=index.html
<!DOCTYPE html>
<html>
<head>
  <title>Test</title>
</head>
<body>
  <h1>HTML Plugin Test</h1>
</body>
</html>
```

```json path=test-options.json
{
  "bundlers": ["webpack"]
}
```

## Expected Behavior

- Worker bundle is created as a separate entry point
- HtmlWebpackPlugin generates index.html with only main.js script tag
- Worker script is NOT included in the HTML script tags
- Both main.js and worker.js are emitted to dist
