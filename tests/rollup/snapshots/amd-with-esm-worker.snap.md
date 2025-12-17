# amd-with-esm-worker (rollup)

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
self.postMessage(greet('amd-with-esm-worker'));
```

## Output Files

### index.js

```js
define('index', ['module', 'require'], (function (module, require) { 'use strict';

	const workerUrl = new URL('tests-rollup-tmp-amd-with-esm-worker-input-worker.js?esm', new URL(module.uri, document.baseURI).href);
	const worker = new Worker(workerUrl, { type: 'module' });
	worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);

}));
```

### tests-rollup-tmp-amd-with-esm-worker-input-worker.js

```js
function greet(name) {
  return `Hello, ${name}!`;
}

self.postMessage(greet('amd-with-esm-worker'));
```
