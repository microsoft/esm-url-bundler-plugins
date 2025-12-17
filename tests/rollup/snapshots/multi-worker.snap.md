# multi-worker (rollup)

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
const worker1Url = new URL('tests-rollup-tmp-multi-worker-input-dir1-worker.js?esm', import.meta.url);
const worker2Url = new URL('tests-rollup-tmp-multi-worker-input-dir2-worker.js?esm', import.meta.url);

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

### tests-rollup-tmp-multi-worker-input-dir1-worker.js

```js
self.postMessage('dir1');
```

### tests-rollup-tmp-multi-worker-input-dir2-worker.js

```js
self.postMessage('dir2');
```
