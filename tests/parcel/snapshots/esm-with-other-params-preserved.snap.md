# esm-with-other-params-preserved (parcel)

## Input Files

### index.js

```js
// Test ?esm with additional parameters - should preserve foo=true when stripping
const workerUrl = new URL('./worker.js?esm&foo=true', import.meta.url);
const worker = new Worker(workerUrl, { type: 'module' });
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

### worker.js

```js
self.postMessage('Worker loaded successfully');
```

## Output Files

### index.js

```js
var e,r=globalThis,o={},t={},i=r.parcelRequireb66d;null==i&&((i=function(e){if(e in o)return o[e].exports;if(e in t){var r=t[e];delete t[e];var i={id:e,exports:{}};return o[e]=i,r.call(i.exports,i,i.exports),i.exports}var n=Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,r){t[e]=r},r.parcelRequireb66d=i),i.register,Object.assign(i.i??={},{"1WMRz":"worker.8f19e40d.js"});e="1WMRz",e=i.i?.[e]||e,new Worker(new URL(import.meta.resolve("./"+e)),{type:"module"}).onmessage=e=>console.log("[WORKER_OK]",e.data);
//# sourceMappingURL=index.js.map
```

### index.js.map

```map
{"mappings":"A,I,E,E,W,E,C,E,E,C,E,E,E,iB,A,O,I,A,C,E,S,C,E,G,K,E,O,C,C,E,C,O,C,G,K,E,C,I,E,C,C,E,A,Q,C,C,E,C,I,E,C,G,E,Q,C,C,E,O,C,C,E,C,E,E,I,C,E,O,C,E,E,O,E,E,O,A,C,I,E,A,M,uB,E,I,O,E,I,C,mB,C,C,E,Q,C,S,C,C,C,E,C,C,E,C,C,E,E,iB,C,G,E,Q,C,O,M,C,E,C,G,C,ECA8B,CAAC,QAAQ,qCAAqC,G,EEArC,Q,E,E,C,E,C,E,E,EDGvC,AADe,IAAI,OADnB,IAAA,I,Y,O,C,A,K,IACqC,CAAE,KAAM,QAAS,GAC/C,SAAS,CAAG,AAAC,GAAM,QAAQ,GAAG,CAAC,cAAe,EAAE,IAAI","sources":["<anon>","node_modules/@parcel/runtime-js/lib/runtime-497d2d6aef386f32.js","tests/parcel/tmp/esm-with-other-params-preserved/input/index.js","node_modules/@parcel/runtime-js/lib/runtime-af628f3c3c932f2d.js"],"sourcesContent":["\nfunction $parcel$extendImportMap(map) {\n  Object.assign(parcelRequire.i ??= {}, map);\n}\n\nfunction $parcel$resolve(url) {\n  url = parcelRequire.i?.[url] || url;\n  return import.meta.resolve($parcel$distDir + url);\n}\n\n      var $parcel$global = globalThis;\n    var $parcel$distDir = \"./\";\n\nvar $parcel$modules = {};\nvar $parcel$inits = {};\n\nvar parcelRequire = $parcel$global[\"parcelRequireb66d\"];\n\nif (parcelRequire == null) {\n  parcelRequire = function(id) {\n    if (id in $parcel$modules) {\n      return $parcel$modules[id].exports;\n    }\n    if (id in $parcel$inits) {\n      var init = $parcel$inits[id];\n      delete $parcel$inits[id];\n      var module = {id: id, exports: {}};\n      $parcel$modules[id] = module;\n      init.call(module.exports, module, module.exports);\n      return module.exports;\n    }\n    var err = new Error(\"Cannot find module '\" + id + \"'\");\n    err.code = 'MODULE_NOT_FOUND';\n    throw err;\n  };\n\n  parcelRequire.register = function register(id, init) {\n    $parcel$inits[id] = init;\n  };\n\n  $parcel$global[\"parcelRequireb66d\"] = parcelRequire;\n}\n\nvar parcelRegister = parcelRequire.register;\nvar $93d69a22ff09fd84$exports = {};\n$parcel$extendImportMap({\n    \"1WMRz\": \"worker.8f19e40d.js\"\n});\n\n// Test ?esm with additional parameters - should preserve foo=true when stripping\nvar $11f0b20cf19a9ed6$exports = {};\n$11f0b20cf19a9ed6$exports = $parcel$resolve(\"1WMRz\");\n\n\nconst $1f50b9ee3e7b3335$var$workerUrl = new URL($11f0b20cf19a9ed6$exports);\nconst $1f50b9ee3e7b3335$var$worker = new Worker($1f50b9ee3e7b3335$var$workerUrl, {\n    type: 'module'\n});\n$1f50b9ee3e7b3335$var$worker.onmessage = (e)=>console.log('[WORKER_OK]', e.data);\n\n\n//# sourceMappingURL=index.js.map\n","parcelRequire.extendImportMap({\"1WMRz\":\"worker.8f19e40d.js\"});","// Test ?esm with additional parameters - should preserve foo=true when stripping\nconst workerUrl = new URL('./worker.js?esm&foo=true', import.meta.url);\nconst worker = new Worker(workerUrl, { type: 'module' });\nworker.onmessage = (e) => console.log('[WORKER_OK]', e.data);\n","module.exports = parcelRequire.resolve(\"1WMRz\");"],"names":["url","$parcel$global","globalThis","$parcel$modules","$parcel$inits","parcelRequire","id","exports","init","module","call","err","Error","code","register","Object","assign","i","$1f50b9ee3e7b3335$var$worker","Worker","URL","resolve","$parcel$distDir","type","onmessage","e","console","log","data"],"version":3,"file":"index.js.map"}
```

### worker.8f19e40d.js

```js
var e=globalThis,r={},o={},t=e.parcelRequireb66d;null==t&&((t=function(e){if(e in r)return r[e].exports;if(e in o){var t=o[e];delete o[e];var s={id:e,exports:{}};return r[e]=s,t.call(s.exports,s,s.exports),s.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,r){o[e]=r},e.parcelRequireb66d=t),(0,t.register)("7E8AX",function(e,r){self.postMessage("Worker loaded successfully")}),t("7E8AX");
//# sourceMappingURL=worker.8f19e40d.js.map
```

### worker.8f19e40d.js.map

```map
{"mappings":"A,I,E,W,E,C,E,E,C,E,E,E,iB,A,O,I,A,C,E,S,C,E,G,K,E,O,C,C,E,C,O,C,G,K,E,C,I,E,C,C,E,A,Q,C,C,E,C,I,E,C,G,E,Q,C,C,E,O,C,C,E,C,E,E,I,C,E,O,C,E,E,O,E,E,O,A,C,I,E,A,M,uB,E,I,O,E,I,C,mB,C,C,E,Q,C,S,C,C,C,E,C,C,E,C,C,E,E,iB,C,G,A,C,E,E,Q,A,E,Q,S,C,C,C,ECAA,KAAK,WAAW,CAAC,6B,G,E","sources":["<anon>","tests/parcel/tmp/esm-with-other-params-preserved/input/worker.js"],"sourcesContent":["\n      var $parcel$global = globalThis;\n    \nvar $parcel$modules = {};\nvar $parcel$inits = {};\n\nvar parcelRequire = $parcel$global[\"parcelRequireb66d\"];\n\nif (parcelRequire == null) {\n  parcelRequire = function(id) {\n    if (id in $parcel$modules) {\n      return $parcel$modules[id].exports;\n    }\n    if (id in $parcel$inits) {\n      var init = $parcel$inits[id];\n      delete $parcel$inits[id];\n      var module = {id: id, exports: {}};\n      $parcel$modules[id] = module;\n      init.call(module.exports, module, module.exports);\n      return module.exports;\n    }\n    var err = new Error(\"Cannot find module '\" + id + \"'\");\n    err.code = 'MODULE_NOT_FOUND';\n    throw err;\n  };\n\n  parcelRequire.register = function register(id, init) {\n    $parcel$inits[id] = init;\n  };\n\n  $parcel$global[\"parcelRequireb66d\"] = parcelRequire;\n}\n\nvar parcelRegister = parcelRequire.register;\nparcelRegister(\"7E8AX\", function(module, exports) {\nself.postMessage('Worker loaded successfully');\n\n});\n\n\nparcelRequire(\"7E8AX\");\n\n//# sourceMappingURL=worker.8f19e40d.js.map\n","self.postMessage('Worker loaded successfully');\n"],"names":["$parcel$global","globalThis","$parcel$modules","$parcel$inits","parcelRequire","id","exports","init","module","call","err","Error","code","register","parcelRegister","self","postMessage"],"version":3,"file":"worker.8f19e40d.js.map"}
```
