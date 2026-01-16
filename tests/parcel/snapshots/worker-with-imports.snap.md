# worker-with-imports (parcel)

## Input Files

### index.js

```js
const workerUrl = new URL('./worker.js?esm', import.meta.url);
const worker = new Worker(workerUrl, { type: 'module' });
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

### utils.js

```js
export function greet(name) {
  return `Hello, ${name}!`;
}
```

### worker.js

```js
import { greet } from './utils.js';
self.postMessage(greet('worker-with-imports'));
```

## Output Files

### index.js

```js
var e,r=globalThis,o={},n={},t=r.parcelRequireb66d;null==t&&((t=function(e){if(e in o)return o[e].exports;if(e in n){var r=n[e];delete n[e];var t={id:e,exports:{}};return o[e]=t,r.call(t.exports,t,t.exports),t.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,r){n[e]=r},r.parcelRequireb66d=t),t.register,Object.assign(t.i??={},{jMjYn:"worker.26b4f60e.js"});e="jMjYn",e=t.i?.[e]||e,new Worker(new URL(import.meta.resolve("./"+e)),{type:"module"}).onmessage=e=>console.log("[WORKER_OK]",e.data);
//# sourceMappingURL=index.js.map
```

### index.js.map

```map
{"mappings":"A,I,E,E,W,E,C,E,E,C,E,E,E,iB,A,O,I,A,C,E,S,C,E,G,K,E,O,C,C,E,C,O,C,G,K,E,C,I,E,C,C,E,A,Q,C,C,E,C,I,E,C,G,E,Q,C,C,E,O,C,C,E,C,E,E,I,C,E,O,C,E,E,O,E,E,O,A,C,I,E,A,M,uB,E,I,O,E,I,C,mB,C,C,E,Q,C,S,C,C,C,E,C,C,E,C,C,E,E,iB,C,G,E,Q,C,O,M,C,E,C,G,C,ECA8B,CAAC,MAAQ,qCAAqC,G,EEArC,Q,E,E,C,E,C,E,E,EDEvC,AADe,IAAI,OADnB,IAAA,I,Y,O,C,A,K,IACqC,CAAE,KAAM,QAAS,GAC/C,SAAS,CAAG,AAAC,GAAM,QAAQ,GAAG,CAAC,cAAe,EAAE,IAAI","sources":["<anon>","node_modules/@parcel/runtime-js/lib/runtime-8744a6e6dc0dcd69.js","tests/parcel/tmp/worker-with-imports/input/index.js","node_modules/@parcel/runtime-js/lib/runtime-d6b930c5a6b80ee0.js"],"sourcesContent":["\nfunction $parcel$extendImportMap(map) {\n  Object.assign(parcelRequire.i ??= {}, map);\n}\n\nfunction $parcel$resolve(url) {\n  url = parcelRequire.i?.[url] || url;\n  return import.meta.resolve($parcel$distDir + url);\n}\n\n      var $parcel$global = globalThis;\n    var $parcel$distDir = \"./\";\n\nvar $parcel$modules = {};\nvar $parcel$inits = {};\n\nvar parcelRequire = $parcel$global[\"parcelRequireb66d\"];\n\nif (parcelRequire == null) {\n  parcelRequire = function(id) {\n    if (id in $parcel$modules) {\n      return $parcel$modules[id].exports;\n    }\n    if (id in $parcel$inits) {\n      var init = $parcel$inits[id];\n      delete $parcel$inits[id];\n      var module = {id: id, exports: {}};\n      $parcel$modules[id] = module;\n      init.call(module.exports, module, module.exports);\n      return module.exports;\n    }\n    var err = new Error(\"Cannot find module '\" + id + \"'\");\n    err.code = 'MODULE_NOT_FOUND';\n    throw err;\n  };\n\n  parcelRequire.register = function register(id, init) {\n    $parcel$inits[id] = init;\n  };\n\n  $parcel$global[\"parcelRequireb66d\"] = parcelRequire;\n}\n\nvar parcelRegister = parcelRequire.register;\nvar $7687d57d1b671a84$exports = {};\n$parcel$extendImportMap({\n    \"jMjYn\": \"worker.26b4f60e.js\"\n});\n\nvar $a1b24675bf23ec19$exports = {};\n$a1b24675bf23ec19$exports = $parcel$resolve(\"jMjYn\");\n\n\nconst $33ddd9cd4cfced53$var$workerUrl = new URL($a1b24675bf23ec19$exports);\nconst $33ddd9cd4cfced53$var$worker = new Worker($33ddd9cd4cfced53$var$workerUrl, {\n    type: 'module'\n});\n$33ddd9cd4cfced53$var$worker.onmessage = (e)=>console.log('[WORKER_OK]', e.data);\n\n\n//# sourceMappingURL=index.js.map\n","parcelRequire.extendImportMap({\"jMjYn\":\"worker.26b4f60e.js\"});","const workerUrl = new URL('./worker.js?esm', import.meta.url);\nconst worker = new Worker(workerUrl, { type: 'module' });\nworker.onmessage = (e) => console.log('[WORKER_OK]', e.data);\n","module.exports = parcelRequire.resolve(\"jMjYn\");"],"names":["url","$parcel$global","globalThis","$parcel$modules","$parcel$inits","parcelRequire","id","exports","init","module","call","err","Error","code","register","Object","assign","i","$33ddd9cd4cfced53$var$worker","Worker","URL","resolve","$parcel$distDir","type","onmessage","e","console","log","data"],"version":3,"file":"index.js.map"}
```

### worker.26b4f60e.js

```js
var e=globalThis,r={},t={},o=e.parcelRequireb66d;null==o&&((o=function(e){if(e in r)return r[e].exports;if(e in t){var o=t[e];delete t[e];var i={id:e,exports:{}};return r[e]=i,o.call(i.exports,i,i.exports),i.exports}var n=Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,r){t[e]=r},e.parcelRequireb66d=o);var i=o.register;i("eBiL1",function(e,r){var t=o("7Kdj4");self.postMessage((0,t.greet)("worker-with-imports"))}),i("7Kdj4",function(e,r){function t(e){return`Hello, ${e}!`}Object.defineProperty(e.exports,"greet",{get:()=>t,set:void 0,enumerable:!0,configurable:!0})}),o("eBiL1");
//# sourceMappingURL=worker.26b4f60e.js.map
```

### worker.26b4f60e.js.map

```map
{"mappings":"A,I,E,W,E,C,E,E,C,E,E,E,iB,A,O,I,A,C,E,S,C,E,G,K,E,O,C,C,E,C,O,C,G,K,E,C,I,E,C,C,E,A,Q,C,C,E,C,I,E,C,G,E,Q,C,C,E,O,C,C,E,C,E,E,I,C,E,O,C,E,E,O,E,E,O,A,C,I,E,A,M,uB,E,I,O,E,I,C,mB,C,C,E,Q,C,S,C,C,C,E,C,C,E,C,C,E,E,iB,C,G,I,E,E,Q,C,E,Q,S,C,C,C,E,I,E,E,SCCA,KAAK,WAAW,CAAC,AAAA,CAAA,EAAA,EAAA,KAAI,AAAJ,EAAM,uB,G,E,Q,S,C,C,C,ECDhB,SAAS,EAAM,CAAI,EACxB,MAAO,CAAC,OAAO,EAAE,EAAK,CAAC,CAAC,AAC1B,C,O,c,C,E,O,C,Q,C,I,I,E,I,K,E,W,C,E,a,C,C,E,G,E","sources":["<anon>","tests/parcel/tmp/worker-with-imports/input/worker.js","tests/parcel/tmp/worker-with-imports/input/utils.js"],"sourcesContent":["\nfunction $parcel$export(e, n, v, s) {\n  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});\n}\n\n      var $parcel$global = globalThis;\n    \nvar $parcel$modules = {};\nvar $parcel$inits = {};\n\nvar parcelRequire = $parcel$global[\"parcelRequireb66d\"];\n\nif (parcelRequire == null) {\n  parcelRequire = function(id) {\n    if (id in $parcel$modules) {\n      return $parcel$modules[id].exports;\n    }\n    if (id in $parcel$inits) {\n      var init = $parcel$inits[id];\n      delete $parcel$inits[id];\n      var module = {id: id, exports: {}};\n      $parcel$modules[id] = module;\n      init.call(module.exports, module, module.exports);\n      return module.exports;\n    }\n    var err = new Error(\"Cannot find module '\" + id + \"'\");\n    err.code = 'MODULE_NOT_FOUND';\n    throw err;\n  };\n\n  parcelRequire.register = function register(id, init) {\n    $parcel$inits[id] = init;\n  };\n\n  $parcel$global[\"parcelRequireb66d\"] = parcelRequire;\n}\n\nvar parcelRegister = parcelRequire.register;\nparcelRegister(\"eBiL1\", function(module, exports) {\n\nvar $7Kdj4 = parcelRequire(\"7Kdj4\");\nself.postMessage((0, $7Kdj4.greet)('worker-with-imports'));\n\n});\nparcelRegister(\"7Kdj4\", function(module, exports) {\n\n$parcel$export(module.exports, \"greet\", () => $5a3726b6d927eff6$export$aaea0094c1c69714);\nfunction $5a3726b6d927eff6$export$aaea0094c1c69714(name) {\n    return `Hello, ${name}!`;\n}\n\n});\n\n\n\nparcelRequire(\"eBiL1\");\n\n//# sourceMappingURL=worker.26b4f60e.js.map\n","import { greet } from './utils.js';\nself.postMessage(greet('worker-with-imports'));\n","export function greet(name) {\n  return `Hello, ${name}!`;\n}\n"],"names":["$parcel$global","globalThis","$parcel$modules","$parcel$inits","parcelRequire","id","exports","init","module","call","err","Error","code","register","parcelRegister","$7Kdj4","self","postMessage","greet","$5a3726b6d927eff6$export$aaea0094c1c69714","name","Object","defineProperty","get","set","s","enumerable","configurable"],"version":3,"file":"worker.26b4f60e.js.map"}
```
