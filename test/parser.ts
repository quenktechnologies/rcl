import * as must from 'must';
import * as fs from 'fs';
import { dirname, basename, extname } from 'path';
import { parse } from 'jcon/Parser';
import { Either, left, right } from 'afpl/monad/Either';
import { Monad } from 'afpl/monad/Monad';
import * as Fluture from 'fluture';

interface Future<A> extends Monad<A> {

    fork<B, C>(l: (e: Error) => B, r: (a: A) => C);

}

const testDir = <A>(dir: string): Future<A> =>
    <Future<A>><any>ls(dir)
        .chain(files => launchTests(dir, files));

const ls = (dir: string): Future<string[]> => Fluture.node(cb => fs.readdir(dir, cb));

const launchTests = <A>(dir: string, files: string[]): Future<Array<Future<A>>> =>
    Fluture
        .parallel(Infinity, files.map(f =>
            fileType(`${dir}/${f}`)
                .chain(testOrRecurse)));

const fileType = (path: string): Future<Either<string, string>> =>
    Fluture
        .node(cb => fs.stat(path, cb))
        .map(stat => (stat.isDirectory()) ? left(path) : right(path))

const testOrRecurse = <A>(e: Either<string, string>): Future<A> =>
    e.cata(testDir, runTest);

const runTest = <A>(file: string): Future<A> =>
    (extname(file) === '.jcon') ?
        getFileContents(file)
            .map(parse)
            .map(JSON.stringify)
            .map(JSON.parse)
            .chain(actual =>
                getFileContents(astFilePath(file))
                    .map(JSON.parse)
                    .map(ast => compare(actual, ast)))
        : Fluture.of();

const astFilePath = (file: string): string =>
    `${dirname(file)}/${basename(file, extname(file))}.json`;

const getFileContents = path =>
    Fluture.node(done =>
        fs.readFile(path, { encoding: 'utf8' }, done));

const compare = (tit, tat) => must(tit).eql(tat);

describe('jcon', () =>
    it('should parse ', done => testDir(`${__dirname}/syntax`).fork(done, () => done())));
