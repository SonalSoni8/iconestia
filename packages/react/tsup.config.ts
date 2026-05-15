import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/icon-base.tsx', 'src/types.ts', 'src/icons/*.tsx'],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  target: 'es2022',
  clean: true,
});
