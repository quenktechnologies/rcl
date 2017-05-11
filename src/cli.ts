import 'source-map-support/register';
import * as docopt from 'docopt';
import * as fs from 'fs';
import * as os from 'os';
import { dirname, basename, extname } from 'path';
import { Future } from 'fluture';
import { compile } from './Compiler';
import { parse } from './Parser';

//typescript complains if we try to import this
//the output of jison does not play nicely with our current tsconfig settings.
const parse = require('./Parser').parse;

const getFileContents = path =>
    Future.node(done => fs.readFile(path, { encoding: 'utf8' }, done));

const writeToStream = stream => contents =>
    Future.node(done => stream.write(`${contents}${os.EOL}`, 'utf8', done));

const getOutStream = (args: object) =>
    args['--stdout'] ?
        process.stdout :
        fs.createWriteStream(`${getFileName(args['<file>'])}.${args['--ext'] || 'jsc'}`);


const getFileName = (file: string): string =>
    `${dirname(file)}/${basename(file, extname(file))}`;

const args: object = docopt.docopt(`

Usage:
  jcon [options] <file>

Options:
  -h --help     Show this screen.
  --version     Show jcon version.
  --ast         Output only the Abstract Syntax Tree (AST) as JSON.
  --ext=EXT     The extension to use when writing files directly. 
  --stdout      Use STDOUT.
`, { version: require('../package.json').version });

getFileContents(args['<file>'])
    .map(parse)
    .map(ast => args['--ast'] ? JSON.stringify(ast) : ast)
    /*  .map(compile(args))
      .chain(state =>
          state
          .evalState({})
          .cata(e => Future.reject(e), o => Future.of(o))) */
    /*    .map(pretty) */
    .chain(writeToStream(getOutStream(args)))
    .chainRej(writeToStream(process.stderr))
    .fork(console.error, x => x);

