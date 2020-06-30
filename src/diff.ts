import path from 'path';
import { promises as fs } from 'fs';

import { generateDiff, Type } from '.';
import { Reset, BgGreen, BgRed } from './utils/colors';

const [original, modefied] = process.argv.slice(2, 4);

const originalText = fs.readFile(path.resolve(original), 'utf-8');
const modefiedText = fs.readFile(path.resolve(modefied), 'utf-8');

async function main() {
  generateDiff(
    (await originalText).split('\n'),
    (await modefiedText).split('\n')
  ).forEach((diff) => {
    switch (diff.type) {
      case Type.IDLE:
        console.log(Reset, diff.content);
        break;
      case Type.ADD:
        console.log(BgGreen, diff.content);
        break;
      case Type.DELETE:
        console.log(BgRed, diff.content);
        break;
      default:
        throw Error('unexpect type');
    }
  });
}

main();
