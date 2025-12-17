# with-html-plugin (webpack)

## Input Files

### index.html

```html
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

### index.html

```html
<!DOCTYPE html>
<html>
<head>
  <title>Test</title>
<script defer src="main.js"></script></head>
<body>
  <h1>HTML Plugin Test</h1>
</body>
</html>
```

### main.js

```js
/******/ (() => { // webpackBootstrap
/*!******************!*\
  !*** ./index.js ***!
  \******************/
const workerUrl = new URL('./worker.js?esm', self.location.href);
const worker = new Worker(workerUrl);
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);

/******/ })()
;
```

### worker.js

```js
/******/ (() => { // webpackBootstrap
/*!*******************!*\
  !*** ./worker.js ***!
  \*******************/
self.postMessage('with-html-plugin');

/******/ })()
;
```
