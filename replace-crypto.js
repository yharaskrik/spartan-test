import { readFileSync } from 'node:fs';
import { writeFileSync } from 'node:fs';

const file = 'dist/client/analog/_worker.js';

let workerFile = readFileSync(file, {
  encoding: 'utf-8',
});

workerFile = workerFile.replace(
  'import*as e from"crypto"',
  'import*as e from"node:crypto"'
);

writeFileSync(file, workerFile);
