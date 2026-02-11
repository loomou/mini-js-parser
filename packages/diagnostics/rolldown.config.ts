import { defineConfig } from 'rolldown';

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      format: 'esm',
      file: 'dist/diagnostics.esm.js',
      cleanDir: true,
    },
    {
      format: 'cjs',
      file: 'dist/diagnostics.cjs.js',
      cleanDir: true,
    },
  ],
});
