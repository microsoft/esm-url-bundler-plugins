# with-html-plugin (vite)

## Input Files

### index.html

```html
<!DOCTYPE html>
<html>
<head>
  <title>Test</title>
  <script type="module" src="index.js"></script>
</head>
<body>
  <h1>HTML Plugin Test</h1>
</body>
</html>
```

### index.js

```js
const workerUrl = new URL('./worker.js?esm', import.meta.url);
const worker = new Worker(workerUrl);
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

### worker.js

```js
self.postMessage('with-html-plugin');
```

## Output Files

### index.js

```js
const workerUrl = new URL("input-worker.js?esm", import.meta.url);
const worker = new Worker(workerUrl);
worker.onmessage = (e) => console.log("[WORKER_OK]", e.data);
```

### input-worker.js

```js
self.postMessage("with-html-plugin");
```
