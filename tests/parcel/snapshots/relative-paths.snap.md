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
{"mappings":"A,I,E,E,W,E,C,E,E,C,E,E,E,iB,A,O,I,A,C,E,S,C,E,G,K,E,O,C,C,E,C,O,C,G,K,E,C,I,E,C,C,E,A,Q,C,C,E,C,I,E,C,G,E,Q,C,C,E,O,C,C,E,C,E,E,I,C,E,O,C,E,E,O,E,E,O,A,C,I,E,A,M,uB,E,I,O,E,I,C,mB,C,C,E,Q,C,S,C,C,C,E,C,C,E,C,C,E,E,iB,C,G,E,Q,C,O,M,C,E,C,G,C,ECA8B,CAAC,MAAQ,wCAAwC,G,EEAxC,Q,E,E,C,E,C,E,E,EDEvC,AADe,IAAI,OADnB,IAAA,I,Y,O,C,A,K,KAEO,SAAS,CAAG,AAAC,GAAM,QAAQ,GAAG,CAAC,cAAe,EAAE,IAAI","sources":["<anon>","node_modules/@parcel/runtime-js/lib/runtime-a8ecbd7aca07d09e.js","tests/parcel/tmp/relative-paths/input/src/main.js","node_modules/@parcel/runtime-js/lib/runtime-ad91805f9b78eb9c.js"],"sourcesContent":["\nfunction $parcel$extendImportMap(map) {\n  Object.assign(parcelRequire.i ??= {}, map);\n}\n\nfunction $parcel$resolve(url) {\n  url = parcelRequire.i?.[url] || url;\n  return import.meta.resolve($parcel$distDir + url);\n}\n\n      var $parcel$global = globalThis;\n    var $parcel$distDir = \"./\";\n\nvar $parcel$modules = {};\nvar $parcel$inits = {};\n\nvar parcelRequire = $parcel$global[\"parcelRequireb66d\"];\n\nif (parcelRequire == null) {\n  parcelRequire = function(id) {\n    if (id in $parcel$modules) {\n      return $parcel$modules[id].exports;\n    }\n    if (id in $parcel$inits) {\n      var init = $parcel$inits[id];\n      delete $parcel$inits[id];\n      var module = {id: id, exports: {}};\n      $parcel$modules[id] = module;\n      init.call(module.exports, module, module.exports);\n      return module.exports;\n    }\n    var err = new Error(\"Cannot find module '\" + id + \"'\");\n    err.code = 'MODULE_NOT_FOUND';\n    throw err;\n  };\n\n  parcelRequire.register = function register(id, init) {\n    $parcel$inits[id] = init;\n  };\n\n  $parcel$global[\"parcelRequireb66d\"] = parcelRequire;\n}\n\nvar parcelRegister = parcelRequire.register;\nvar $582e7278792adbd2$exports = {};\n$parcel$extendImportMap({\n    \"gLyXs\": \"processor.008c9777.js\"\n});\n\nvar $d4b88742a4fdda38$exports = {};\n$d4b88742a4fdda38$exports = $parcel$resolve(\"gLyXs\");\n\n\nconst $12100a38023764a2$var$workerUrl = new URL($d4b88742a4fdda38$exports);\nconst $12100a38023764a2$var$worker = new Worker($12100a38023764a2$var$workerUrl);\n$12100a38023764a2$var$worker.onmessage = (e)=>console.log('[WORKER_OK]', e.data);\n\n\n//# sourceMappingURL=main.js.map\n","parcelRequire.extendImportMap({\"gLyXs\":\"processor.008c9777.js\"});","const workerUrl = new URL('../workers/processor.js?esm', import.meta.url);\nconst worker = new Worker(workerUrl);\nworker.onmessage = (e) => console.log('[WORKER_OK]', e.data);\n","module.exports = parcelRequire.resolve(\"gLyXs\");"],"names":["url","$parcel$global","globalThis","$parcel$modules","$parcel$inits","parcelRequire","id","exports","init","module","call","err","Error","code","register","Object","assign","i","$12100a38023764a2$var$worker","Worker","URL","resolve","$parcel$distDir","onmessage","e","console","log","data"],"version":3,"file":"main.js.map"}
```

### processor.008c9777.js

```js
var e=globalThis,r={},t={},i=e.parcelRequireb66d;null==i&&((i=function(e){if(e in r)return r[e].exports;if(e in t){var i=t[e];delete t[e];var o={id:e,exports:{}};return r[e]=o,i.call(o.exports,o,o.exports),o.exports}var n=Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,r){t[e]=r},e.parcelRequireb66d=i),(0,i.register)("jVjzR",function(e,r){self.postMessage("relative-paths")}),i("jVjzR");
//# sourceMappingURL=processor.008c9777.js.map
```

### processor.008c9777.js.map

```map
{"mappings":"A,I,E,W,E,C,E,E,C,E,E,E,iB,A,O,I,A,C,E,S,C,E,G,K,E,O,C,C,E,C,O,C,G,K,E,C,I,E,C,C,E,A,Q,C,C,E,C,I,E,C,G,E,Q,C,C,E,O,C,C,E,C,E,E,I,C,E,O,C,E,E,O,E,E,O,A,C,I,E,A,M,uB,E,I,O,E,I,C,mB,C,C,E,Q,C,S,C,C,C,E,C,C,E,C,C,E,E,iB,C,G,A,C,E,E,Q,A,E,Q,S,C,C,C,ECAA,KAAK,WAAW,CAAC,iB,G,E","sources":["<anon>","tests/parcel/tmp/relative-paths/input/workers/processor.js"],"sourcesContent":["\n      var $parcel$global = globalThis;\n    \nvar $parcel$modules = {};\nvar $parcel$inits = {};\n\nvar parcelRequire = $parcel$global[\"parcelRequireb66d\"];\n\nif (parcelRequire == null) {\n  parcelRequire = function(id) {\n    if (id in $parcel$modules) {\n      return $parcel$modules[id].exports;\n    }\n    if (id in $parcel$inits) {\n      var init = $parcel$inits[id];\n      delete $parcel$inits[id];\n      var module = {id: id, exports: {}};\n      $parcel$modules[id] = module;\n      init.call(module.exports, module, module.exports);\n      return module.exports;\n    }\n    var err = new Error(\"Cannot find module '\" + id + \"'\");\n    err.code = 'MODULE_NOT_FOUND';\n    throw err;\n  };\n\n  parcelRequire.register = function register(id, init) {\n    $parcel$inits[id] = init;\n  };\n\n  $parcel$global[\"parcelRequireb66d\"] = parcelRequire;\n}\n\nvar parcelRegister = parcelRequire.register;\nparcelRegister(\"jVjzR\", function(module, exports) {\nself.postMessage('relative-paths');\n\n});\n\n\nparcelRequire(\"jVjzR\");\n\n//# sourceMappingURL=processor.008c9777.js.map\n","self.postMessage('relative-paths');\n"],"names":["$parcel$global","globalThis","$parcel$modules","$parcel$inits","parcelRequire","id","exports","init","module","call","err","Error","code","register","parcelRegister","self","postMessage"],"version":3,"file":"processor.008c9777.js.map"}
```
