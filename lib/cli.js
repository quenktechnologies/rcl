"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
var docopt = require("docopt");
var fs = require("fs");
var os = require("os");
var path_1 = require("path");
var fluture_1 = require("fluture");
var Parser_1 = require("./Parser");
//typescript complains if we try to import this
//the output of jison does not play nicely with our current tsconfig settings.
var parse = require('./Parser').parse;
var getFileContents = function (path) {
    return fluture_1.Future.node(function (done) { return fs.readFile(path, { encoding: 'utf8' }, done); });
};
var writeToStream = function (stream) { return function (contents) {
    return fluture_1.Future.node(function (done) { return stream.write("" + contents + os.EOL, 'utf8', done); });
}; };
var getOutStream = function (args) {
    return args['--stdout'] ?
        process.stdout :
        fs.createWriteStream(getFileName(args['<file>']) + "." + (args['--ext'] || 'jsc'));
};
var getFileName = function (file) {
    return path_1.dirname(file) + "/" + path_1.basename(file, path_1.extname(file));
};
var args = docopt.docopt("\n\nUsage:\n  jcon [options] <file>\n\nOptions:\n  -h --help     Show this screen.\n  --version     Show jcon version.\n  --ast         Output only the Abstract Syntax Tree (AST) as JSON.\n  --ext=EXT     The extension to use when writing files directly. \n  --stdout      Use STDOUT.\n", { version: require('../package.json').version });
getFileContents(args['<file>'])
    .map(Parser_1.parse)
    .map(function (ast) { return args['--ast'] ? JSON.stringify(ast) : ast; })
    .chain(writeToStream(getOutStream(args)))
    .chainRej(writeToStream(process.stderr))
    .fork(console.error, function (x) { return x; });
//# sourceMappingURL=cli.js.map