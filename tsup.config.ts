import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  platform: 'node',
  target: 'es2019',
  dts: true,
  minify: true,
  clean: true,
  external: ['Reactive'],
});