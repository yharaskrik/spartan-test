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
      {
        name: 'global',
        transform(code, id) {
          if (code.includes('global') && id.includes('platform-server.mjs')) {
            return {
              code: code
                .replaceAll('global.', 'globalThis.')
                .replaceAll('global,', 'globalThis,')
                .replaceAll(' global[', ' globalThis[')
            };
          }
          return;
        }
      }
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
