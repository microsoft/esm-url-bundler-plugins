# multi-worker (vite)

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
//#region input/index.js
var worker1Url = new URL("input-dir1-worker.js?esm", import.meta.url);
var worker2Url = new URL("input-dir2-worker.js?esm", import.meta.url);
var count = 0;
function onMessage(e) {
	count++;
	if (count === 2) console.log("[WORKER_OK]", "both");
}
var w1 = new Worker(worker1Url);
var w2 = new Worker(worker2Url);
w1.onmessage = onMessage;
w2.onmessage = onMessage;
//#endregion
```

### input-dir1-worker.js

```js
//#region input/dir1/worker.js
self.postMessage("dir1");
//#endregion
```

### input-dir2-worker.js

```js
//#region input/dir2/worker.js
self.postMessage("dir2");
//#endregion
```
