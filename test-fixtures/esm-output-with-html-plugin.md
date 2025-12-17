````markdown
# esm-output-with-html-plugin

Test webpack ESM output mode (`experiments.outputModule: true`) with HtmlWebpackPlugin.
Verifies that `import.meta.url` is used instead of `__webpack_public_path__` when ESM output is enabled.

## Files

```json path=test-options.json
{
  "outputModule": true
}
```

```js path=index.js
const workerUrl = new URL('./worker.js?esm', import.meta.url);
const worker = new Worker(workerUrl, { type: 'module' });
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

```js path=worker.js
self.postMessage('esm-output-with-html-plugin');
```

```html path=index.html
<!DOCTYPE html>
<html>
<head>
  <title>ESM Output Test</title>
</head>
<body>
  <h1>ESM Output with HTML Plugin Test</h1>
</body>
</html>
```

## Expected Behavior

- Webpack outputs ES modules (`experiments.outputModule: true`)
- Worker URL uses `import.meta.url` (not `__webpack_public_path__`)
- HtmlWebpackPlugin generates index.html with `type="module"` script tag
- Worker bundle is excluded from HTML script tags
- Both main.js and worker.js are emitted as ES modules

````
