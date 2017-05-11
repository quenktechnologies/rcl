#!/usr/bin/env node

import 'source-map-support/register';
import * as docopt from 'docopt';
import * as fs from 'fs';
import * as os from 'os';
import Future from 'fluture';
import { compile } from './Compiler';
import {parse} from './Parser';

//typescript complains if we try to import this
//the output of jison does not play nicely with our current tsconfig settings.
const parse = require('./Parser').parse;

const getFileContents = path =>
    Future.node(done => fs.readFile(path, { encoding: 'utf8' }, done));

const writeToStream = stream => contents =>
    Future.node(done => stream.write(`${contents}${os.EOL}`, 'utf8', done));

const args: string = docopt.docopt(`

JCON.

Usage: jcon [options] <file>

Options:
  -h --help     Show this screen.
  --version     Show jcon version.
  --ast         Output only the Abstract Syntax Tree (AST) in JSON.
`, { version: require('../package.json').version });

getFileContents(args['<file>'])
    .map(parse)
  /*  .map(compile(args))
    .chain(state =>
        state
        .evalState({})
        .cata(e => Future.reject(e), o => Future.of(o))) */
/*    .map(pretty) */
    .chain(writeToStream(process.stdout))
    .chainRej(writeToStream(process.stderr))
    .fork(console.error, x => x);

