import { defineConfig } from 'rolldown';

export default defineConfig({
  input: './src/index.ts',
  output: {
    file: './build/index.js',
    format: 'esm',
    minify: true,
  },
});
