# basic-worker (webpack)

## Input Files

### index.js

```js
const workerUrl = new URL('./worker.js?esm', import.meta.url);
const worker = new Worker(workerUrl);
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

### worker.js

```js
self.postMessage('basic-worker');
```

## Output Files

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
self.postMessage('basic-worker');

/******/ })()
;
```
