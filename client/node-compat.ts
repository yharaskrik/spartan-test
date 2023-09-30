export const nodePackages = [
  'assert',
  'crypto',
  'async_hooks',
  'buffer',
  'diagnostics_channel',
  'events',
  'path',
  'process',
  'stream',
  'string_decoder',
  'util',
];

export function nodeCompat() {
  return nodePackages.map((nodePackage) => ({
    name: nodePackage,
    transform(code: string) {
      if (code.includes(`from "${nodePackage}"`)) {
        return {
          code: code.replaceAll(
            `from "${nodePackage}"`,
            `from "node:${nodePackage}"`
          ),
        };
      }
      return;
    },
  }));
}
