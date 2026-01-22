# custom-output-filename (parcel)

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

### editorWebWorkerMain.9da8578f.js

```js
var r=globalThis,e={},o={},t=r.parcelRequireb66d;null==t&&((t=function(r){if(r in e)return e[r].exports;if(r in o){var t=o[r];delete o[r];var i={id:r,exports:{}};return e[r]=i,t.call(i.exports,i,i.exports),i.exports}var n=Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(r,e){o[r]=e},r.parcelRequireb66d=t),(0,t.register)("563XW",function(r,e){self.postMessage("Editor worker loaded")}),t("563XW");
//# sourceMappingURL=editorWebWorkerMain.9da8578f.js.map
```

### editorWebWorkerMain.9da8578f.js.map

```map
(skipped in snapshot)
```

### index.js

```js
var e,r=globalThis,o={},t={},i=r.parcelRequireb66d;null==i&&((i=function(e){if(e in o)return o[e].exports;if(e in t){var r=t[e];delete t[e];var i={id:e,exports:{}};return o[e]=i,r.call(i.exports,i,i.exports),i.exports}var n=Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,r){t[e]=r},r.parcelRequireb66d=i),i.register,Object.assign(i.i??={},{"2qkQh":"editorWebWorkerMain.9da8578f.js"});e="2qkQh",e=i.i?.[e]||e,new Worker(new URL(import.meta.resolve("./"+e)),{type:"module"}).onmessage=e=>console.log("[WORKER_OK]",e.data);
//# sourceMappingURL=index.js.map
```

### index.js.map

```map
(skipped in snapshot)
```
