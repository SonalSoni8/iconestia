import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'metadata/icons': 'metadata/icons.ts',
    'generated/icons': 'generated/icons.ts',
  },
  format: ['esm'],
  dts: true,
  sourcemap: true,
  target: 'es2022',
  clean: true,
});
