# custom-output-filename (webpack)

## Input Files

### index.js

```js
// Simulate a deeply nested path like node_modules/monaco-editor/esm/vs/editor/...
// The worker is in a nested directory structure
const workerUrl = new URL('./lib/deeply/nested/services/editorWebWorkerMain.js?esm', import.meta.url);
const worker = new Worker(workerUrl, { type: 'module' });
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

### lib/deeply/nested/services/editorWebWorkerMain.js

```js
// This simulates a worker deep in a nested path
// Without customOutputFileName, this would become: lib-deeply-nested-services-editorWebWorkerMain.js
// With customOutputFileName: 'basename', this becomes: editorWebWorkerMain.js
self.postMessage('Editor worker loaded');
```

## Output Files

### editorWebWorkerMain.js

```js
/******/ (() => { // webpackBootstrap
/*!***********************************************************!*\
  !*** ./lib/deeply/nested/services/editorWebWorkerMain.js ***!
  \***********************************************************/
// This simulates a worker deep in a nested path
// Without customOutputFileName, this would become: lib-deeply-nested-services-editorWebWorkerMain.js
// With customOutputFileName: 'basename', this becomes: editorWebWorkerMain.js
self.postMessage('Editor worker loaded');

/******/ })()
;
```

### main.js

```js
/******/ (() => { // webpackBootstrap
/*!******************!*\
  !*** ./index.js ***!
  \******************/
// Simulate a deeply nested path like node_modules/monaco-editor/esm/vs/editor/...
// The worker is in a nested directory structure
const workerUrl = new URL('./editorWebWorkerMain.js?esm', self.location.href);
const worker = new Worker(workerUrl, { type: 'module' });
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);

/******/ })()
;
```
