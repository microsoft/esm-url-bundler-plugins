# no-dot-slash (parcel)

## Input Files

### index.js

```js
const workerUrl = new URL('worker.js?esm', import.meta.url);
const worker = new Worker(workerUrl);
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

### worker.js

```js
self.postMessage('no-dot-slash');
```

## Output Files

### index.js

```js
var e,r=globalThis,o={},t={},i=r.parcelRequireb66d;null==i&&((i=function(e){if(e in o)return o[e].exports;if(e in t){var r=t[e];delete t[e];var i={id:e,exports:{}};return o[e]=i,r.call(i.exports,i,i.exports),i.exports}var n=Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,r){t[e]=r},r.parcelRequireb66d=i),i.register,Object.assign(i.i??={},{"84HvF":"worker.905b2849.js"});e="84HvF",e=i.i?.[e]||e,new Worker(new URL(import.meta.resolve("./"+e))).onmessage=e=>console.log("[WORKER_OK]",e.data);
//# sourceMappingURL=index.js.map
```

### index.js.map

```map
{"mappings":"A,I,E,E,W,E,C,E,E,C,E,E,E,iB,A,O,I,A,C,E,S,C,E,G,K,E,O,C,C,E,C,O,C,G,K,E,C,I,E,C,C,E,A,Q,C,C,E,C,I,E,C,G,E,Q,C,C,E,O,C,C,E,C,E,E,I,C,E,O,C,E,E,O,E,E,O,A,C,I,E,A,M,uB,E,I,O,E,I,C,mB,C,C,E,Q,C,S,C,C,C,E,C,C,E,C,C,E,E,iB,C,G,E,Q,C,O,M,C,E,C,G,C,ECA8B,CAAC,QAAQ,qCAAqC,G,EEArC,Q,E,E,C,E,C,E,E,EDEvC,AADe,IAAI,OADnB,IAAA,I,Y,O,C,A,K,KAEO,SAAS,CAAG,AAAC,GAAM,QAAQ,GAAG,CAAC,cAAe,EAAE,IAAI","sources":["<anon>","node_modules/@parcel/runtime-js/lib/runtime-a0d5e7e659d2dd41.js","tests/parcel/tmp/no-dot-slash/input/index.js","node_modules/@parcel/runtime-js/lib/runtime-c5e71b2c29c7abc5.js"],"sourcesContent":["\nfunction $parcel$extendImportMap(map) {\n  Object.assign(parcelRequire.i ??= {}, map);\n}\n\nfunction $parcel$resolve(url) {\n  url = parcelRequire.i?.[url] || url;\n  return import.meta.resolve($parcel$distDir + url);\n}\n\n      var $parcel$global = globalThis;\n    var $parcel$distDir = \"./\";\n\nvar $parcel$modules = {};\nvar $parcel$inits = {};\n\nvar parcelRequire = $parcel$global[\"parcelRequireb66d\"];\n\nif (parcelRequire == null) {\n  parcelRequire = function(id) {\n    if (id in $parcel$modules) {\n      return $parcel$modules[id].exports;\n    }\n    if (id in $parcel$inits) {\n      var init = $parcel$inits[id];\n      delete $parcel$inits[id];\n      var module = {id: id, exports: {}};\n      $parcel$modules[id] = module;\n      init.call(module.exports, module, module.exports);\n      return module.exports;\n    }\n    var err = new Error(\"Cannot find module '\" + id + \"'\");\n    err.code = 'MODULE_NOT_FOUND';\n    throw err;\n  };\n\n  parcelRequire.register = function register(id, init) {\n    $parcel$inits[id] = init;\n  };\n\n  $parcel$global[\"parcelRequireb66d\"] = parcelRequire;\n}\n\nvar parcelRegister = parcelRequire.register;\nvar $f0c8226e59a4a10b$exports = {};\n$parcel$extendImportMap({\n    \"84HvF\": \"worker.905b2849.js\"\n});\n\nvar $58700a923eb1a58d$exports = {};\n$58700a923eb1a58d$exports = $parcel$resolve(\"84HvF\");\n\n\nconst $e69eb5dbfd5c4c20$var$workerUrl = new URL($58700a923eb1a58d$exports);\nconst $e69eb5dbfd5c4c20$var$worker = new Worker($e69eb5dbfd5c4c20$var$workerUrl);\n$e69eb5dbfd5c4c20$var$worker.onmessage = (e)=>console.log('[WORKER_OK]', e.data);\n\n\n//# sourceMappingURL=index.js.map\n","parcelRequire.extendImportMap({\"84HvF\":\"worker.905b2849.js\"});","const workerUrl = new URL('worker.js?esm', import.meta.url);\nconst worker = new Worker(workerUrl);\nworker.onmessage = (e) => console.log('[WORKER_OK]', e.data);\n","module.exports = parcelRequire.resolve(\"84HvF\");"],"names":["url","$parcel$global","globalThis","$parcel$modules","$parcel$inits","parcelRequire","id","exports","init","module","call","err","Error","code","register","Object","assign","i","$e69eb5dbfd5c4c20$var$worker","Worker","URL","resolve","$parcel$distDir","onmessage","e","console","log","data"],"version":3,"file":"index.js.map"}
```

### worker.905b2849.js

```js
var e=globalThis,r={},o={},t=e.parcelRequireb66d;null==t&&((t=function(e){if(e in r)return r[e].exports;if(e in o){var t=o[e];delete o[e];var n={id:e,exports:{}};return r[e]=n,t.call(n.exports,n,n.exports),n.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,r){o[e]=r},e.parcelRequireb66d=t),(0,t.register)("kG38q",function(e,r){self.postMessage("no-dot-slash")}),t("kG38q");
//# sourceMappingURL=worker.905b2849.js.map
```

### worker.905b2849.js.map

```map
{"mappings":"A,I,E,W,E,C,E,E,C,E,E,E,iB,A,O,I,A,C,E,S,C,E,G,K,E,O,C,C,E,C,O,C,G,K,E,C,I,E,C,C,E,A,Q,C,C,E,C,I,E,C,G,E,Q,C,C,E,O,C,C,E,C,E,E,I,C,E,O,C,E,E,O,E,E,O,A,C,I,E,A,M,uB,E,I,O,E,I,C,mB,C,C,E,Q,C,S,C,C,C,E,C,C,E,C,C,E,E,iB,C,G,A,C,E,E,Q,A,E,Q,S,C,C,C,ECAA,KAAK,WAAW,CAAC,e,G,E","sources":["<anon>","tests/parcel/tmp/no-dot-slash/input/worker.js"],"sourcesContent":["\n      var $parcel$global = globalThis;\n    \nvar $parcel$modules = {};\nvar $parcel$inits = {};\n\nvar parcelRequire = $parcel$global[\"parcelRequireb66d\"];\n\nif (parcelRequire == null) {\n  parcelRequire = function(id) {\n    if (id in $parcel$modules) {\n      return $parcel$modules[id].exports;\n    }\n    if (id in $parcel$inits) {\n      var init = $parcel$inits[id];\n      delete $parcel$inits[id];\n      var module = {id: id, exports: {}};\n      $parcel$modules[id] = module;\n      init.call(module.exports, module, module.exports);\n      return module.exports;\n    }\n    var err = new Error(\"Cannot find module '\" + id + \"'\");\n    err.code = 'MODULE_NOT_FOUND';\n    throw err;\n  };\n\n  parcelRequire.register = function register(id, init) {\n    $parcel$inits[id] = init;\n  };\n\n  $parcel$global[\"parcelRequireb66d\"] = parcelRequire;\n}\n\nvar parcelRegister = parcelRequire.register;\nparcelRegister(\"kG38q\", function(module, exports) {\nself.postMessage('no-dot-slash');\n\n});\n\n\nparcelRequire(\"kG38q\");\n\n//# sourceMappingURL=worker.905b2849.js.map\n","self.postMessage('no-dot-slash');\n"],"names":["$parcel$global","globalThis","$parcel$modules","$parcel$inits","parcelRequire","id","exports","init","module","call","err","Error","code","register","parcelRegister","self","postMessage"],"version":3,"file":"worker.905b2849.js.map"}
```
