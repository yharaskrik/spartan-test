/// <reference types="vitest" />

import analog from '@analogjs/platform';
import { defineConfig, Plugin, splitVendorChunkPlugin } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    publicDir: 'src/public',
    ssr: {
      noExternal: ['xhr2']
    },
    build: {
      target: ['es2020'],
    },
    plugins: [
      analog(),
      tsConfigPaths({
        root: '../',
      }),
      splitVendorChunkPlugin(),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['**/*.spec.ts'],
      cache: {
        dir: `../node_modules/.vitest`,
      },
    },
    define: {
      'import.meta.vitest': mode !== 'production',
      'process.versions.node': `'node'`,
      'process.versions.v8': `'v8'`
    }
  };
});
