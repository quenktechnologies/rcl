"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var os_1 = require("os");
var transforms_1 = require("./transforms");
var State_1 = require("afpl/lib/monad/State");
var Either_1 = require("afpl/lib/monad/Either");
/**
 * symbols creates the scope (symbol table) for the part of the program we are processing.
 * @param {State} [parent]
 * @returns {State<State>}
 */
exports.symbols = function () {
    return State_1.State.put({ parent: State_1.State.put(null), local: {} });
};
var flat = function (list) {
    return list.reduce(function (prev, curr) {
        return prev.concat(Array.isArray(curr) ? flat(curr) : curr);
    }, []);
};
var process = function (ast) { return function (outputEM) { return State_1.state(outputEM).chain(transforms_1.reduce(ast.statements)); }; };
/**
 * compile
 */
exports.compile = function (flags) {
    return function (ast) {
        return (flags['-t']) ?
            State_1.state(Either_1.right(JSON.stringify(ast))) :
            State_1.State
                .put({ ast: ast, flags: flags, errors: [], symbols: exports.symbols() })
                .map(function () { return Either_1.right([]); }) //set the outputW value, in future this could be a preamble
                .chain(process(ast))
                .chain(function (outputW) {
                return outputW.cata(function () {
                    return State_1.State
                        .get()
                        .map(function (_a) {
                        var errors = _a.errors;
                        return Either_1.left(errors.join(os_1.default.EOL));
                    });
                }, function (lines) {
                    return State_1.state(Either_1.right(lines.join(os_1.default.EOL)));
                });
            });
    };
};
//# sourceMappingURL=Compiler.js.map