# shared-module-workers-shared (parcel)

## Input Files

### index.js

```js
const worker1Url = new URL('./worker1.js?esm', import.meta.url);
const worker2Url = new URL('./worker2.js?esm', import.meta.url);

let count = 0;
function onMessage(e) {
  count++;
  if (count === 2) console.log('[WORKER_OK]', 'both');
}

const w1 = new Worker(worker1Url, { type: 'module' });
const w2 = new Worker(worker2Url, { type: 'module' });
w1.onmessage = onMessage;
w2.onmessage = onMessage;
```

### shared.js

```js
export function sharedUtil(name) {
  return `Hello from ${name} using shared module!`;
}
```

### worker1.js

```js
import { sharedUtil } from './shared.js';
self.postMessage(sharedUtil('Worker 1'));
```

### worker2.js

```js
import { sharedUtil } from './shared.js';
self.postMessage(sharedUtil('Worker 2'));
```

## Output Files

### index.js

```js
function e(e){return e=i.i?.[e]||e,import.meta.resolve(o+e)}var r=globalThis,o="./",n={},t={},i=r.parcelRequireb66d;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in t){var r=t[e];delete t[e];var o={id:e,exports:{}};return n[e]=o,r.call(o.exports,o,o.exports),o.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,r){t[e]=r},r.parcelRequireb66d=i),i.register,Object.assign(i.i??={},{"8R3bY":"worker1.cd769be6.js","5eSrM":"worker2.df7ae3bf.js"});let s=new URL(e("8R3bY")),l=new URL(e("5eSrM")),a=0;function u(e){2==++a&&console.log("[WORKER_OK]","both")}let d=new Worker(s,{type:"module"}),c=new Worker(l,{type:"module"});d.onmessage=u,c.onmessage=u;
//# sourceMappingURL=index.js.map
```

### index.js.map

```map
(skipped in snapshot)
```

### worker1.cd769be6.js

```js
var e=globalThis,r={},i={},t=e.parcelRequireb66d;null==t&&((t=function(e){if(e in r)return r[e].exports;if(e in i){var t=i[e];delete i[e];var o={id:e,exports:{}};return r[e]=o,t.call(o.exports,o,o.exports),o.exports}var n=Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,r){i[e]=r},e.parcelRequireb66d=t);var o=t.register;o("3LjCG",function(e,r){var i=t("diKiN");self.postMessage((0,i.sharedUtil)("Worker 1"))}),o("diKiN",function(e,r){function i(e){return`Hello from ${e} using shared module!`}Object.defineProperty(e.exports,"sharedUtil",{get:()=>i,set:void 0,enumerable:!0,configurable:!0})}),t("3LjCG");
//# sourceMappingURL=worker1.cd769be6.js.map
```

### worker1.cd769be6.js.map

```map
(skipped in snapshot)
```

### worker2.df7ae3bf.js

```js
var e=globalThis,r={},i={},t=e.parcelRequireb66d;null==t&&((t=function(e){if(e in r)return r[e].exports;if(e in i){var t=i[e];delete i[e];var o={id:e,exports:{}};return r[e]=o,t.call(o.exports,o,o.exports),o.exports}var n=Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,r){i[e]=r},e.parcelRequireb66d=t);var o=t.register;o("65371",function(e,r){var i=t("diKiN");self.postMessage((0,i.sharedUtil)("Worker 2"))}),o("diKiN",function(e,r){function i(e){return`Hello from ${e} using shared module!`}Object.defineProperty(e.exports,"sharedUtil",{get:()=>i,set:void 0,enumerable:!0,configurable:!0})}),t("65371");
//# sourceMappingURL=worker2.df7ae3bf.js.map
```

### worker2.df7ae3bf.js.map

```map
(skipped in snapshot)
```
