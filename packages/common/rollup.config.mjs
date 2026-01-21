import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';

export default defineConfig([
  // CommonJS build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/cjs/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    external: [/^node:/],
    plugins: [
      typescript({
        tsconfig: './tsconfig.cjs.json',
        declaration: true,
        declarationDir: 'dist/cjs',
      }),
    ],
  },
  // ESM build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/esm/index.js',
      format: 'es',
      sourcemap: true,
    },
    external: [/^node:/],
    plugins: [
      typescript({
        tsconfig: './tsconfig.esm.json',
        declaration: true,
        declarationDir: 'dist/esm',
      }),
    ],
  },
]);
