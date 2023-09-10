/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
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
        cloudflare: {
          pages: {
            routes: {
              version: 1,
              include: ['/*'],
              exclude: ['/index.html'],
            },
            defaultRoutes: false,
          },
        },
      },
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
    setupFiles: ['src/test.ts'],
    include: ['**/*.spec.ts'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
    'process.versions.node': `'node'`,
    'process.versions.v8': `'v8'`,
  },
}));
