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
{"mappings":"A,I,E,W,E,C,E,E,C,E,E,E,iB,A,O,I,A,C,E,S,C,E,G,K,E,O,C,C,E,C,O,C,G,K,E,C,I,E,C,C,E,A,Q,C,C,E,C,I,E,C,G,E,Q,C,C,E,O,C,C,E,C,E,E,I,C,E,O,C,E,E,O,E,E,O,A,C,I,E,A,M,uB,E,I,O,E,I,C,mB,C,C,E,Q,C,S,C,C,C,E,C,C,E,C,C,E,E,iB,C,G,A,C,E,E,Q,A,E,Q,S,C,C,C,ECGA,KAAK,WAAW,CAAC,uB,G,E","sources":["<anon>","tests/parcel/tmp/custom-output-filename/input/lib/deeply/nested/services/editorWebWorkerMain.js"],"sourcesContent":["\n      var $parcel$global = globalThis;\n    \nvar $parcel$modules = {};\nvar $parcel$inits = {};\n\nvar parcelRequire = $parcel$global[\"parcelRequireb66d\"];\n\nif (parcelRequire == null) {\n  parcelRequire = function(id) {\n    if (id in $parcel$modules) {\n      return $parcel$modules[id].exports;\n    }\n    if (id in $parcel$inits) {\n      var init = $parcel$inits[id];\n      delete $parcel$inits[id];\n      var module = {id: id, exports: {}};\n      $parcel$modules[id] = module;\n      init.call(module.exports, module, module.exports);\n      return module.exports;\n    }\n    var err = new Error(\"Cannot find module '\" + id + \"'\");\n    err.code = 'MODULE_NOT_FOUND';\n    throw err;\n  };\n\n  parcelRequire.register = function register(id, init) {\n    $parcel$inits[id] = init;\n  };\n\n  $parcel$global[\"parcelRequireb66d\"] = parcelRequire;\n}\n\nvar parcelRegister = parcelRequire.register;\nparcelRegister(\"563XW\", function(module, exports) {\n// This simulates a worker deep in a nested path\n// Without customOutputFileName, this would become: lib-deeply-nested-services-editorWebWorkerMain.js\n// With customOutputFileName: 'basename', this becomes: editorWebWorkerMain.js\nself.postMessage('Editor worker loaded');\n\n});\n\n\nparcelRequire(\"563XW\");\n\n//# sourceMappingURL=editorWebWorkerMain.9da8578f.js.map\n","// This simulates a worker deep in a nested path\n// Without customOutputFileName, this would become: lib-deeply-nested-services-editorWebWorkerMain.js\n// With customOutputFileName: 'basename', this becomes: editorWebWorkerMain.js\nself.postMessage('Editor worker loaded');\n"],"names":["$parcel$global","globalThis","$parcel$modules","$parcel$inits","parcelRequire","id","exports","init","module","call","err","Error","code","register","parcelRegister","self","postMessage"],"version":3,"file":"editorWebWorkerMain.9da8578f.js.map"}
```

### index.js

```js
var e,r=globalThis,o={},t={},i=r.parcelRequireb66d;null==i&&((i=function(e){if(e in o)return o[e].exports;if(e in t){var r=t[e];delete t[e];var i={id:e,exports:{}};return o[e]=i,r.call(i.exports,i,i.exports),i.exports}var n=Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,r){t[e]=r},r.parcelRequireb66d=i),i.register,Object.assign(i.i??={},{"2qkQh":"editorWebWorkerMain.9da8578f.js"});e="2qkQh",e=i.i?.[e]||e,new Worker(new URL(import.meta.resolve("./"+e)),{type:"module"}).onmessage=e=>console.log("[WORKER_OK]",e.data);
//# sourceMappingURL=index.js.map
```

### index.js.map

```map
{"mappings":"A,I,E,E,W,E,C,E,E,C,E,E,E,iB,A,O,I,A,C,E,S,C,E,G,K,E,O,C,C,E,C,O,C,G,K,E,C,I,E,C,C,E,A,Q,C,C,E,C,I,E,C,G,E,Q,C,C,E,O,C,C,E,C,E,E,I,C,E,O,C,E,E,O,E,E,O,A,C,I,E,A,M,uB,E,I,O,E,I,C,mB,C,C,E,Q,C,S,C,C,C,E,C,C,E,C,C,E,E,iB,C,G,E,Q,C,O,M,C,E,C,G,C,ECA8B,CAAC,QAAQ,kDAAkD,G,EEAlD,Q,E,E,C,E,C,E,E,EDIvC,AADe,IAAI,OADnB,IAAA,I,Y,O,C,A,K,IACqC,CAAE,KAAM,QAAS,GAC/C,SAAS,CAAG,AAAC,GAAM,QAAQ,GAAG,CAAC,cAAe,EAAE,IAAI","sources":["<anon>","node_modules/@parcel/runtime-js/lib/runtime-cd9cea65f887dece.js","tests/parcel/tmp/custom-output-filename/input/index.js","node_modules/@parcel/runtime-js/lib/runtime-a634a89725f9f6d6.js"],"sourcesContent":["\nfunction $parcel$extendImportMap(map) {\n  Object.assign(parcelRequire.i ??= {}, map);\n}\n\nfunction $parcel$resolve(url) {\n  url = parcelRequire.i?.[url] || url;\n  return import.meta.resolve($parcel$distDir + url);\n}\n\n      var $parcel$global = globalThis;\n    var $parcel$distDir = \"./\";\n\nvar $parcel$modules = {};\nvar $parcel$inits = {};\n\nvar parcelRequire = $parcel$global[\"parcelRequireb66d\"];\n\nif (parcelRequire == null) {\n  parcelRequire = function(id) {\n    if (id in $parcel$modules) {\n      return $parcel$modules[id].exports;\n    }\n    if (id in $parcel$inits) {\n      var init = $parcel$inits[id];\n      delete $parcel$inits[id];\n      var module = {id: id, exports: {}};\n      $parcel$modules[id] = module;\n      init.call(module.exports, module, module.exports);\n      return module.exports;\n    }\n    var err = new Error(\"Cannot find module '\" + id + \"'\");\n    err.code = 'MODULE_NOT_FOUND';\n    throw err;\n  };\n\n  parcelRequire.register = function register(id, init) {\n    $parcel$inits[id] = init;\n  };\n\n  $parcel$global[\"parcelRequireb66d\"] = parcelRequire;\n}\n\nvar parcelRegister = parcelRequire.register;\nvar $1da145067775a3d9$exports = {};\n$parcel$extendImportMap({\n    \"2qkQh\": \"editorWebWorkerMain.9da8578f.js\"\n});\n\n// Simulate a deeply nested path like node_modules/monaco-editor/esm/vs/editor/...\n// The worker is in a nested directory structure\nvar $33347a1a7f175771$exports = {};\n$33347a1a7f175771$exports = $parcel$resolve(\"2qkQh\");\n\n\nconst $225f357a9a1d4197$var$workerUrl = new URL($33347a1a7f175771$exports);\nconst $225f357a9a1d4197$var$worker = new Worker($225f357a9a1d4197$var$workerUrl, {\n    type: 'module'\n});\n$225f357a9a1d4197$var$worker.onmessage = (e)=>console.log('[WORKER_OK]', e.data);\n\n\n//# sourceMappingURL=index.js.map\n","parcelRequire.extendImportMap({\"2qkQh\":\"editorWebWorkerMain.9da8578f.js\"});","// Simulate a deeply nested path like node_modules/monaco-editor/esm/vs/editor/...\n// The worker is in a nested directory structure\nconst workerUrl = new URL('./lib/deeply/nested/services/editorWebWorkerMain.js?esm', import.meta.url);\nconst worker = new Worker(workerUrl, { type: 'module' });\nworker.onmessage = (e) => console.log('[WORKER_OK]', e.data);\n","module.exports = parcelRequire.resolve(\"2qkQh\");"],"names":["url","$parcel$global","globalThis","$parcel$modules","$parcel$inits","parcelRequire","id","exports","init","module","call","err","Error","code","register","Object","assign","i","$225f357a9a1d4197$var$worker","Worker","URL","resolve","$parcel$distDir","type","onmessage","e","console","log","data"],"version":3,"file":"index.js.map"}
```
