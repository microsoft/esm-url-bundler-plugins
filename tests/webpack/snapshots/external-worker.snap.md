# external-worker (webpack)

## Input Files

### ../external/worker.js

```js
self.postMessage('External worker loaded');
```

### index.js

```js
// Reference a worker from an "external" (simulated node_modules) location
const workerUrl = new URL('../external/worker.js?esm', import.meta.url);
const worker = new Worker(workerUrl, { type: 'module' });
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

## Output Files

### external-worker.js

```js
/******/ (() => { // webpackBootstrap
/*!*****************************!*\
  !*** ../external/worker.js ***!
  \*****************************/
self.postMessage('External worker loaded');

/******/ })()
;
```

### main.js

```js
/******/ (() => { // webpackBootstrap
/*!******************!*\
  !*** ./index.js ***!
  \******************/
// Reference a worker from an "external" (simulated node_modules) location
const workerUrl = new URL('./external-worker.js?esm', self.location.href);
const worker = new Worker(workerUrl, { type: 'module' });
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);

/******/ })()
;
```
