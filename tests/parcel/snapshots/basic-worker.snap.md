# basic-worker (parcel)

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

### index.js

```js
var e,r=globalThis,o={},n={},t=r.parcelRequireb66d;null==t&&((t=function(e){if(e in o)return o[e].exports;if(e in n){var r=n[e];delete n[e];var t={id:e,exports:{}};return o[e]=t,r.call(t.exports,t,t.exports),t.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,r){n[e]=r},r.parcelRequireb66d=t),t.register,Object.assign(t.i??={},{"17L3n":"worker.88a8e560.js"});e="17L3n",e=t.i?.[e]||e,new Worker(new URL(import.meta.resolve("./"+e))).onmessage=e=>console.log("[WORKER_OK]",e.data);
//# sourceMappingURL=index.js.map
```

### index.js.map

```map
(skipped in snapshot)
```

### worker.88a8e560.js

```js
var r=globalThis,e={},o={},t=r.parcelRequireb66d;null==t&&((t=function(r){if(r in e)return e[r].exports;if(r in o){var t=o[r];delete o[r];var i={id:r,exports:{}};return e[r]=i,t.call(i.exports,i,i.exports),i.exports}var n=Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(r,e){o[r]=e},r.parcelRequireb66d=t),(0,t.register)("gJOuc",function(r,e){self.postMessage("basic-worker")}),t("gJOuc");
//# sourceMappingURL=worker.88a8e560.js.map
```

### worker.88a8e560.js.map

```map
(skipped in snapshot)
```
