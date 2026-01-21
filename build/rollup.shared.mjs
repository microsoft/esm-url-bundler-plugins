import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import { defineConfig } from 'rollup';

/**
 * Creates a rollup config for a plugin package.
 * Bundles the common package inline and generates CJS + ESM outputs.
 * @param {{ input: string; external?: string[] }} options
 */
export function createPluginConfig(options) {
  const { input, external = [] } = options;
  
  return defineConfig([
    // CommonJS build
    {
      input,
      output: {
        file: 'dist/cjs/index.js',
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
      external: [...external, /^node:/],
      plugins: [
        nodeResolve(),
        typescript({
          tsconfig: './tsconfig.cjs.json',
          declaration: true,
          declarationDir: 'dist/cjs',
        }),
      ],
    },
    // ESM build
    {
      input,
      output: {
        file: 'dist/esm/index.js',
        format: 'es',
        sourcemap: true,
      },
      external: [...external, /^node:/],
      plugins: [
        nodeResolve(),
        typescript({
          tsconfig: './tsconfig.esm.json',
          declaration: true,
          declarationDir: 'dist/esm',
        }),
      ],
    },
  ]);
}
