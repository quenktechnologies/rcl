"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.tree = void 0;
/// <reference path='parser.d.ts' />
const parser = require("./parser");
const either_1 = require("@quenk/noni/lib/data/either");
const ast_1 = require("./ast");
/**
 * tree is a map of reference nodes that can be used during parsing.
 */
exports.tree = {
    File: ast_1.File, Include: ast_1.Include, Comment: ast_1.Comment, Set: ast_1.Set, Route: ast_1.Route, Pattern: ast_1.Pattern, View: ast_1.View, Tag: ast_1.Tag, ModuleMember: ast_1.ModuleMember,
    EnvVar: ast_1.EnvVar, FunctionCall: ast_1.FunctionCall, List: ast_1.List, Dict: ast_1.Dict, Pair: ast_1.Pair, StringLiteral: ast_1.StringLiteral, NumberLiteral: ast_1.NumberLiteral,
    BooleanLiteral: ast_1.BooleanLiteral, QualifiedIdentifier: ast_1.QualifiedIdentifier, Identifier: ast_1.Identifier
};
/**
 * parse source text into an abstract syntax tree.
 */
const parse = (str, ast) => {
    parser.parser.yy = { ast };
    try {
        return (0, either_1.right)(parser.parser.parse(str));
    }
    catch (e) {
        return (0, either_1.left)(e);
    }
};
exports.parse = parse;
//# sourceMappingURL=index.js.map