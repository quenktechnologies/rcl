#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
var docopt = require("docopt");
var fs = require("fs");
var os = require("os");
var fluture_1 = require("fluture");
var Parser_1 = require("./Parser");
//typescript complains if we try to import this
//the output of jison does not play nicely with our current tsconfig settings.
var parse = require('./Parser').parse;
var getFileContents = function (path) {
    return fluture_1.default.node(function (done) { return fs.readFile(path, { encoding: 'utf8' }, done); });
};
var writeToStream = function (stream) { return function (contents) {
    return fluture_1.default.node(function (done) { return stream.write("" + contents + os.EOL, 'utf8', done); });
}; };
var args = docopt.docopt("\n\nJCON.\n\nUsage: jcon [options] <file>\n\nOptions:\n  -h --help     Show this screen.\n  --version     Show jcon version.\n  --ast         Output only the Abstract Syntax Tree (AST) in JSON.\n", { version: require('../package.json').version });
getFileContents(args['<file>'])
    .map(Parser_1.parse)
    .chain(writeToStream(process.stdout))
    .chainRej(writeToStream(process.stderr))
    .fork(console.error, function (x) { return x; });
//# sourceMappingURL=index.js.map