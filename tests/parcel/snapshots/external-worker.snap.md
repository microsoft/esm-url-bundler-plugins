# external-worker (parcel)

## Input Files

### ../external/worker.js

```js
self.postMessage('External worker loaded');
```

### index.js

```js
// Reference a worker from an "external" (simulated node_modules) location
const workerUrl = new URL('../external/worker.js?esm', import.meta.url);
const worker = new Worker(workerUrl, { type: 'module' });
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

## Output Files

### index.js

```js
var e,r=globalThis,o={},t={},i=r.parcelRequireb66d;null==i&&((i=function(e){if(e in o)return o[e].exports;if(e in t){var r=t[e];delete t[e];var i={id:e,exports:{}};return o[e]=i,r.call(i.exports,i,i.exports),i.exports}var n=Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,r){t[e]=r},r.parcelRequireb66d=i),i.register,Object.assign(i.i??={},{"17klG":"worker.e0651976.js"});e="17klG",e=i.i?.[e]||e,new Worker(new URL(import.meta.resolve("./"+e)),{type:"module"}).onmessage=e=>console.log("[WORKER_OK]",e.data);
//# sourceMappingURL=index.js.map
```

### index.js.map

```map
{"mappings":"A,I,E,E,W,E,C,E,E,C,E,E,E,iB,A,O,I,A,C,E,S,C,E,G,K,E,O,C,C,E,C,O,C,G,K,E,C,I,E,C,C,E,A,Q,C,C,E,C,I,E,C,G,E,Q,C,C,E,O,C,C,E,C,E,E,I,C,E,O,C,E,E,O,E,E,O,A,C,I,E,A,M,uB,E,I,O,E,I,C,mB,C,C,E,Q,C,S,C,C,C,E,C,C,E,C,C,E,E,iB,C,G,E,Q,C,O,M,C,E,C,G,C,ECA8B,CAAC,QAAQ,qCAAqC,G,EEArC,Q,E,E,C,E,C,E,E,EDGvC,AADe,IAAI,OADnB,IAAA,I,Y,O,C,A,K,IACqC,CAAE,KAAM,QAAS,GAC/C,SAAS,CAAG,AAAC,GAAM,QAAQ,GAAG,CAAC,cAAe,EAAE,IAAI","sources":["<anon>","node_modules/@parcel/runtime-js/lib/runtime-b41bcf2df2dd188a.js","tests/parcel/tmp/external-worker/input/index.js","node_modules/@parcel/runtime-js/lib/runtime-eb33c10bdcf556c9.js"],"sourcesContent":["\nfunction $parcel$extendImportMap(map) {\n  Object.assign(parcelRequire.i ??= {}, map);\n}\n\nfunction $parcel$resolve(url) {\n  url = parcelRequire.i?.[url] || url;\n  return import.meta.resolve($parcel$distDir + url);\n}\n\n      var $parcel$global = globalThis;\n    var $parcel$distDir = \"./\";\n\nvar $parcel$modules = {};\nvar $parcel$inits = {};\n\nvar parcelRequire = $parcel$global[\"parcelRequireb66d\"];\n\nif (parcelRequire == null) {\n  parcelRequire = function(id) {\n    if (id in $parcel$modules) {\n      return $parcel$modules[id].exports;\n    }\n    if (id in $parcel$inits) {\n      var init = $parcel$inits[id];\n      delete $parcel$inits[id];\n      var module = {id: id, exports: {}};\n      $parcel$modules[id] = module;\n      init.call(module.exports, module, module.exports);\n      return module.exports;\n    }\n    var err = new Error(\"Cannot find module '\" + id + \"'\");\n    err.code = 'MODULE_NOT_FOUND';\n    throw err;\n  };\n\n  parcelRequire.register = function register(id, init) {\n    $parcel$inits[id] = init;\n  };\n\n  $parcel$global[\"parcelRequireb66d\"] = parcelRequire;\n}\n\nvar parcelRegister = parcelRequire.register;\nvar $7aade1bd02fc1552$exports = {};\n$parcel$extendImportMap({\n    \"17klG\": \"worker.e0651976.js\"\n});\n\n// Reference a worker from an \"external\" (simulated node_modules) location\nvar $62165217b7f01915$exports = {};\n$62165217b7f01915$exports = $parcel$resolve(\"17klG\");\n\n\nconst $4fd62b784948fdab$var$workerUrl = new URL($62165217b7f01915$exports);\nconst $4fd62b784948fdab$var$worker = new Worker($4fd62b784948fdab$var$workerUrl, {\n    type: 'module'\n});\n$4fd62b784948fdab$var$worker.onmessage = (e)=>console.log('[WORKER_OK]', e.data);\n\n\n//# sourceMappingURL=index.js.map\n","parcelRequire.extendImportMap({\"17klG\":\"worker.e0651976.js\"});","// Reference a worker from an \"external\" (simulated node_modules) location\nconst workerUrl = new URL('../external/worker.js?esm', import.meta.url);\nconst worker = new Worker(workerUrl, { type: 'module' });\nworker.onmessage = (e) => console.log('[WORKER_OK]', e.data);\n","module.exports = parcelRequire.resolve(\"17klG\");"],"names":["url","$parcel$global","globalThis","$parcel$modules","$parcel$inits","parcelRequire","id","exports","init","module","call","err","Error","code","register","Object","assign","i","$4fd62b784948fdab$var$worker","Worker","URL","resolve","$parcel$distDir","type","onmessage","e","console","log","data"],"version":3,"file":"index.js.map"}
```

### worker.e0651976.js

```js
var e=globalThis,r={},o={},t=e.parcelRequireb66d;null==t&&((t=function(e){if(e in r)return r[e].exports;if(e in o){var t=o[e];delete o[e];var n={id:e,exports:{}};return r[e]=n,t.call(n.exports,n,n.exports),n.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,r){o[e]=r},e.parcelRequireb66d=t),(0,t.register)("7okmY",function(e,r){self.postMessage("External worker loaded")}),t("7okmY");
//# sourceMappingURL=worker.e0651976.js.map
```

### worker.e0651976.js.map

```map
{"mappings":"A,I,E,W,E,C,E,E,C,E,E,E,iB,A,O,I,A,C,E,S,C,E,G,K,E,O,C,C,E,C,O,C,G,K,E,C,I,E,C,C,E,A,Q,C,C,E,C,I,E,C,G,E,Q,C,C,E,O,C,C,E,C,E,E,I,C,E,O,C,E,E,O,E,E,O,A,C,I,E,A,M,uB,E,I,O,E,I,C,mB,C,C,E,Q,C,S,C,C,C,E,C,C,E,C,C,E,E,iB,C,G,A,C,E,E,Q,A,E,Q,S,C,C,C,ECAA,KAAK,WAAW,CAAC,yB,G,E","sources":["<anon>","tests/parcel/tmp/external-worker/external/worker.js"],"sourcesContent":["\n      var $parcel$global = globalThis;\n    \nvar $parcel$modules = {};\nvar $parcel$inits = {};\n\nvar parcelRequire = $parcel$global[\"parcelRequireb66d\"];\n\nif (parcelRequire == null) {\n  parcelRequire = function(id) {\n    if (id in $parcel$modules) {\n      return $parcel$modules[id].exports;\n    }\n    if (id in $parcel$inits) {\n      var init = $parcel$inits[id];\n      delete $parcel$inits[id];\n      var module = {id: id, exports: {}};\n      $parcel$modules[id] = module;\n      init.call(module.exports, module, module.exports);\n      return module.exports;\n    }\n    var err = new Error(\"Cannot find module '\" + id + \"'\");\n    err.code = 'MODULE_NOT_FOUND';\n    throw err;\n  };\n\n  parcelRequire.register = function register(id, init) {\n    $parcel$inits[id] = init;\n  };\n\n  $parcel$global[\"parcelRequireb66d\"] = parcelRequire;\n}\n\nvar parcelRegister = parcelRequire.register;\nparcelRegister(\"7okmY\", function(module, exports) {\nself.postMessage('External worker loaded');\n\n});\n\n\nparcelRequire(\"7okmY\");\n\n//# sourceMappingURL=worker.e0651976.js.map\n","self.postMessage('External worker loaded');\n"],"names":["$parcel$global","globalThis","$parcel$modules","$parcel$inits","parcelRequire","id","exports","init","module","call","err","Error","code","register","parcelRegister","self","postMessage"],"version":3,"file":"worker.e0651976.js.map"}
```
