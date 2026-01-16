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
{"mappings":"A,I,E,E,W,E,C,E,E,C,E,E,E,iB,A,O,I,A,C,E,S,C,E,G,K,E,O,C,C,E,C,O,C,G,K,E,C,I,E,C,C,E,A,Q,C,C,E,C,I,E,C,G,E,Q,C,C,E,O,C,C,E,C,E,E,I,C,E,O,C,E,E,O,E,E,O,A,C,I,E,A,M,uB,E,I,O,E,I,C,mB,C,C,E,Q,C,S,C,C,C,E,C,C,E,C,C,E,E,iB,C,G,E,Q,C,O,M,C,E,C,G,C,ECA8B,CAAC,QAAQ,qCAAqC,G,EEArC,Q,E,E,C,E,C,E,E,EDEvC,AADe,IAAI,OADnB,IAAA,I,Y,O,C,A,K,KAEO,SAAS,CAAG,AAAC,GAAM,QAAQ,GAAG,CAAC,cAAe,EAAE,IAAI","sources":["<anon>","node_modules/@parcel/runtime-js/lib/runtime-5d14977a503f22ab.js","tests/parcel/tmp/basic-worker/input/index.js","node_modules/@parcel/runtime-js/lib/runtime-0ce583e8c08b02d4.js"],"sourcesContent":["\nfunction $parcel$extendImportMap(map) {\n  Object.assign(parcelRequire.i ??= {}, map);\n}\n\nfunction $parcel$resolve(url) {\n  url = parcelRequire.i?.[url] || url;\n  return import.meta.resolve($parcel$distDir + url);\n}\n\n      var $parcel$global = globalThis;\n    var $parcel$distDir = \"./\";\n\nvar $parcel$modules = {};\nvar $parcel$inits = {};\n\nvar parcelRequire = $parcel$global[\"parcelRequireb66d\"];\n\nif (parcelRequire == null) {\n  parcelRequire = function(id) {\n    if (id in $parcel$modules) {\n      return $parcel$modules[id].exports;\n    }\n    if (id in $parcel$inits) {\n      var init = $parcel$inits[id];\n      delete $parcel$inits[id];\n      var module = {id: id, exports: {}};\n      $parcel$modules[id] = module;\n      init.call(module.exports, module, module.exports);\n      return module.exports;\n    }\n    var err = new Error(\"Cannot find module '\" + id + \"'\");\n    err.code = 'MODULE_NOT_FOUND';\n    throw err;\n  };\n\n  parcelRequire.register = function register(id, init) {\n    $parcel$inits[id] = init;\n  };\n\n  $parcel$global[\"parcelRequireb66d\"] = parcelRequire;\n}\n\nvar parcelRegister = parcelRequire.register;\nvar $1b82e53c35b570b3$exports = {};\n$parcel$extendImportMap({\n    \"17L3n\": \"worker.88a8e560.js\"\n});\n\nvar $8ebb36beca077746$exports = {};\n$8ebb36beca077746$exports = $parcel$resolve(\"17L3n\");\n\n\nconst $070251c7e0d750fc$var$workerUrl = new URL($8ebb36beca077746$exports);\nconst $070251c7e0d750fc$var$worker = new Worker($070251c7e0d750fc$var$workerUrl);\n$070251c7e0d750fc$var$worker.onmessage = (e)=>console.log('[WORKER_OK]', e.data);\n\n\n//# sourceMappingURL=index.js.map\n","parcelRequire.extendImportMap({\"17L3n\":\"worker.88a8e560.js\"});","const workerUrl = new URL('./worker.js?esm', import.meta.url);\nconst worker = new Worker(workerUrl);\nworker.onmessage = (e) => console.log('[WORKER_OK]', e.data);\n","module.exports = parcelRequire.resolve(\"17L3n\");"],"names":["url","$parcel$global","globalThis","$parcel$modules","$parcel$inits","parcelRequire","id","exports","init","module","call","err","Error","code","register","Object","assign","i","$070251c7e0d750fc$var$worker","Worker","URL","resolve","$parcel$distDir","onmessage","e","console","log","data"],"version":3,"file":"index.js.map"}
```

### worker.88a8e560.js

```js
var r=globalThis,e={},o={},t=r.parcelRequireb66d;null==t&&((t=function(r){if(r in e)return e[r].exports;if(r in o){var t=o[r];delete o[r];var i={id:r,exports:{}};return e[r]=i,t.call(i.exports,i,i.exports),i.exports}var n=Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(r,e){o[r]=e},r.parcelRequireb66d=t),(0,t.register)("gJOuc",function(r,e){self.postMessage("basic-worker")}),t("gJOuc");
//# sourceMappingURL=worker.88a8e560.js.map
```

### worker.88a8e560.js.map

```map
{"mappings":"A,I,E,W,E,C,E,E,C,E,E,E,iB,A,O,I,A,C,E,S,C,E,G,K,E,O,C,C,E,C,O,C,G,K,E,C,I,E,C,C,E,A,Q,C,C,E,C,I,E,C,G,E,Q,C,C,E,O,C,C,E,C,E,E,I,C,E,O,C,E,E,O,E,E,O,A,C,I,E,A,M,uB,E,I,O,E,I,C,mB,C,C,E,Q,C,S,C,C,C,E,C,C,E,C,C,E,E,iB,C,G,A,C,E,E,Q,A,E,Q,S,C,C,C,ECAA,KAAK,WAAW,CAAC,e,G,E","sources":["<anon>","tests/parcel/tmp/basic-worker/input/worker.js"],"sourcesContent":["\n      var $parcel$global = globalThis;\n    \nvar $parcel$modules = {};\nvar $parcel$inits = {};\n\nvar parcelRequire = $parcel$global[\"parcelRequireb66d\"];\n\nif (parcelRequire == null) {\n  parcelRequire = function(id) {\n    if (id in $parcel$modules) {\n      return $parcel$modules[id].exports;\n    }\n    if (id in $parcel$inits) {\n      var init = $parcel$inits[id];\n      delete $parcel$inits[id];\n      var module = {id: id, exports: {}};\n      $parcel$modules[id] = module;\n      init.call(module.exports, module, module.exports);\n      return module.exports;\n    }\n    var err = new Error(\"Cannot find module '\" + id + \"'\");\n    err.code = 'MODULE_NOT_FOUND';\n    throw err;\n  };\n\n  parcelRequire.register = function register(id, init) {\n    $parcel$inits[id] = init;\n  };\n\n  $parcel$global[\"parcelRequireb66d\"] = parcelRequire;\n}\n\nvar parcelRegister = parcelRequire.register;\nparcelRegister(\"gJOuc\", function(module, exports) {\nself.postMessage('basic-worker');\n\n});\n\n\nparcelRequire(\"gJOuc\");\n\n//# sourceMappingURL=worker.88a8e560.js.map\n","self.postMessage('basic-worker');\n"],"names":["$parcel$global","globalThis","$parcel$modules","$parcel$inits","parcelRequire","id","exports","init","module","call","err","Error","code","register","parcelRegister","self","postMessage"],"version":3,"file":"worker.88a8e560.js.map"}
```
