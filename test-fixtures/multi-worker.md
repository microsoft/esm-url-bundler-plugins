# multi-worker

Multiple workers with the same filename in different directories.

## Files

```js path=index.js
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

```js path=dir1/worker.js
self.postMessage('dir1');
```

```js path=dir2/worker.js
self.postMessage('dir2');
```

## Expected Behavior

- Two distinct worker bundles are created with unique names
- `dir1/worker.js` → `dir1-worker.js`
- `dir2/worker.js` → `dir2-worker.js`
- Main bundle references both workers by their unique output names
- No naming collision occurs
