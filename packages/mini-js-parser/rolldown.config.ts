import { defineConfig } from 'rolldown';

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      format: 'esm',
      file: 'dist/mini-js-parser.esm.js',
      cleanDir: true,
    },
    {
      format: 'cjs',
      file: 'dist/mini-js-parser.cjs.js',
      cleanDir: true,
    },
  ],
});
