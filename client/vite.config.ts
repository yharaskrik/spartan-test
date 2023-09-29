/// <reference types="vitest" />

import analog from '@analogjs/platform';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    publicDir: 'src/public',
    build: {
      target: ['es2020'],
    },
    ssr: {
      noExternal: ['xhr2'],
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
        },
      }),
      tsConfigPaths({
        root: '../',
      }),
      {
        name: 'test',
        transform(code, id) {
          if (code.includes('os.type()')) {
            return {
              code: code.replace('os.type()', `''`).replace('os.arch()', `''`),
            };
          }
          return;
        },
      },
      {
        name: 'global',
        transform(code, id) {
          if (code.includes('global') && id.includes('platform-server.mjs')) {
            return {
              code: code
                .replaceAll('global.', 'globalThis.')
                .replaceAll('global,', 'globalThis,')
                .replaceAll(' global[', ' globalThis['),
            };
          }
          return;
        },
      },
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
      'process.versions.node': `'node'`,
      'process.versions.v8': `'v8'`,
    },
  };
});
