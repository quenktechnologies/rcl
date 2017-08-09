"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path='Parser.d.ts' />
var os = require("os");
var nodes = require("./Node");
var afpl_1 = require("afpl");
var Parser = require("./Parser");
var Variable = (function () {
    function Variable(id) {
        this.id = id;
    }
    return Variable;
}());
exports.Variable = Variable;
exports.parse = function (str, ast) {
    if (ast === void 0) { ast = nodes; }
    Parser.parser.yy = { ast: ast };
    return Parser.parser.parse(str);
};
exports.code = function (n) {
    if (n instanceof nodes.File) {
        var imports = n.imports.map(exports.code).join(os.EOL);
        var routes = n.routes.map(exports.code).join(os.EOL);
        return imports + " " + os.EOL + os.EOL +
            "export const routes = (app:$$runtime.Application) => (mod:$$runtime.Module) =>" +
            ("{ " + os.EOL + " _doNext = $$runtime.doNext(app, mod); " + os.EOL + " ") +
            (routes + " " + os.EOL + " }");
    }
    else if (n instanceof nodes.MemberImport) {
        var members = n.members.map(exports.code).join(',');
        var module_1 = exports.code(n.module);
        return "import {" + members + "} from " + module_1;
    }
    else if (n instanceof nodes.QualifiedImport) {
        var module_2 = exports.code(n.module);
        var id = exports.code(n.id);
        return "import * as " + id + " from " + module_2;
    }
    else if (n instanceof nodes.Route) {
        var method = n.method.toLowerCase();
        var pattern = exports.code(n.pattern);
        var filters = n.filters.map(exports.code);
        return "eApp." + method + "(" + pattern + ", (req, res, next) => { " + os.EOL +
            ("  Promise" + os.EOL) +
            ("  .resolve(new $$runtime.Continuation($$runtime.Request.fromFramework(req)))" + os.EOL) +
            ("  " + filters.join('  ')) +
            ("  .catch(e=>mod.onError(e))" + os.EOL) +
            ("  .catch(e=>app.onError(e));" + os.EOL) +
            "})";
    }
    else if (n instanceof nodes.Pattern) {
        return "'" + n.value + "'";
    }
    else if (n instanceof nodes.CurriedFilter) {
        var target = exports.code(n.target);
        var args = (n.args.length > 0) ? n.args.map(exports.code).join(',') : '';
        return ".then(_doNext(" + target + ", " + (args ? '{' + args + '}' : null) + "))";
    }
    else if (n instanceof nodes.RenderFilter) {
        var view = exports.code(n.view);
        return ".then(_doNext(() => " +
            " Promise" +
            (" .try(() => res.render(" + view + ")) ") +
            (" .then(() => new End())))" + os.EOL + " ");
    }
    else if (n instanceof nodes.MemberIdentifier) {
        return exports.code(n.target) + "." + exports.code(n.id) + " ";
    }
    else if (n instanceof nodes.List) {
        var members = n.members.map(exports.code).join(',');
        return "[" + members + "]";
    }
    else if (n instanceof nodes.Dict) {
        var properties = n.properties.map(exports.code).join(',');
        return "{ " + properties + " } ";
    }
    else if (n instanceof nodes.KVP) {
        var key = exports.code(n.key);
        var value = exports.code(n.value);
        return key + " : " + value + " ";
    }
    else if (n instanceof nodes.StringLiteral) {
        return "'" + n.value + "'";
    }
    else if (n instanceof nodes.BooleanLiteral) {
        return n.value;
    }
    else if (n instanceof nodes.NumberLiteral) {
        return n.value;
    }
    else if (n instanceof nodes.Identifier) {
        return n.value;
    }
    else {
        throw new TypeError("Unexpected type " + typeof n + ", '" + n + "'!");
    }
};
var defaults = { runtime: 'tendril' };
exports.compile = function (src, options) {
    var opts = Object.assign({}, defaults, options);
    try {
        return afpl_1.Either.right("import * as $$runtime from '" + opts.runtime + "'; " + os.EOL + " " +
            (exports.code(exports.parse(src)) + " "));
    }
    catch (e) {
        return afpl_1.Either.left(e);
    }
};
//# sourceMappingURL=index.js.map