# ast-vs-regex

Test to demonstrate regex matching behavior.
Regex matches all occurrences of the URL pattern, including those in comments and strings.
This is acceptable since such patterns in comments/strings are uncommon in practice.

## Files

```json path=test-options.json
{
  "bundlers": ["rollup"]
}
```

```js path=index.js
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

```js path=worker.js
self.postMessage('ast-vs-regex-worker');
```

```js path=fake-worker.js
// This file exists and will be bundled (regex matches comment)
self.postMessage('fake-worker');
```

```js path=another-fake.js
// This file exists and will be bundled (regex matches comment)
self.postMessage('another-fake');
```

```js path=doc-example.js
// This file exists and will be bundled (regex matches template literal)
self.postMessage('doc-example');
```

```js path=string-example.js
// This file exists and will be bundled (regex matches string literal)
self.postMessage('string-example');
```

## Expected Behavior

- All URL patterns are matched by regex, including those in comments and strings
- This is the expected trade-off: regex is simpler and works on TypeScript without transformation
- Patterns in comments/strings are rare in practice
