/// <reference types="vitest" />

import analog from '@analogjs/platform';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import { nodeCompat, nodePackages } from './node-compat';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    publicDir: 'src/public',
    build: {
      target: ['es2020'],
    },
    resolve: {
      mainFields: ['module'],
    },
    plugins: [
      analog({
        nitro: {
          output: Object.assign({
            dir: resolve(process.cwd(), 'dist/client/analog'),
            publicDir: resolve(process.cwd(), 'dist/client/analog'),
          }),
          unenv: {
            external: nodePackages,
          },
          rollupConfig: {
            plugins: [...nodeCompat()],
          },
        },
      }),
      tsConfigPaths({
        root: '../',
      }),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['**/*.spec.ts'],
      cache: {
        dir: `../../node_modules/.vitest`,
      },
    },
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});
