"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path='parser.d.ts' />
var parser = require("./parser");
var either_1 = require("@quenk/noni/lib/data/either");
var ast_1 = require("./ast");
/**
 * tree is a map of reference nodes that can be used during parsing.
 */
exports.tree = {
    File: ast_1.File, Include: ast_1.Include, MemberImport: ast_1.MemberImport, QualifiedImport: ast_1.QualifiedImport,
    Comment: ast_1.Comment, Route: ast_1.Route, Pattern: ast_1.Pattern, Filter: ast_1.Filter, View: ast_1.View, EnvVar: ast_1.EnvVar, List: ast_1.List, Dict: ast_1.Dict, Pair: ast_1.Pair,
    StringLiteral: ast_1.StringLiteral, NumberLiteral: ast_1.NumberLiteral, BooleanLiteral: ast_1.BooleanLiteral, QualifiedIdentifier: ast_1.QualifiedIdentifier,
    UnqualifiedIdentifier: ast_1.UnqualifiedIdentifier
};
/**
 * parse source text into an abstract syntax tree.
 */
exports.parse = function (str, ast) {
    parser.parser.yy = { ast: ast };
    try {
        return either_1.right(parser.parser.parse(str));
    }
    catch (e) {
        return either_1.left(e);
    }
};
//# sourceMappingURL=index.js.map