# relative-paths (parcel)

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
var e,r=globalThis,o={},s={},t=r.parcelRequireb66d;null==t&&((t=function(e){if(e in o)return o[e].exports;if(e in s){var r=s[e];delete s[e];var t={id:e,exports:{}};return o[e]=t,r.call(t.exports,t,t.exports),t.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,r){s[e]=r},r.parcelRequireb66d=t),t.register,Object.assign(t.i??={},{gLyXs:"processor.008c9777.js"});e="gLyXs",e=t.i?.[e]||e,new Worker(new URL(import.meta.resolve("./"+e))).onmessage=e=>console.log("[WORKER_OK]",e.data);
//# sourceMappingURL=main.js.map
```

### main.js.map

```map
(skipped in snapshot)
```

### processor.008c9777.js

```js
var e=globalThis,r={},t={},i=e.parcelRequireb66d;null==i&&((i=function(e){if(e in r)return r[e].exports;if(e in t){var i=t[e];delete t[e];var o={id:e,exports:{}};return r[e]=o,i.call(o.exports,o,o.exports),o.exports}var n=Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,r){t[e]=r},e.parcelRequireb66d=i),(0,i.register)("jVjzR",function(e,r){self.postMessage("relative-paths")}),i("jVjzR");
//# sourceMappingURL=processor.008c9777.js.map
```

### processor.008c9777.js.map

```map
(skipped in snapshot)
```
