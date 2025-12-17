# strip-esm-query-stripped (webpack)

## Input Files

### index.js

```js
const workerUrl = new URL('./worker.js?esm', import.meta.url);
const worker = new Worker(workerUrl, { type: 'module' });
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

### worker.js

```js
self.postMessage('Worker loaded successfully');
```

## Output Files

### main.js

```js
/******/ (() => { // webpackBootstrap
/*!******************!*\
  !*** ./index.js ***!
  \******************/
const workerUrl = new URL('./worker.js', self.location.href);
const worker = new Worker(workerUrl, { type: 'module' });
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
self.postMessage('Worker loaded successfully');

/******/ })()
;
```
