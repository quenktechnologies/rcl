"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
var File = (function () {
    function File(imports, routes, location) {
        this.imports = imports;
        this.routes = routes;
        this.location = location;
        this.type = 'file';
    }
    return File;
}());
exports.File = File;
var MemberImport = (function () {
    function MemberImport(members, module, location) {
        this.members = members;
        this.module = module;
        this.location = location;
        this.type = 'member-import';
    }
    return MemberImport;
}());
exports.MemberImport = MemberImport;
var QualifiedImport = (function () {
    function QualifiedImport(module, id, location) {
        this.module = module;
        this.id = id;
        this.location = location;
        this.type = 'qualified-import';
    }
    return QualifiedImport;
}());
exports.QualifiedImport = QualifiedImport;
var Route = (function () {
    function Route(method, pattern, filters, location) {
        this.method = method;
        this.pattern = pattern;
        this.filters = filters;
        this.location = location;
        this.type = 'route';
    }
    return Route;
}());
exports.Route = Route;
var Pattern = (function () {
    function Pattern(value, location) {
        this.value = value;
        this.location = location;
        this.type = 'pattern';
    }
    return Pattern;
}());
exports.Pattern = Pattern;
var CurriedFilter = (function () {
    function CurriedFilter(target, args, location) {
        this.target = target;
        this.args = args;
        this.location = location;
        this.type = 'curried-filter';
    }
    return CurriedFilter;
}());
exports.CurriedFilter = CurriedFilter;
var RenderFilter = (function () {
    function RenderFilter(view, location) {
        this.view = view;
        this.location = location;
        this.type = 'render-filter';
    }
    return RenderFilter;
}());
exports.RenderFilter = RenderFilter;
var MemberIdentifier = (function () {
    function MemberIdentifier(target, id, location) {
        this.target = target;
        this.id = id;
        this.location = location;
        this.type = 'member-identifier';
    }
    return MemberIdentifier;
}());
exports.MemberIdentifier = MemberIdentifier;
var List = (function () {
    function List(members, location) {
        this.members = members;
        this.location = location;
        this.type = 'list';
    }
    return List;
}());
exports.List = List;
var Dict = (function () {
    function Dict(properties, location) {
        this.properties = properties;
        this.location = location;
        this.type = 'dict';
    }
    return Dict;
}());
exports.Dict = Dict;
var KVP = (function () {
    function KVP(key, value, location) {
        this.key = key;
        this.value = value;
        this.location = location;
        this.type = 'kvp';
    }
    return KVP;
}());
exports.KVP = KVP;
var StringLiteral = (function () {
    function StringLiteral(value, location) {
        this.value = value;
        this.location = location;
        this.type = 'string';
    }
    return StringLiteral;
}());
exports.StringLiteral = StringLiteral;
var BooleanLiteral = (function () {
    function BooleanLiteral(value, location) {
        this.value = value;
        this.location = location;
        this.type = 'boolean-literal';
    }
    return BooleanLiteral;
}());
exports.BooleanLiteral = BooleanLiteral;
var NumberLiteral = (function () {
    function NumberLiteral(value, location) {
        this.value = value;
        this.location = location;
        this.type = 'number-literal';
    }
    return NumberLiteral;
}());
exports.NumberLiteral = NumberLiteral;
var Identifier = (function () {
    function Identifier(value, location) {
        this.value = value;
        this.location = location;
        this.type = 'identifier';
    }
    return Identifier;
}());
exports.Identifier = Identifier;
//# sourceMappingURL=Node.js.map