# inline-worker-url (parcel)

## Input Files

### index.js

```js
// The URL is created inline with the Worker constructor
const worker = new Worker(new URL('./worker.js?esm', import.meta.url), { type: 'module' });
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

### worker.js

```js
self.postMessage('Inline worker URL loaded');
```

## Output Files

### index.js

```js
var r,e=globalThis,i={},t={},o=e.parcelRequireb66d;null==o&&((o=function(r){if(r in i)return i[r].exports;if(r in t){var e=t[r];delete t[r];var o={id:r,exports:{}};return i[r]=o,e.call(o.exports,o,o.exports),o.exports}var n=Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(r,e){t[r]=e},e.parcelRequireb66d=o),o.register,Object.assign(o.i??={},{bepwx:"worker.7a076619.js"});var n={};n=function(r,e,i){if(e===self.location.origin)return r;var t=i?"import "+JSON.stringify(r)+";":"importScripts("+JSON.stringify(r)+");";return URL.createObjectURL(new Blob([t],{type:"application/javascript"}))};let a=new URL((r="bepwx",r=o.i?.[r]||r,import.meta.resolve("./"+r)));new Worker(n(a.toString(),a.origin,!0)).onmessage=r=>console.log("[WORKER_OK]",r.data);
//# sourceMappingURL=index.js.map
```

### index.js.map

```map
{"mappings":"A,I,E,E,W,E,C,E,E,C,E,E,E,iB,A,O,I,A,C,E,S,C,E,G,K,E,O,C,C,E,C,O,C,G,K,E,C,I,E,C,C,E,A,Q,C,C,E,C,I,E,C,G,E,Q,C,C,E,O,C,C,E,C,E,E,I,C,E,O,C,E,E,O,E,E,O,A,C,I,E,A,M,uB,E,I,O,E,I,C,mB,C,C,E,Q,C,S,C,C,C,E,C,C,E,C,C,E,E,iB,C,G,E,Q,C,O,M,C,E,C,G,C,ECA8B,CAAC,MAAQ,qCAAqC,G,I,E,C,EGE5E,EAAiB,SAAU,CAAS,CAAE,CAAM,CAAE,CAAK,EACjD,GAAI,IAAW,KAAK,QAAQ,CAAC,MAAM,CAGjC,OAAO,EAGP,IAAI,EAAS,EAAQ,UAAY,KAAK,SAAS,CAAC,GAAa,IAAM,iBAAmB,KAAK,SAAS,CAAC,GAAa,KAClH,OAAO,IAAI,eAAe,CAAC,IAAI,KAAK,CAAC,EAAO,CAAE,CAC5C,KAAM,wBACR,GAEJ,EDbA,IAAI,EAAM,IAAI,K,EAA0B,Q,E,E,C,E,C,E,E,E,Y,O,C,A,K,IDCxC,CADe,IAAI,OCCF,EAAU,EAAI,QAAQ,GAAI,EAAI,MAAM,CAAE,CAAA,IDAhD,SAAS,CAAG,AAAC,GAAM,QAAQ,GAAG,CAAC,cAAe,EAAE,IAAI","sources":["<anon>","node_modules/@parcel/runtime-js/lib/runtime-a5ee07ff30a6bf36.js","tests/parcel/tmp/inline-worker-url/input/index.js","node_modules/@parcel/runtime-js/lib/runtime-95eeea952c1c87b6.js","node_modules/@parcel/runtime-js/lib/helpers/get-worker-url.js"],"sourcesContent":["\nfunction $parcel$extendImportMap(map) {\n  Object.assign(parcelRequire.i ??= {}, map);\n}\n\nfunction $parcel$resolve(url) {\n  url = parcelRequire.i?.[url] || url;\n  return import.meta.resolve($parcel$distDir + url);\n}\n\n      var $parcel$global = globalThis;\n    var $parcel$distDir = \"./\";\n\nvar $parcel$modules = {};\nvar $parcel$inits = {};\n\nvar parcelRequire = $parcel$global[\"parcelRequireb66d\"];\n\nif (parcelRequire == null) {\n  parcelRequire = function(id) {\n    if (id in $parcel$modules) {\n      return $parcel$modules[id].exports;\n    }\n    if (id in $parcel$inits) {\n      var init = $parcel$inits[id];\n      delete $parcel$inits[id];\n      var module = {id: id, exports: {}};\n      $parcel$modules[id] = module;\n      init.call(module.exports, module, module.exports);\n      return module.exports;\n    }\n    var err = new Error(\"Cannot find module '\" + id + \"'\");\n    err.code = 'MODULE_NOT_FOUND';\n    throw err;\n  };\n\n  parcelRequire.register = function register(id, init) {\n    $parcel$inits[id] = init;\n  };\n\n  $parcel$global[\"parcelRequireb66d\"] = parcelRequire;\n}\n\nvar parcelRegister = parcelRequire.register;\nvar $7991b78c28d75a94$exports = {};\n$parcel$extendImportMap({\n    \"bepwx\": \"worker.7a076619.js\"\n});\n\n// The URL is created inline with the Worker constructor\nvar $79205cb9fd5553eb$exports = {};\nvar $56b621a6dd25b2cb$exports = {};\n\"use strict\";\n$56b621a6dd25b2cb$exports = function(workerUrl, origin, isESM) {\n    if (origin === self.location.origin) // If the worker bundle's url is on the same origin as the document,\n    // use the worker bundle's own url.\n    return workerUrl;\n    else {\n        // Otherwise, create a blob URL which loads the worker bundle with `importScripts`.\n        var source = isESM ? 'import ' + JSON.stringify(workerUrl) + ';' : 'importScripts(' + JSON.stringify(workerUrl) + ');';\n        return URL.createObjectURL(new Blob([\n            source\n        ], {\n            type: 'application/javascript'\n        }));\n    }\n};\n\n\nlet $79205cb9fd5553eb$var$url = new URL($parcel$resolve(\"bepwx\"));\n$79205cb9fd5553eb$exports = $56b621a6dd25b2cb$exports($79205cb9fd5553eb$var$url.toString(), $79205cb9fd5553eb$var$url.origin, true);\n\n\nconst $86d5fca376d265f6$var$worker = new Worker($79205cb9fd5553eb$exports);\n$86d5fca376d265f6$var$worker.onmessage = (e)=>console.log('[WORKER_OK]', e.data);\n\n\n//# sourceMappingURL=index.js.map\n","parcelRequire.extendImportMap({\"bepwx\":\"worker.7a076619.js\"});","// The URL is created inline with the Worker constructor\nconst worker = new Worker(new URL('./worker.js?esm', import.meta.url), { type: 'module' });\nworker.onmessage = (e) => console.log('[WORKER_OK]', e.data);\n","let workerURL = require('./helpers/get-worker-url');\nlet url = new URL(parcelRequire.resolve(\"bepwx\"));\nmodule.exports = workerURL(url.toString(), url.origin, true);","\"use strict\";\n\nmodule.exports = function (workerUrl, origin, isESM) {\n  if (origin === self.location.origin) {\n    // If the worker bundle's url is on the same origin as the document,\n    // use the worker bundle's own url.\n    return workerUrl;\n  } else {\n    // Otherwise, create a blob URL which loads the worker bundle with `importScripts`.\n    var source = isESM ? 'import ' + JSON.stringify(workerUrl) + ';' : 'importScripts(' + JSON.stringify(workerUrl) + ');';\n    return URL.createObjectURL(new Blob([source], {\n      type: 'application/javascript'\n    }));\n  }\n};"],"names":["url","$parcel$global","globalThis","$parcel$modules","$parcel$inits","parcelRequire","id","exports","init","module","call","err","Error","code","register","Object","assign","i","$56b621a6dd25b2cb$exports","workerUrl","origin","isESM","self","location","source","JSON","stringify","URL","createObjectURL","Blob","type","$79205cb9fd5553eb$var$url","resolve","$parcel$distDir","$86d5fca376d265f6$var$worker","Worker","toString","onmessage","e","console","log","data"],"version":3,"file":"index.js.map"}
```

### worker.7a076619.js

```js
(()=>{var e=globalThis,r={},o={},n=e.parcelRequireb66d;null==n&&((n=function(e){if(e in r)return r[e].exports;if(e in o){var n=o[e];delete o[e];var t={id:e,exports:{}};return r[e]=t,n.call(t.exports,t,t.exports),t.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,r){o[e]=r},e.parcelRequireb66d=n),(0,n.register)("2vBJk",function(e,r){self.postMessage("Inline worker URL loaded")}),n("2vBJk")})();
//# sourceMappingURL=worker.7a076619.js.map
```

### worker.7a076619.js.map

```map
{"mappings":"A,C,K,I,E,W,E,C,E,E,C,E,E,E,iB,A,O,I,A,C,E,S,C,E,G,K,E,O,C,C,E,C,O,C,G,K,E,C,I,E,C,C,E,A,Q,C,C,E,C,I,E,C,G,E,Q,C,C,E,O,C,C,E,C,E,E,I,C,E,O,C,E,E,O,E,E,O,A,C,I,E,A,M,uB,E,I,O,E,I,C,mB,C,C,E,Q,C,S,C,C,C,E,C,C,E,C,C,E,E,iB,C,G,A,C,E,E,Q,A,E,Q,S,C,C,C,ECAA,KAAK,WAAW,CAAC,2B,G,E,Q,C","sources":["<anon>","tests/parcel/tmp/inline-worker-url/input/worker.js"],"sourcesContent":["(() => {\n\n      var $parcel$global = globalThis;\n    \nvar $parcel$modules = {};\nvar $parcel$inits = {};\n\nvar parcelRequire = $parcel$global[\"parcelRequireb66d\"];\n\nif (parcelRequire == null) {\n  parcelRequire = function(id) {\n    if (id in $parcel$modules) {\n      return $parcel$modules[id].exports;\n    }\n    if (id in $parcel$inits) {\n      var init = $parcel$inits[id];\n      delete $parcel$inits[id];\n      var module = {id: id, exports: {}};\n      $parcel$modules[id] = module;\n      init.call(module.exports, module, module.exports);\n      return module.exports;\n    }\n    var err = new Error(\"Cannot find module '\" + id + \"'\");\n    err.code = 'MODULE_NOT_FOUND';\n    throw err;\n  };\n\n  parcelRequire.register = function register(id, init) {\n    $parcel$inits[id] = init;\n  };\n\n  $parcel$global[\"parcelRequireb66d\"] = parcelRequire;\n}\n\nvar parcelRegister = parcelRequire.register;\nparcelRegister(\"2vBJk\", function(module, exports) {\nself.postMessage('Inline worker URL loaded');\n\n});\n\n\nparcelRequire(\"2vBJk\");\n})();\n//# sourceMappingURL=worker.7a076619.js.map\n","self.postMessage('Inline worker URL loaded');\n"],"names":["$parcel$global","globalThis","$parcel$modules","$parcel$inits","parcelRequire","id","exports","init","module","call","err","Error","code","register","parcelRegister","self","postMessage"],"version":3,"file":"worker.7a076619.js.map"}
```
