# same-worker-multiple-imports (webpack)

## Input Files

### index.js

```js
import { createWorker1 } from './module1.js';
import { createWorker2 } from './module2.js';

let count = 0;
function onMessage(e) {
  count++;
  if (count === 2) console.log('[WORKER_OK]', 'both');
}

const w1 = createWorker1();
const w2 = createWorker2();
w1.onmessage = onMessage;
w2.onmessage = onMessage;
```

### module1.js

```js
export function createWorker1() {
  const workerUrl = new URL('./worker.js?esm', import.meta.url);
  return new Worker(workerUrl, { type: 'module' });
}
```

### module2.js

```js
export function createWorker2() {
  const workerUrl = new URL('./worker.js?esm', import.meta.url);
  return new Worker(workerUrl, { type: 'module' });
}
```

### worker.js

```js
self.postMessage('shared-worker');
```

## Output Files

### main.js

```js
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./module1.js"
/*!********************!*\
  !*** ./module1.js ***!
  \********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createWorker1: () => (/* binding */ createWorker1)
/* harmony export */ });
function createWorker1() {
  const workerUrl = new URL('./worker.js?esm', self.location.href);
  return new Worker(workerUrl, { type: 'module' });
}


/***/ },

/***/ "./module2.js"
/*!********************!*\
  !*** ./module2.js ***!
  \********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createWorker2: () => (/* binding */ createWorker2)
/* harmony export */ });
function createWorker2() {
  const workerUrl = new URL('./worker.js?esm', self.location.href);
  return new Worker(workerUrl, { type: 'module' });
}


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _module1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module1.js */ "./module1.js");
/* harmony import */ var _module2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./module2.js */ "./module2.js");



let count = 0;
function onMessage(e) {
  count++;
  if (count === 2) console.log('[WORKER_OK]', 'both');
}

const w1 = (0,_module1_js__WEBPACK_IMPORTED_MODULE_0__.createWorker1)();
const w2 = (0,_module2_js__WEBPACK_IMPORTED_MODULE_1__.createWorker2)();
w1.onmessage = onMessage;
w2.onmessage = onMessage;

})();

/******/ })()
;
```

### worker.js

```js
/******/ (() => { // webpackBootstrap
/*!*******************!*\
  !*** ./worker.js ***!
  \*******************/
self.postMessage('shared-worker');

/******/ })()
;
```
