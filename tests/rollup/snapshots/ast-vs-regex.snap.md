# ast-vs-regex (rollup)

## Input Files

### another-fake.js

```js
// This file exists and will be bundled (regex matches comment)
self.postMessage('another-fake');
```

### doc-example.js

```js
// This file exists and will be bundled (regex matches template literal)
self.postMessage('doc-example');
```

### fake-worker.js

```js
// This file exists and will be bundled (regex matches comment)
self.postMessage('fake-worker');
```

### index.js

```js
// This comment will be matched by regex (edge case):
// const url = new URL('./fake-worker.js?esm', import.meta.url);

/*
 * Multi-line comment with pattern (will be matched by regex):
 * new URL('./another-fake.js?esm', import.meta.url)
 */

const docString = `
  Example usage in documentation:
  const workerUrl = new URL('./doc-example.js?esm', import.meta.url);
  This will be matched by regex.
`;

const codeExample = "new URL('./string-example.js?esm', import.meta.url)";

// This is the main usage:
const workerUrl = new URL('./worker.js?esm', import.meta.url);
const worker = new Worker(workerUrl);
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

### string-example.js

```js
// This file exists and will be bundled (regex matches string literal)
self.postMessage('string-example');
```

### worker.js

```js
self.postMessage('ast-vs-regex-worker');
```

## Output Files

### index.js

```js
// This comment will be matched by regex (edge case):
// const url = new URL(import.meta.ROLLUP_FILE_URL_####, import.meta.url);


// This is the main usage:
const workerUrl = new URL('tests-rollup-tmp-ast-vs-regex-input-worker.js?esm', import.meta.url);
const worker = new Worker(workerUrl);
worker.onmessage = (e) => console.log('[WORKER_OK]', e.data);
```

### tests-rollup-tmp-ast-vs-regex-input-another-fake.js

```js
// This file exists and will be bundled (regex matches comment)
self.postMessage('another-fake');
```

### tests-rollup-tmp-ast-vs-regex-input-doc-example.js

```js
// This file exists and will be bundled (regex matches template literal)
self.postMessage('doc-example');
```

### tests-rollup-tmp-ast-vs-regex-input-fake-worker.js

```js
// This file exists and will be bundled (regex matches comment)
self.postMessage('fake-worker');
```

### tests-rollup-tmp-ast-vs-regex-input-string-example.js

```js
// This file exists and will be bundled (regex matches string literal)
self.postMessage('string-example');
```

### tests-rollup-tmp-ast-vs-regex-input-worker.js

```js
self.postMessage('ast-vs-regex-worker');
```
