# esm-output-with-html-plugin (vite)

## Input Files

### index.html

```html
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

### index.js

```js
const workerUrl = new URL('./worker.js?esm', import.meta.url);
const worker = new Worker(workerUrl, { type: 'module' });
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

### worker.js

```js
self.postMessage('esm-output-with-html-plugin');
```

## Output Files

### index.js

```js
const workerUrl = new URL("input-worker.js?esm", import.meta.url);
const worker = new Worker(workerUrl, { type: "module" });
worker.onmessage = (e) => console.log("[WORKER_OK]", e.data);
```

### input-worker.js

```js
self.postMessage("esm-output-with-html-plugin");
```
