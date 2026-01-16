# multi-worker (parcel)

## Input Files

### dir1/worker.js

```js
self.postMessage('dir1');
```

### dir2/worker.js

```js
self.postMessage('dir2');
```

### index.js

```js
const worker1Url = new URL('./dir1/worker.js?esm', import.meta.url);
const worker2Url = new URL('./dir2/worker.js?esm', import.meta.url);

let count = 0;
function onMessage(e) {
  count++;
  if (count === 2) console.log('[WORKER_OK]', 'both');
}

const w1 = new Worker(worker1Url);
const w2 = new Worker(worker2Url);
w1.onmessage = onMessage;
w2.onmessage = onMessage;
```

## Output Files

### index.js

```js
function e(e){return e=i.i?.[e]||e,import.meta.resolve(o+e)}var r=globalThis,o="./",n={},t={},i=r.parcelRequireb66d;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in t){var r=t[e];delete t[e];var o={id:e,exports:{}};return n[e]=o,r.call(o.exports,o,o.exports),o.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,r){t[e]=r},r.parcelRequireb66d=i),i.register,Object.assign(i.i??={},{b4fAc:"worker.23ab2814.js","1bBEu":"worker.5c1f482a.js"});let s=new URL(e("b4fAc")),l=new URL(e("1bBEu")),a=0;function c(e){2==++a&&console.log("[WORKER_OK]","both")}let u=new Worker(s),d=new Worker(l);u.onmessage=c,d.onmessage=c;
//# sourceMappingURL=index.js.map
```

### index.js.map

```map
{"mappings":"A,S,E,C,E,O,E,E,C,E,C,E,E,E,Y,O,C,E,E,C,I,E,W,E,K,E,C,E,E,C,E,E,E,iB,A,O,I,A,C,E,S,C,E,G,K,E,O,C,C,E,C,O,C,G,K,E,C,I,E,C,C,E,A,Q,C,C,E,C,I,E,C,G,E,Q,C,C,E,O,C,C,E,C,E,E,I,C,E,O,C,E,E,O,E,E,O,A,C,I,E,A,M,uB,E,I,O,E,I,C,mB,C,C,E,Q,C,S,C,C,C,E,C,C,E,C,C,E,E,iB,C,G,E,Q,C,O,M,C,E,C,G,C,ECA8B,CAAC,MAAQ,sCAAsC,QAAQ,qCAAqC,GCA1H,IAAM,EAAN,IAAA,ICAiB,EAAsB,UDCjC,EAAN,IAAA,IEDiB,EAAsB,UFGnC,EAAQ,EACZ,SAAS,EAAU,CAAC,EAEd,AAAU,KAAV,GAAa,QAAQ,GAAG,CAAC,cAAe,OAC9C,CAEA,IAAM,EAAK,IAAI,OAAO,GAChB,EAAK,IAAI,OAAO,EACtB,CAAA,EAAG,SAAS,CAAG,EACf,EAAG,SAAS,CAAG","sources":["<anon>","node_modules/@parcel/runtime-js/lib/runtime-0dcd5ae389437e41.js","tests/parcel/tmp/multi-worker/input/index.js","node_modules/@parcel/runtime-js/lib/runtime-c6b0fe95b800ffa1.js","node_modules/@parcel/runtime-js/lib/runtime-e19c136ddfe31f8b.js"],"sourcesContent":["\nfunction $parcel$extendImportMap(map) {\n  Object.assign(parcelRequire.i ??= {}, map);\n}\n\nfunction $parcel$resolve(url) {\n  url = parcelRequire.i?.[url] || url;\n  return import.meta.resolve($parcel$distDir + url);\n}\n\n      var $parcel$global = globalThis;\n    var $parcel$distDir = \"./\";\n\nvar $parcel$modules = {};\nvar $parcel$inits = {};\n\nvar parcelRequire = $parcel$global[\"parcelRequireb66d\"];\n\nif (parcelRequire == null) {\n  parcelRequire = function(id) {\n    if (id in $parcel$modules) {\n      return $parcel$modules[id].exports;\n    }\n    if (id in $parcel$inits) {\n      var init = $parcel$inits[id];\n      delete $parcel$inits[id];\n      var module = {id: id, exports: {}};\n      $parcel$modules[id] = module;\n      init.call(module.exports, module, module.exports);\n      return module.exports;\n    }\n    var err = new Error(\"Cannot find module '\" + id + \"'\");\n    err.code = 'MODULE_NOT_FOUND';\n    throw err;\n  };\n\n  parcelRequire.register = function register(id, init) {\n    $parcel$inits[id] = init;\n  };\n\n  $parcel$global[\"parcelRequireb66d\"] = parcelRequire;\n}\n\nvar parcelRegister = parcelRequire.register;\nvar $2f7c2c99f1875e9e$exports = {};\n$parcel$extendImportMap({\n    \"b4fAc\": \"worker.23ab2814.js\",\n    \"1bBEu\": \"worker.5c1f482a.js\"\n});\n\nvar $3008b8af4a4fcd1a$exports = {};\n$3008b8af4a4fcd1a$exports = $parcel$resolve(\"b4fAc\");\n\n\nconst $63422efde0a4afe2$var$worker1Url = new URL($3008b8af4a4fcd1a$exports);\nvar $e483318e4ae9cbad$exports = {};\n$e483318e4ae9cbad$exports = $parcel$resolve(\"1bBEu\");\n\n\nconst $63422efde0a4afe2$var$worker2Url = new URL($e483318e4ae9cbad$exports);\nlet $63422efde0a4afe2$var$count = 0;\nfunction $63422efde0a4afe2$var$onMessage(e) {\n    $63422efde0a4afe2$var$count++;\n    if ($63422efde0a4afe2$var$count === 2) console.log('[WORKER_OK]', 'both');\n}\nconst $63422efde0a4afe2$var$w1 = new Worker($63422efde0a4afe2$var$worker1Url);\nconst $63422efde0a4afe2$var$w2 = new Worker($63422efde0a4afe2$var$worker2Url);\n$63422efde0a4afe2$var$w1.onmessage = $63422efde0a4afe2$var$onMessage;\n$63422efde0a4afe2$var$w2.onmessage = $63422efde0a4afe2$var$onMessage;\n\n\n//# sourceMappingURL=index.js.map\n","parcelRequire.extendImportMap({\"b4fAc\":\"worker.23ab2814.js\",\"1bBEu\":\"worker.5c1f482a.js\"});","const worker1Url = new URL('./dir1/worker.js?esm', import.meta.url);\nconst worker2Url = new URL('./dir2/worker.js?esm', import.meta.url);\n\nlet count = 0;\nfunction onMessage(e) {\n  count++;\n  if (count === 2) console.log('[WORKER_OK]', 'both');\n}\n\nconst w1 = new Worker(worker1Url);\nconst w2 = new Worker(worker2Url);\nw1.onmessage = onMessage;\nw2.onmessage = onMessage;\n","module.exports = parcelRequire.resolve(\"b4fAc\");","module.exports = parcelRequire.resolve(\"1bBEu\");"],"names":["$parcel$resolve","url","parcelRequire","i","resolve","$parcel$distDir","$parcel$global","globalThis","$parcel$modules","$parcel$inits","id","exports","init","module","call","err","Error","code","register","Object","assign","$63422efde0a4afe2$var$worker1Url","URL","$63422efde0a4afe2$var$worker2Url","$63422efde0a4afe2$var$count","$63422efde0a4afe2$var$onMessage","e","console","log","$63422efde0a4afe2$var$w1","Worker","$63422efde0a4afe2$var$w2","onmessage"],"version":3,"file":"index.js.map"}
```

### worker.23ab2814.js

```js
var r=globalThis,e={},t={},i=r.parcelRequireb66d;null==i&&((i=function(r){if(r in e)return e[r].exports;if(r in t){var i=t[r];delete t[r];var o={id:r,exports:{}};return e[r]=o,i.call(o.exports,o,o.exports),o.exports}var n=Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(r,e){t[r]=e},r.parcelRequireb66d=i),(0,i.register)("lhhyZ",function(r,e){self.postMessage("dir1")}),i("lhhyZ");
//# sourceMappingURL=worker.23ab2814.js.map
```

### worker.23ab2814.js.map

```map
{"mappings":"A,I,E,W,E,C,E,E,C,E,E,E,iB,A,O,I,A,C,E,S,C,E,G,K,E,O,C,C,E,C,O,C,G,K,E,C,I,E,C,C,E,A,Q,C,C,E,C,I,E,C,G,E,Q,C,C,E,O,C,C,E,C,E,E,I,C,E,O,C,E,E,O,E,E,O,A,C,I,E,A,M,uB,E,I,O,E,I,C,mB,C,C,E,Q,C,S,C,C,C,E,C,C,E,C,C,E,E,iB,C,G,A,C,E,E,Q,A,E,Q,S,C,C,C,ECAA,KAAK,WAAW,CAAC,O,G,E","sources":["<anon>","tests/parcel/tmp/multi-worker/input/dir1/worker.js"],"sourcesContent":["\n      var $parcel$global = globalThis;\n    \nvar $parcel$modules = {};\nvar $parcel$inits = {};\n\nvar parcelRequire = $parcel$global[\"parcelRequireb66d\"];\n\nif (parcelRequire == null) {\n  parcelRequire = function(id) {\n    if (id in $parcel$modules) {\n      return $parcel$modules[id].exports;\n    }\n    if (id in $parcel$inits) {\n      var init = $parcel$inits[id];\n      delete $parcel$inits[id];\n      var module = {id: id, exports: {}};\n      $parcel$modules[id] = module;\n      init.call(module.exports, module, module.exports);\n      return module.exports;\n    }\n    var err = new Error(\"Cannot find module '\" + id + \"'\");\n    err.code = 'MODULE_NOT_FOUND';\n    throw err;\n  };\n\n  parcelRequire.register = function register(id, init) {\n    $parcel$inits[id] = init;\n  };\n\n  $parcel$global[\"parcelRequireb66d\"] = parcelRequire;\n}\n\nvar parcelRegister = parcelRequire.register;\nparcelRegister(\"lhhyZ\", function(module, exports) {\nself.postMessage('dir1');\n\n});\n\n\nparcelRequire(\"lhhyZ\");\n\n//# sourceMappingURL=worker.23ab2814.js.map\n","self.postMessage('dir1');\n"],"names":["$parcel$global","globalThis","$parcel$modules","$parcel$inits","parcelRequire","id","exports","init","module","call","err","Error","code","register","parcelRegister","self","postMessage"],"version":3,"file":"worker.23ab2814.js.map"}
```

### worker.5c1f482a.js

```js
var r=globalThis,e={},t={},i=r.parcelRequireb66d;null==i&&((i=function(r){if(r in e)return e[r].exports;if(r in t){var i=t[r];delete t[r];var o={id:r,exports:{}};return e[r]=o,i.call(o.exports,o,o.exports),o.exports}var n=Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(r,e){t[r]=e},r.parcelRequireb66d=i),(0,i.register)("61dgb",function(r,e){self.postMessage("dir2")}),i("61dgb");
//# sourceMappingURL=worker.5c1f482a.js.map
```

### worker.5c1f482a.js.map

```map
{"mappings":"A,I,E,W,E,C,E,E,C,E,E,E,iB,A,O,I,A,C,E,S,C,E,G,K,E,O,C,C,E,C,O,C,G,K,E,C,I,E,C,C,E,A,Q,C,C,E,C,I,E,C,G,E,Q,C,C,E,O,C,C,E,C,E,E,I,C,E,O,C,E,E,O,E,E,O,A,C,I,E,A,M,uB,E,I,O,E,I,C,mB,C,C,E,Q,C,S,C,C,C,E,C,C,E,C,C,E,E,iB,C,G,A,C,E,E,Q,A,E,Q,S,C,C,C,ECAA,KAAK,WAAW,CAAC,O,G,E","sources":["<anon>","tests/parcel/tmp/multi-worker/input/dir2/worker.js"],"sourcesContent":["\n      var $parcel$global = globalThis;\n    \nvar $parcel$modules = {};\nvar $parcel$inits = {};\n\nvar parcelRequire = $parcel$global[\"parcelRequireb66d\"];\n\nif (parcelRequire == null) {\n  parcelRequire = function(id) {\n    if (id in $parcel$modules) {\n      return $parcel$modules[id].exports;\n    }\n    if (id in $parcel$inits) {\n      var init = $parcel$inits[id];\n      delete $parcel$inits[id];\n      var module = {id: id, exports: {}};\n      $parcel$modules[id] = module;\n      init.call(module.exports, module, module.exports);\n      return module.exports;\n    }\n    var err = new Error(\"Cannot find module '\" + id + \"'\");\n    err.code = 'MODULE_NOT_FOUND';\n    throw err;\n  };\n\n  parcelRequire.register = function register(id, init) {\n    $parcel$inits[id] = init;\n  };\n\n  $parcel$global[\"parcelRequireb66d\"] = parcelRequire;\n}\n\nvar parcelRegister = parcelRequire.register;\nparcelRegister(\"61dgb\", function(module, exports) {\nself.postMessage('dir2');\n\n});\n\n\nparcelRequire(\"61dgb\");\n\n//# sourceMappingURL=worker.5c1f482a.js.map\n","self.postMessage('dir2');\n"],"names":["$parcel$global","globalThis","$parcel$modules","$parcel$inits","parcelRequire","id","exports","init","module","call","err","Error","code","register","parcelRegister","self","postMessage"],"version":3,"file":"worker.5c1f482a.js.map"}
```
