import pug from 'pug';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { writeFileSync } from 'fs';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputFile = resolve(rootDir, 'public/index.html');
const pugFilePath = resolve(rootDir, 'src/templates/index.pug');
const pugTemplateFunction = pug.compileFile(pugFilePath);

writeFileSync(outputFile, pugTemplateFunction());
