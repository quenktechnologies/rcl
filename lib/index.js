"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path='Parser.d.ts' />
var os = require("os");
var nodes = require("./Node");
var Parser = require("./Parser");
var Context = (function () {
    function Context() {
        this.symbols = {};
    }
    Context.prototype.add = function (id) {
        this.symbols[id] = "_" + id.toLowerCase();
        return this;
    };
    Context.prototype.has = function (id) {
        return (this.symbols[id]) ? true : false;
    };
    Context.prototype.get = function (id) {
        if (this.symbols[id])
            return this.symbols[id];
        throw new Error("No matching symbols for '" + id + "'! Symbols: " + JSON.stringify(this.symbols));
    };
    Context.prototype.toString = function () {
        var _this = this;
        return Object
            .keys(this.symbols)
            .map(function (s) { return "let " + _this.symbols[s] + " = new " + s + "();"; }).join(os.EOL);
    };
    return Context;
}());
exports.Context = Context;
exports.parse = function (str, ast) {
    if (ast === void 0) { ast = nodes; }
    Parser.parser.yy = { ast: ast };
    return Parser.parser.parse(str);
};
exports.code = function (n, ctx) {
    if (n instanceof nodes.File) {
        var imports = n.imports.map(function (i) { return exports.code(i, ctx); }).join(os.EOL);
        var routes = n.routes.map(function (r) { return exports.code(r, ctx); }).join(os.EOL);
        return imports + " " + os.EOL + os.EOL +
            "export const routes = <C>(_app:express.Application, " +
            ("_mod:tendril.app.Module<C>) => {" + os.EOL) +
            ("  " + ctx + " " + os.EOL + " " + routes + " " + os.EOL + " }");
    }
    else if (n instanceof nodes.MemberImport) {
        var members = n.members.map(function (m) { return exports.code(m, ctx); }).join(',');
        var module_1 = exports.code(n.module, ctx);
        return "import {" + members + "} from " + module_1;
    }
    else if (n instanceof nodes.QualifiedImport) {
        var module_2 = exports.code(n.module, ctx);
        var id = exports.code(n.id, ctx);
        return "import * as " + id + " from " + module_2;
    }
    else if (n instanceof nodes.Route) {
        var method = n.method.toLowerCase();
        var pattern = exports.code(n.pattern, ctx);
        var action = exports.code(n.action, ctx);
        var filters = n.filters.map(function (x) { return exports.code(x, ctx); }).join(',');
        return "_app." + method + "(" + pattern + ", (_req, _res) => {" +
            ("" + os.EOL + os.EOL + " ") +
            "  let _ctx = new tendril.app.actions.Context" +
            (" (_req, _res, [" + filters + "], " + action + ", _mod);" + os.EOL + " ") +
            ("  _ctx.next(); " + os.EOL + " ") +
            "})";
    }
    else if (n instanceof nodes.Pattern) {
        return "'" + n.value + "'";
    }
    else if (n instanceof nodes.Filter) {
        var target = exports.code(n.target, ctx);
        var args = void 0;
        if (n.args.length > 0)
            args = ['r'].concat(n.args.map(function (c) { return exports.code(c, ctx); })).join(',');
        else
            args = 'r';
        return "r=>" + target + "(" + args + ") ";
    }
    else if (n instanceof nodes.ControllerAction) {
        var target = exports.code(n.target, ctx);
        var member = exports.code(n.member, ctx);
        var args = void 0;
        if (n.args.length > 0)
            args = ['r'].concat(n.args.map(function (c) { return exports.code(c, ctx); })).join(',');
        else
            args = 'r';
        return (ctx.has(target)) ?
            "r=>" + ctx.get(target) + "." + member + " (" + args + ")" :
            "r=>" + ctx.add(target).get(target) + "." + member + " (" + args + ")";
    }
    else if (n instanceof nodes.ViewAction) {
        var view = exports.code(n.view, ctx);
        var c = (n.context) ? exports.code(n.context, ctx) : '';
        return " _r=> tendril.app.actions.render(" + view + (c ? ',' + c : '') + ") ";
    }
    else if (n instanceof nodes.MemberIdentifier) {
        return exports.code(n.target, ctx) + "." + exports.code(n.id, ctx) + " ";
    }
    else if (n instanceof nodes.List) {
        var members = n.members.map(function (x) { return exports.code(x, ctx); }).join(',');
        return "[" + members + "]";
    }
    else if (n instanceof nodes.Dict) {
        var properties = n.properties.map(function (x) { return exports.code(x, ctx); }).join(',');
        return "{ " + properties + " } ";
    }
    else if (n instanceof nodes.KVP) {
        var key = exports.code(n.key, ctx);
        var value = exports.code(n.value, ctx);
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
exports.compile = function (src) {
    return exports.code(exports.parse(src), new Context()) + " ";
};
//# sourceMappingURL=index.js.map