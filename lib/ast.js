"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Node represents a member of the lang's AST.
 */
var Node = /** @class */ (function () {
    function Node(type, location) {
        this.type = type;
        this.location = location;
    }
    return Node;
}());
exports.Node = Node;
/**
 * File node.
 *
 * Contents of source text.
 */
var File = /** @class */ (function (_super) {
    __extends(File, _super);
    function File(includes, imports, routes, location) {
        var _this = _super.call(this, 'file', location) || this;
        _this.includes = includes;
        _this.imports = imports;
        _this.routes = routes;
        _this.location = location;
        return _this;
    }
    return File;
}(Node));
exports.File = File;
/**
 * Include node.
 */
var Include = /** @class */ (function (_super) {
    __extends(Include, _super);
    function Include(path, location) {
        var _this = _super.call(this, 'include', location) || this;
        _this.path = path;
        _this.location = location;
        return _this;
    }
    return Include;
}(Node));
exports.Include = Include;
/**
 * MemberImport node.
 */
var MemberImport = /** @class */ (function (_super) {
    __extends(MemberImport, _super);
    function MemberImport(members, module, location) {
        var _this = _super.call(this, 'member-import', location) || this;
        _this.members = members;
        _this.module = module;
        _this.location = location;
        return _this;
    }
    return MemberImport;
}(Node));
exports.MemberImport = MemberImport;
/**
 * QualifiedImport node.
 */
var QualifiedImport = /** @class */ (function (_super) {
    __extends(QualifiedImport, _super);
    function QualifiedImport(module, id, location) {
        var _this = _super.call(this, 'qualified-import', location) || this;
        _this.module = module;
        _this.id = id;
        _this.location = location;
        return _this;
    }
    return QualifiedImport;
}(Node));
exports.QualifiedImport = QualifiedImport;
/**
 * Comment node
 */
var Comment = /** @class */ (function (_super) {
    __extends(Comment, _super);
    function Comment(value, location) {
        var _this = _super.call(this, 'comment', location) || this;
        _this.value = value;
        return _this;
    }
    return Comment;
}(Node));
exports.Comment = Comment;
/**
 * Route node.
 */
var Route = /** @class */ (function (_super) {
    __extends(Route, _super);
    function Route(method, pattern, filters, view, location) {
        var _this = _super.call(this, 'route', location) || this;
        _this.method = method;
        _this.pattern = pattern;
        _this.filters = filters;
        _this.view = view;
        _this.location = location;
        return _this;
    }
    return Route;
}(Node));
exports.Route = Route;
/**
 * Pattern node.
 */
var Pattern = /** @class */ (function (_super) {
    __extends(Pattern, _super);
    function Pattern(value, location) {
        var _this = _super.call(this, 'pattern', location) || this;
        _this.value = value;
        _this.location = location;
        return _this;
    }
    return Pattern;
}(Node));
exports.Pattern = Pattern;
/**
 * Filter node.
 */
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter(value, args, invoked, location) {
        var _this = _super.call(this, 'filter', location) || this;
        _this.value = value;
        _this.args = args;
        _this.invoked = invoked;
        _this.location = location;
        return _this;
    }
    return Filter;
}(Node));
exports.Filter = Filter;
/**
 * View node.
 */
var View = /** @class */ (function (_super) {
    __extends(View, _super);
    function View(view, context, location) {
        var _this = _super.call(this, 'view', location) || this;
        _this.view = view;
        _this.context = context;
        _this.location = location;
        return _this;
    }
    return View;
}(Node));
exports.View = View;
/**
 * List node.
 */
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List(members, location) {
        var _this = _super.call(this, 'list', location) || this;
        _this.members = members;
        _this.location = location;
        return _this;
    }
    return List;
}(Node));
exports.List = List;
/**
 * Dict node.
 */
var Dict = /** @class */ (function (_super) {
    __extends(Dict, _super);
    function Dict(properties, location) {
        var _this = _super.call(this, 'dict', location) || this;
        _this.properties = properties;
        _this.location = location;
        return _this;
    }
    return Dict;
}(Node));
exports.Dict = Dict;
/**
 * Pair node.
 */
var Pair = /** @class */ (function (_super) {
    __extends(Pair, _super);
    function Pair(key, value, location) {
        var _this = _super.call(this, 'pair', location) || this;
        _this.key = key;
        _this.value = value;
        _this.location = location;
        return _this;
    }
    return Pair;
}(Node));
exports.Pair = Pair;
/**
 * StringLiteral node.
 */
var StringLiteral = /** @class */ (function (_super) {
    __extends(StringLiteral, _super);
    function StringLiteral(value, location) {
        var _this = _super.call(this, 'string-literal', location) || this;
        _this.value = value;
        _this.location = location;
        return _this;
    }
    return StringLiteral;
}(Node));
exports.StringLiteral = StringLiteral;
/**
 * BooleanLiteral node.
 */
var BooleanLiteral = /** @class */ (function (_super) {
    __extends(BooleanLiteral, _super);
    function BooleanLiteral(value, location) {
        var _this = _super.call(this, 'boolean-literal', location) || this;
        _this.value = value;
        _this.location = location;
        return _this;
    }
    return BooleanLiteral;
}(Node));
exports.BooleanLiteral = BooleanLiteral;
/**
 * NumberLiteral node.
 */
var NumberLiteral = /** @class */ (function (_super) {
    __extends(NumberLiteral, _super);
    function NumberLiteral(value, location) {
        var _this = _super.call(this, 'number-literal', location) || this;
        _this.value = value;
        _this.location = location;
        return _this;
    }
    return NumberLiteral;
}(Node));
exports.NumberLiteral = NumberLiteral;
/**
 * EnvVar node.
 */
var EnvVar = /** @class */ (function (_super) {
    __extends(EnvVar, _super);
    function EnvVar(key, location) {
        var _this = _super.call(this, 'envar', location) || this;
        _this.key = key;
        return _this;
    }
    return EnvVar;
}(Node));
exports.EnvVar = EnvVar;
/**
 * QualifiedIdentifier node.
 */
var QualifiedIdentifier = /** @class */ (function (_super) {
    __extends(QualifiedIdentifier, _super);
    function QualifiedIdentifier(path, location) {
        var _this = _super.call(this, 'qualified-identifier', location) || this;
        _this.path = path;
        _this.location = location;
        return _this;
    }
    return QualifiedIdentifier;
}(Node));
exports.QualifiedIdentifier = QualifiedIdentifier;
/**
 * Identifier node.
 */
var Identifier = /** @class */ (function (_super) {
    __extends(Identifier, _super);
    function Identifier(value, location) {
        var _this = _super.call(this, 'identifier', location) || this;
        _this.value = value;
        _this.location = location;
        return _this;
    }
    return Identifier;
}(Node));
exports.Identifier = Identifier;
//# sourceMappingURL=ast.js.map