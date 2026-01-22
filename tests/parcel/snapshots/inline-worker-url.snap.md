# inline-worker-url (parcel)

## Input Files

### index.js

```js
// The URL is created inline with the Worker constructor
const worker = new Worker(new URL('./worker.js?esm', import.meta.url), { type: 'module' });
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

### worker.js

```js
self.postMessage('Inline worker URL loaded');
```

## Output Files

### index.js

```js
var r,e=globalThis,i={},t={},o=e.parcelRequireb66d;null==o&&((o=function(r){if(r in i)return i[r].exports;if(r in t){var e=t[r];delete t[r];var o={id:r,exports:{}};return i[r]=o,e.call(o.exports,o,o.exports),o.exports}var n=Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(r,e){t[r]=e},e.parcelRequireb66d=o),o.register,Object.assign(o.i??={},{bepwx:"worker.7a076619.js"});var n={};n=function(r,e,i){if(e===self.location.origin)return r;var t=i?"import "+JSON.stringify(r)+";":"importScripts("+JSON.stringify(r)+");";return URL.createObjectURL(new Blob([t],{type:"application/javascript"}))};let a=new URL((r="bepwx",r=o.i?.[r]||r,import.meta.resolve("./"+r)));new Worker(n(a.toString(),a.origin,!0)).onmessage=r=>console.log("[WORKER_OK]",r.data);
//# sourceMappingURL=index.js.map
```

### index.js.map

```map
(skipped in snapshot)
```

### worker.7a076619.js

```js
(()=>{var e=globalThis,r={},o={},n=e.parcelRequireb66d;null==n&&((n=function(e){if(e in r)return r[e].exports;if(e in o){var n=o[e];delete o[e];var t={id:e,exports:{}};return r[e]=t,n.call(t.exports,t,t.exports),t.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,r){o[e]=r},e.parcelRequireb66d=n),(0,n.register)("2vBJk",function(e,r){self.postMessage("Inline worker URL loaded")}),n("2vBJk")})();
//# sourceMappingURL=worker.7a076619.js.map
```

### worker.7a076619.js.map

```map
(skipped in snapshot)
```
