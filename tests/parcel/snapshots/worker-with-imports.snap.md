# worker-with-imports (parcel)

## Input Files

### index.js

```js
const workerUrl = new URL('./worker.js?esm', import.meta.url);
const worker = new Worker(workerUrl, { type: 'module' });
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

### utils.js

```js
export function greet(name) {
  return `Hello, ${name}!`;
}
```

### worker.js

```js
import { greet } from './utils.js';
self.postMessage(greet('worker-with-imports'));
```

## Output Files

### index.js

```js
var e,r=globalThis,o={},n={},t=r.parcelRequireb66d;null==t&&((t=function(e){if(e in o)return o[e].exports;if(e in n){var r=n[e];delete n[e];var t={id:e,exports:{}};return o[e]=t,r.call(t.exports,t,t.exports),t.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,r){n[e]=r},r.parcelRequireb66d=t),t.register,Object.assign(t.i??={},{jMjYn:"worker.26b4f60e.js"});e="jMjYn",e=t.i?.[e]||e,new Worker(new URL(import.meta.resolve("./"+e)),{type:"module"}).onmessage=e=>console.log("[WORKER_OK]",e.data);
//# sourceMappingURL=index.js.map
```

### index.js.map

```map
(skipped in snapshot)
```

### worker.26b4f60e.js

```js
var e=globalThis,r={},t={},o=e.parcelRequireb66d;null==o&&((o=function(e){if(e in r)return r[e].exports;if(e in t){var o=t[e];delete t[e];var i={id:e,exports:{}};return r[e]=i,o.call(i.exports,i,i.exports),i.exports}var n=Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,r){t[e]=r},e.parcelRequireb66d=o);var i=o.register;i("eBiL1",function(e,r){var t=o("7Kdj4");self.postMessage((0,t.greet)("worker-with-imports"))}),i("7Kdj4",function(e,r){function t(e){return`Hello, ${e}!`}Object.defineProperty(e.exports,"greet",{get:()=>t,set:void 0,enumerable:!0,configurable:!0})}),o("eBiL1");
//# sourceMappingURL=worker.26b4f60e.js.map
```

### worker.26b4f60e.js.map

```map
(skipped in snapshot)
```
