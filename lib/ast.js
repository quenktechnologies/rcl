"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * File node.
 */
var File = /** @class */ (function () {
    function File(body, location) {
        this.body = body;
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
var Set = /** @class */ (function () {
    function Set(id, value, location) {
        this.id = id;
        this.value = value;
        this.location = location;
        this.type = 'set';
    }
    return Set;
}());
exports.Set = Set;
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
 * FunctionCall node.
 */
var FunctionCall = /** @class */ (function () {
    function FunctionCall(id, args, location) {
        this.id = id;
        this.args = args;
        this.location = location;
        this.type = 'function-call';
    }
    return FunctionCall;
}());
exports.FunctionCall = FunctionCall;
/**
 * ModuleMember node.
 */
var ModuleMember = /** @class */ (function () {
    function ModuleMember(module, member, location) {
        this.module = module;
        this.member = member;
        this.location = location;
        this.type = 'module-member';
    }
    return ModuleMember;
}());
exports.ModuleMember = ModuleMember;
/**
 * List node.
 */
var List = /** @class */ (function () {
    function List(elements, location) {
        this.elements = elements;
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