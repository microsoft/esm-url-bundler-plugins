# same-worker-multiple-imports (parcel)

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

### index.js

```js
var e,r=globalThis,o={},t={},n=r.parcelRequireb66d;null==n&&((n=function(e){if(e in o)return o[e].exports;if(e in t){var r=t[e];delete t[e];var n={id:e,exports:{}};return o[e]=n,r.call(n.exports,n,n.exports),n.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,r){t[e]=r},r.parcelRequireb66d=n),n.register,Object.assign(n.i??={},{"9mRLm":"worker.7fcd9de1.js"});var i={};e="9mRLm",e=n.i?.[e]||e;let l=0;function s(e){2==++l&&console.log("[WORKER_OK]","both")}let a=new Worker(new URL(i=import.meta.resolve("./"+e)),{type:"module"}),d=new Worker(new URL(i),{type:"module"});a.onmessage=s,d.onmessage=s;
//# sourceMappingURL=index.js.map
```

### index.js.map

```map
(skipped in snapshot)
```

### worker.7fcd9de1.js

```js
var r=globalThis,e={},o={},t=r.parcelRequireb66d;null==t&&((t=function(r){if(r in e)return e[r].exports;if(r in o){var t=o[r];delete o[r];var s={id:r,exports:{}};return e[r]=s,t.call(s.exports,s,s.exports),s.exports}var i=Error("Cannot find module '"+r+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(r,e){o[r]=e},r.parcelRequireb66d=t),(0,t.register)("jIWsB",function(r,e){self.postMessage("shared-worker")}),t("jIWsB");
//# sourceMappingURL=worker.7fcd9de1.js.map
```

### worker.7fcd9de1.js.map

```map
(skipped in snapshot)
```
