"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * File node.
 */
var File = /** @class */ (function () {
    function File(includes, imports, routes, location) {
        this.includes = includes;
        this.imports = imports;
        this.routes = routes;
        this.location = location;
        this.type = 'file';
    }
    return File;
}());
exports.File = File;
/**
 * Include node.
 */
var Include = /** @class */ (function () {
    function Include(path, location) {
        this.path = path;
        this.location = location;
        this.type = 'include';
    }
    return Include;
}());
exports.Include = Include;
/**
 * MemberImport node.
 */
var MemberImport = /** @class */ (function () {
    function MemberImport(members, module, location) {
        this.members = members;
        this.module = module;
        this.location = location;
        this.type = 'member-import';
    }
    return MemberImport;
}());
exports.MemberImport = MemberImport;
/**
 * QualifiedImport node.
 */
var QualifiedImport = /** @class */ (function () {
    function QualifiedImport(module, id, location) {
        this.module = module;
        this.id = id;
        this.location = location;
        this.type = 'qualified-import';
    }
    return QualifiedImport;
}());
exports.QualifiedImport = QualifiedImport;
/**
 * Comment node
 */
var Comment = /** @class */ (function () {
    function Comment(value, location) {
        this.value = value;
        this.location = location;
        this.type = 'comment';
    }
    return Comment;
}());
exports.Comment = Comment;
/**
 * Route node.
 */
var Route = /** @class */ (function () {
    function Route(method, pattern, filters, view, location) {
        this.method = method;
        this.pattern = pattern;
        this.filters = filters;
        this.view = view;
        this.location = location;
        this.type = 'route';
    }
    return Route;
}());
exports.Route = Route;
/**
 * Pattern node.
 */
var Pattern = /** @class */ (function () {
    function Pattern(value, location) {
        this.value = value;
        this.location = location;
        this.type = 'pattern';
    }
    return Pattern;
}());
exports.Pattern = Pattern;
/**
 * Filter node.
 */
var Filter = /** @class */ (function () {
    function Filter(value, args, invoked, location) {
        this.value = value;
        this.args = args;
        this.invoked = invoked;
        this.location = location;
        this.type = 'filter';
    }
    return Filter;
}());
exports.Filter = Filter;
/**
 * View node.
 */
var View = /** @class */ (function () {
    function View(view, context, location) {
        this.view = view;
        this.context = context;
        this.location = location;
        this.type = 'view';
    }
    return View;
}());
exports.View = View;
/**
 * List node.
 */
var List = /** @class */ (function () {
    function List(members, location) {
        this.members = members;
        this.location = location;
        this.type = 'list';
    }
    return List;
}());
exports.List = List;
/**
 * Dict node.
 */
var Dict = /** @class */ (function () {
    function Dict(properties, location) {
        this.properties = properties;
        this.location = location;
        this.type = 'dict';
    }
    return Dict;
}());
exports.Dict = Dict;
/**
 * Pair node.
 */
var Pair = /** @class */ (function () {
    function Pair(key, value, location) {
        this.key = key;
        this.value = value;
        this.location = location;
        this.type = 'pair';
    }
    return Pair;
}());
exports.Pair = Pair;
/**
 * StringLiteral node.
 */
var StringLiteral = /** @class */ (function () {
    function StringLiteral(value, location) {
        this.value = value;
        this.location = location;
        this.type = 'string-literal';
    }
    return StringLiteral;
}());
exports.StringLiteral = StringLiteral;
/**
 * BooleanLiteral node.
 */
var BooleanLiteral = /** @class */ (function () {
    function BooleanLiteral(value, location) {
        this.value = value;
        this.location = location;
        this.type = 'boolean-literal';
    }
    return BooleanLiteral;
}());
exports.BooleanLiteral = BooleanLiteral;
/**
 * NumberLiteral node.
 */
var NumberLiteral = /** @class */ (function () {
    function NumberLiteral(value, location) {
        this.value = value;
        this.location = location;
        this.type = 'number-literal';
    }
    return NumberLiteral;
}());
exports.NumberLiteral = NumberLiteral;
/**
 * EnvVar node.
 */
var EnvVar = /** @class */ (function () {
    function EnvVar(key, location) {
        this.key = key;
        this.location = location;
        this.type = 'envvar';
    }
    return EnvVar;
}());
exports.EnvVar = EnvVar;
/**
 * QualifiedIdentifier node.
 */
var QualifiedIdentifier = /** @class */ (function () {
    function QualifiedIdentifier(path, location) {
        this.path = path;
        this.location = location;
        this.type = 'qualified-identifier';
    }
    return QualifiedIdentifier;
}());
exports.QualifiedIdentifier = QualifiedIdentifier;
/**
 * Identifier node.
 */
var Identifier = /** @class */ (function () {
    function Identifier(value, location) {
        this.value = value;
        this.location = location;
        this.type = 'identifier';
    }
    return Identifier;
}());
exports.Identifier = Identifier;
//# sourceMappingURL=ast.js.map