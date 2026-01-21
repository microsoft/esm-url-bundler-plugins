import { createPluginConfig } from '../../build/rollup.shared.mjs';

export default createPluginConfig({
  input: 'src/index.ts',
  external: ['rollup'],
});
