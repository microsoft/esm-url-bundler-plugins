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
(skipped in snapshot)
```

### worker.23ab2814.js

```js
var r=globalThis,e={},t={},i=r.parcelRequireb66d;null==i&&((i=function(r){if(r in e)return e[r].exports;if(r in t){var i=t[r];delete t[r];var o={id:r,exports:{}};return e[r]=o,i.call(o.exports,o,o.exports),o.exports}var n=Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(r,e){t[r]=e},r.parcelRequireb66d=i),(0,i.register)("lhhyZ",function(r,e){self.postMessage("dir1")}),i("lhhyZ");
//# sourceMappingURL=worker.23ab2814.js.map
```

### worker.23ab2814.js.map

```map
(skipped in snapshot)
```

### worker.5c1f482a.js

```js
var r=globalThis,e={},t={},i=r.parcelRequireb66d;null==i&&((i=function(r){if(r in e)return e[r].exports;if(r in t){var i=t[r];delete t[r];var o={id:r,exports:{}};return e[r]=o,i.call(o.exports,o,o.exports),o.exports}var n=Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(r,e){t[r]=e},r.parcelRequireb66d=i),(0,i.register)("61dgb",function(r,e){self.postMessage("dir2")}),i("61dgb");
//# sourceMappingURL=worker.5c1f482a.js.map
```

### worker.5c1f482a.js.map

```map
(skipped in snapshot)
```
