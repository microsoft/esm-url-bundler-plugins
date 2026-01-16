# shared-module-workers-shared (parcel)

## Input Files

### index.js

```js
const worker1Url = new URL('./worker1.js?esm', import.meta.url);
const worker2Url = new URL('./worker2.js?esm', import.meta.url);

let count = 0;
function onMessage(e) {
  count++;
  if (count === 2) console.log('[WORKER_OK]', 'both');
}

const w1 = new Worker(worker1Url, { type: 'module' });
const w2 = new Worker(worker2Url, { type: 'module' });
w1.onmessage = onMessage;
w2.onmessage = onMessage;
```

### shared.js

```js
export function sharedUtil(name) {
  return `Hello from ${name} using shared module!`;
}
```

### worker1.js

```js
import { sharedUtil } from './shared.js';
self.postMessage(sharedUtil('Worker 1'));
```

### worker2.js

```js
import { sharedUtil } from './shared.js';
self.postMessage(sharedUtil('Worker 2'));
```

## Output Files

### index.js

```js
function e(e){return e=i.i?.[e]||e,import.meta.resolve(o+e)}var r=globalThis,o="./",n={},t={},i=r.parcelRequireb66d;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in t){var r=t[e];delete t[e];var o={id:e,exports:{}};return n[e]=o,r.call(o.exports,o,o.exports),o.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,r){t[e]=r},r.parcelRequireb66d=i),i.register,Object.assign(i.i??={},{"8R3bY":"worker1.cd769be6.js","5eSrM":"worker2.df7ae3bf.js"});let s=new URL(e("8R3bY")),l=new URL(e("5eSrM")),a=0;function u(e){2==++a&&console.log("[WORKER_OK]","both")}let d=new Worker(s,{type:"module"}),c=new Worker(l,{type:"module"});d.onmessage=u,c.onmessage=u;
//# sourceMappingURL=index.js.map
```

### index.js.map

```map
{"mappings":"A,S,E,C,E,O,E,E,C,E,C,E,E,E,Y,O,C,E,E,C,I,E,W,E,K,E,C,E,E,C,E,E,E,iB,A,O,I,A,C,E,S,C,E,G,K,E,O,C,C,E,C,O,C,G,K,E,C,I,E,C,C,E,A,Q,C,C,E,C,I,E,C,G,E,Q,C,C,E,O,C,C,E,C,E,E,I,C,E,O,C,E,E,O,E,E,O,A,C,I,E,A,M,uB,E,I,O,E,I,C,mB,C,C,E,Q,C,S,C,C,C,E,C,C,E,C,C,E,E,iB,C,G,E,Q,C,O,M,C,E,C,G,C,ECA8B,CAAC,QAAQ,uCAAuC,QAAQ,sCAAsC,GCA5H,IAAM,EAAN,IAAA,ICAiB,EAAsB,UDCjC,EAAN,IAAA,IEDiB,EAAsB,UFGnC,EAAQ,EACZ,SAAS,EAAU,CAAC,EAEd,AAAU,KAAV,GAAa,QAAQ,GAAG,CAAC,cAAe,OAC9C,CAEA,IAAM,EAAK,IAAI,OAAO,EAAY,CAAE,KAAM,QAAS,GAC7C,EAAK,IAAI,OAAO,EAAY,CAAE,KAAM,QAAS,EACnD,CAAA,EAAG,SAAS,CAAG,EACf,EAAG,SAAS,CAAG","sources":["<anon>","node_modules/@parcel/runtime-js/lib/runtime-ed4f9b7bbfc1a126.js","tests/parcel/tmp/shared-module-workers-shared/input/index.js","node_modules/@parcel/runtime-js/lib/runtime-eb024b4a121d5d44.js","node_modules/@parcel/runtime-js/lib/runtime-1e5561e91424be82.js"],"sourcesContent":["\nfunction $parcel$extendImportMap(map) {\n  Object.assign(parcelRequire.i ??= {}, map);\n}\n\nfunction $parcel$resolve(url) {\n  url = parcelRequire.i?.[url] || url;\n  return import.meta.resolve($parcel$distDir + url);\n}\n\n      var $parcel$global = globalThis;\n    var $parcel$distDir = \"./\";\n\nvar $parcel$modules = {};\nvar $parcel$inits = {};\n\nvar parcelRequire = $parcel$global[\"parcelRequireb66d\"];\n\nif (parcelRequire == null) {\n  parcelRequire = function(id) {\n    if (id in $parcel$modules) {\n      return $parcel$modules[id].exports;\n    }\n    if (id in $parcel$inits) {\n      var init = $parcel$inits[id];\n      delete $parcel$inits[id];\n      var module = {id: id, exports: {}};\n      $parcel$modules[id] = module;\n      init.call(module.exports, module, module.exports);\n      return module.exports;\n    }\n    var err = new Error(\"Cannot find module '\" + id + \"'\");\n    err.code = 'MODULE_NOT_FOUND';\n    throw err;\n  };\n\n  parcelRequire.register = function register(id, init) {\n    $parcel$inits[id] = init;\n  };\n\n  $parcel$global[\"parcelRequireb66d\"] = parcelRequire;\n}\n\nvar parcelRegister = parcelRequire.register;\nvar $a546cf36d81d9d1e$exports = {};\n$parcel$extendImportMap({\n    \"8R3bY\": \"worker1.cd769be6.js\",\n    \"5eSrM\": \"worker2.df7ae3bf.js\"\n});\n\nvar $1b3a13f551d1a656$exports = {};\n$1b3a13f551d1a656$exports = $parcel$resolve(\"8R3bY\");\n\n\nconst $59e03baa11699189$var$worker1Url = new URL($1b3a13f551d1a656$exports);\nvar $dd4de40e9926427e$exports = {};\n$dd4de40e9926427e$exports = $parcel$resolve(\"5eSrM\");\n\n\nconst $59e03baa11699189$var$worker2Url = new URL($dd4de40e9926427e$exports);\nlet $59e03baa11699189$var$count = 0;\nfunction $59e03baa11699189$var$onMessage(e) {\n    $59e03baa11699189$var$count++;\n    if ($59e03baa11699189$var$count === 2) console.log('[WORKER_OK]', 'both');\n}\nconst $59e03baa11699189$var$w1 = new Worker($59e03baa11699189$var$worker1Url, {\n    type: 'module'\n});\nconst $59e03baa11699189$var$w2 = new Worker($59e03baa11699189$var$worker2Url, {\n    type: 'module'\n});\n$59e03baa11699189$var$w1.onmessage = $59e03baa11699189$var$onMessage;\n$59e03baa11699189$var$w2.onmessage = $59e03baa11699189$var$onMessage;\n\n\n//# sourceMappingURL=index.js.map\n","parcelRequire.extendImportMap({\"8R3bY\":\"worker1.cd769be6.js\",\"5eSrM\":\"worker2.df7ae3bf.js\"});","const worker1Url = new URL('./worker1.js?esm', import.meta.url);\nconst worker2Url = new URL('./worker2.js?esm', import.meta.url);\n\nlet count = 0;\nfunction onMessage(e) {\n  count++;\n  if (count === 2) console.log('[WORKER_OK]', 'both');\n}\n\nconst w1 = new Worker(worker1Url, { type: 'module' });\nconst w2 = new Worker(worker2Url, { type: 'module' });\nw1.onmessage = onMessage;\nw2.onmessage = onMessage;\n","module.exports = parcelRequire.resolve(\"8R3bY\");","module.exports = parcelRequire.resolve(\"5eSrM\");"],"names":["$parcel$resolve","url","parcelRequire","i","resolve","$parcel$distDir","$parcel$global","globalThis","$parcel$modules","$parcel$inits","id","exports","init","module","call","err","Error","code","register","Object","assign","$59e03baa11699189$var$worker1Url","URL","$59e03baa11699189$var$worker2Url","$59e03baa11699189$var$count","$59e03baa11699189$var$onMessage","e","console","log","$59e03baa11699189$var$w1","Worker","type","$59e03baa11699189$var$w2","onmessage"],"version":3,"file":"index.js.map"}
```

### worker1.cd769be6.js

```js
var e=globalThis,r={},i={},t=e.parcelRequireb66d;null==t&&((t=function(e){if(e in r)return r[e].exports;if(e in i){var t=i[e];delete i[e];var o={id:e,exports:{}};return r[e]=o,t.call(o.exports,o,o.exports),o.exports}var n=Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,r){i[e]=r},e.parcelRequireb66d=t);var o=t.register;o("3LjCG",function(e,r){var i=t("diKiN");self.postMessage((0,i.sharedUtil)("Worker 1"))}),o("diKiN",function(e,r){function i(e){return`Hello from ${e} using shared module!`}Object.defineProperty(e.exports,"sharedUtil",{get:()=>i,set:void 0,enumerable:!0,configurable:!0})}),t("3LjCG");
//# sourceMappingURL=worker1.cd769be6.js.map
```

### worker1.cd769be6.js.map

```map
{"mappings":"A,I,E,W,E,C,E,E,C,E,E,E,iB,A,O,I,A,C,E,S,C,E,G,K,E,O,C,C,E,C,O,C,G,K,E,C,I,E,C,C,E,A,Q,C,C,E,C,I,E,C,G,E,Q,C,C,E,O,C,C,E,C,E,E,I,C,E,O,C,E,E,O,E,E,O,A,C,I,E,A,M,uB,E,I,O,E,I,C,mB,C,C,E,Q,C,S,C,C,C,E,C,C,E,C,C,E,E,iB,C,G,I,E,E,Q,C,E,Q,S,C,C,C,E,I,E,E,SCCA,KAAK,WAAW,CAAC,AAAA,CAAA,EAAA,EAAA,UAAS,AAAT,EAAW,Y,G,E,Q,S,C,C,C,ECDrB,SAAS,EAAW,CAAI,EAC7B,MAAO,CAAC,WAAW,EAAE,EAAK,qBAAqB,CAAC,AAClD,C,O,c,C,E,O,C,a,C,I,I,E,I,K,E,W,C,E,a,C,C,E,G,E","sources":["<anon>","tests/parcel/tmp/shared-module-workers-shared/input/worker1.js","tests/parcel/tmp/shared-module-workers-shared/input/shared.js"],"sourcesContent":["\nfunction $parcel$export(e, n, v, s) {\n  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});\n}\n\n      var $parcel$global = globalThis;\n    \nvar $parcel$modules = {};\nvar $parcel$inits = {};\n\nvar parcelRequire = $parcel$global[\"parcelRequireb66d\"];\n\nif (parcelRequire == null) {\n  parcelRequire = function(id) {\n    if (id in $parcel$modules) {\n      return $parcel$modules[id].exports;\n    }\n    if (id in $parcel$inits) {\n      var init = $parcel$inits[id];\n      delete $parcel$inits[id];\n      var module = {id: id, exports: {}};\n      $parcel$modules[id] = module;\n      init.call(module.exports, module, module.exports);\n      return module.exports;\n    }\n    var err = new Error(\"Cannot find module '\" + id + \"'\");\n    err.code = 'MODULE_NOT_FOUND';\n    throw err;\n  };\n\n  parcelRequire.register = function register(id, init) {\n    $parcel$inits[id] = init;\n  };\n\n  $parcel$global[\"parcelRequireb66d\"] = parcelRequire;\n}\n\nvar parcelRegister = parcelRequire.register;\nparcelRegister(\"3LjCG\", function(module, exports) {\n\nvar $diKiN = parcelRequire(\"diKiN\");\nself.postMessage((0, $diKiN.sharedUtil)('Worker 1'));\n\n});\nparcelRegister(\"diKiN\", function(module, exports) {\n\n$parcel$export(module.exports, \"sharedUtil\", () => $9af0df719c7cbb62$export$37603573d8684424);\nfunction $9af0df719c7cbb62$export$37603573d8684424(name) {\n    return `Hello from ${name} using shared module!`;\n}\n\n});\n\n\n\nparcelRequire(\"3LjCG\");\n\n//# sourceMappingURL=worker1.cd769be6.js.map\n","import { sharedUtil } from './shared.js';\nself.postMessage(sharedUtil('Worker 1'));\n","export function sharedUtil(name) {\n  return `Hello from ${name} using shared module!`;\n}\n"],"names":["$parcel$global","globalThis","$parcel$modules","$parcel$inits","parcelRequire","id","exports","init","module","call","err","Error","code","register","parcelRegister","$diKiN","self","postMessage","sharedUtil","$9af0df719c7cbb62$export$37603573d8684424","name","Object","defineProperty","get","set","s","enumerable","configurable"],"version":3,"file":"worker1.cd769be6.js.map"}
```

### worker2.df7ae3bf.js

```js
var e=globalThis,r={},i={},t=e.parcelRequireb66d;null==t&&((t=function(e){if(e in r)return r[e].exports;if(e in i){var t=i[e];delete i[e];var o={id:e,exports:{}};return r[e]=o,t.call(o.exports,o,o.exports),o.exports}var n=Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,r){i[e]=r},e.parcelRequireb66d=t);var o=t.register;o("65371",function(e,r){var i=t("diKiN");self.postMessage((0,i.sharedUtil)("Worker 2"))}),o("diKiN",function(e,r){function i(e){return`Hello from ${e} using shared module!`}Object.defineProperty(e.exports,"sharedUtil",{get:()=>i,set:void 0,enumerable:!0,configurable:!0})}),t("65371");
//# sourceMappingURL=worker2.df7ae3bf.js.map
```

### worker2.df7ae3bf.js.map

```map
{"mappings":"A,I,E,W,E,C,E,E,C,E,E,E,iB,A,O,I,A,C,E,S,C,E,G,K,E,O,C,C,E,C,O,C,G,K,E,C,I,E,C,C,E,A,Q,C,C,E,C,I,E,C,G,E,Q,C,C,E,O,C,C,E,C,E,E,I,C,E,O,C,E,E,O,E,E,O,A,C,I,E,A,M,uB,E,I,O,E,I,C,mB,C,C,E,Q,C,S,C,C,C,E,C,C,E,C,C,E,E,iB,C,G,I,E,E,Q,C,E,Q,S,C,C,C,E,I,E,E,SCCA,KAAK,WAAW,CAAC,AAAA,CAAA,EAAA,EAAA,UAAS,AAAT,EAAW,Y,G,E,Q,S,C,C,C,ECDrB,SAAS,EAAW,CAAI,EAC7B,MAAO,CAAC,WAAW,EAAE,EAAK,qBAAqB,CAAC,AAClD,C,O,c,C,E,O,C,a,C,I,I,E,I,K,E,W,C,E,a,C,C,E,G,E","sources":["<anon>","tests/parcel/tmp/shared-module-workers-shared/input/worker2.js","tests/parcel/tmp/shared-module-workers-shared/input/shared.js"],"sourcesContent":["\nfunction $parcel$export(e, n, v, s) {\n  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});\n}\n\n      var $parcel$global = globalThis;\n    \nvar $parcel$modules = {};\nvar $parcel$inits = {};\n\nvar parcelRequire = $parcel$global[\"parcelRequireb66d\"];\n\nif (parcelRequire == null) {\n  parcelRequire = function(id) {\n    if (id in $parcel$modules) {\n      return $parcel$modules[id].exports;\n    }\n    if (id in $parcel$inits) {\n      var init = $parcel$inits[id];\n      delete $parcel$inits[id];\n      var module = {id: id, exports: {}};\n      $parcel$modules[id] = module;\n      init.call(module.exports, module, module.exports);\n      return module.exports;\n    }\n    var err = new Error(\"Cannot find module '\" + id + \"'\");\n    err.code = 'MODULE_NOT_FOUND';\n    throw err;\n  };\n\n  parcelRequire.register = function register(id, init) {\n    $parcel$inits[id] = init;\n  };\n\n  $parcel$global[\"parcelRequireb66d\"] = parcelRequire;\n}\n\nvar parcelRegister = parcelRequire.register;\nparcelRegister(\"65371\", function(module, exports) {\n\nvar $diKiN = parcelRequire(\"diKiN\");\nself.postMessage((0, $diKiN.sharedUtil)('Worker 2'));\n\n});\nparcelRegister(\"diKiN\", function(module, exports) {\n\n$parcel$export(module.exports, \"sharedUtil\", () => $9af0df719c7cbb62$export$37603573d8684424);\nfunction $9af0df719c7cbb62$export$37603573d8684424(name) {\n    return `Hello from ${name} using shared module!`;\n}\n\n});\n\n\n\nparcelRequire(\"65371\");\n\n//# sourceMappingURL=worker2.df7ae3bf.js.map\n","import { sharedUtil } from './shared.js';\nself.postMessage(sharedUtil('Worker 2'));\n","export function sharedUtil(name) {\n  return `Hello from ${name} using shared module!`;\n}\n"],"names":["$parcel$global","globalThis","$parcel$modules","$parcel$inits","parcelRequire","id","exports","init","module","call","err","Error","code","register","parcelRegister","$diKiN","self","postMessage","sharedUtil","$9af0df719c7cbb62$export$37603573d8684424","name","Object","defineProperty","get","set","s","enumerable","configurable"],"version":3,"file":"worker2.df7ae3bf.js.map"}
```
