# relative-paths (webpack)

## Input Files

### src/main.js

```js
const workerUrl = new URL('../workers/processor.js?esm', import.meta.url);
const worker = new Worker(workerUrl);
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

### workers/processor.js

```js
self.postMessage('relative-paths');
```

## Output Files

### main.js

```js
/******/ (() => { // webpackBootstrap
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
const workerUrl = new URL('./workers-processor.js?esm', self.location.href);
const worker = new Worker(workerUrl);
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);

/******/ })()
;
```

### workers-processor.js

```js
/******/ (() => { // webpackBootstrap
/*!******************************!*\
  !*** ./workers/processor.js ***!
  \******************************/
self.postMessage('relative-paths');

/******/ })()
;
```
