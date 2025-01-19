import { defineConfig } from 'tsup';
import tsupConfig from '@repo/typescript-config/tsup.json' with { type: 'json' };

export default defineConfig({
  ...tsupConfig,
  treeshake: true,
  external: ['react', 'react-dom'],
});
