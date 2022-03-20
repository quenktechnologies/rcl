"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Identifier = exports.QualifiedIdentifier = exports.EnvVar = exports.BooleanLiteral = exports.NumberLiteral = exports.StringLiteral = exports.Pair = exports.Dict = exports.List = exports.ModuleMember = exports.FunctionCall = exports.Tag = exports.View = exports.Pattern = exports.Route = exports.Set = exports.Comment = exports.Include = exports.File = void 0;
/**
 * File node.
 */
class File {
    constructor(body, location) {
        this.body = body;
        this.location = location;
        this.type = 'file';
    }
}
exports.File = File;
/**
 * Include node.
 */
class Include {
    constructor(path, location) {
        this.path = path;
        this.location = location;
        this.type = 'include';
    }
}
exports.Include = Include;
/**
 * Comment node
 */
class Comment {
    constructor(value, location) {
        this.value = value;
        this.location = location;
        this.type = 'comment';
    }
}
exports.Comment = Comment;
class Set {
    constructor(id, value, location) {
        this.id = id;
        this.value = value;
        this.location = location;
        this.type = 'set';
    }
}
exports.Set = Set;
/**
 * Route node.
 */
class Route {
    constructor(method, pattern, filters, view, tags, location) {
        this.method = method;
        this.pattern = pattern;
        this.filters = filters;
        this.view = view;
        this.tags = tags;
        this.location = location;
        this.type = 'route';
    }
}
exports.Route = Route;
/**
 * Pattern node.
 */
class Pattern {
    constructor(value, location) {
        this.value = value;
        this.location = location;
        this.type = 'pattern';
    }
}
exports.Pattern = Pattern;
/**
 * View node.
 */
class View {
    constructor(view, context, location) {
        this.view = view;
        this.context = context;
        this.location = location;
        this.type = 'view';
    }
}
exports.View = View;
/**
 * Tag node.
 */
class Tag {
    constructor(name, value, location) {
        this.name = name;
        this.value = value;
        this.location = location;
        this.type = 'tag';
    }
}
exports.Tag = Tag;
/**
 * FunctionCall node.
 */
class FunctionCall {
    constructor(id, args, location) {
        this.id = id;
        this.args = args;
        this.location = location;
        this.type = 'function-call';
    }
}
exports.FunctionCall = FunctionCall;
/**
 * ModuleMember node.
 */
class ModuleMember {
    constructor(module, member, location) {
        this.module = module;
        this.member = member;
        this.location = location;
        this.type = 'module-member';
    }
}
exports.ModuleMember = ModuleMember;
/**
 * List node.
 */
class List {
    constructor(elements, location) {
        this.elements = elements;
        this.location = location;
        this.type = 'list';
    }
}
exports.List = List;
/**
 * Dict node.
 */
class Dict {
    constructor(properties, location) {
        this.properties = properties;
        this.location = location;
        this.type = 'dict';
    }
}
exports.Dict = Dict;
/**
 * Pair node.
 */
class Pair {
    constructor(key, value, location) {
        this.key = key;
        this.value = value;
        this.location = location;
        this.type = 'pair';
    }
}
exports.Pair = Pair;
/**
 * StringLiteral node.
 */
class StringLiteral {
    constructor(value, location) {
        this.value = value;
        this.location = location;
        this.type = 'string-literal';
    }
}
exports.StringLiteral = StringLiteral;
/**
 * NumberLiteral node.
 */
class NumberLiteral {
    constructor(value, location) {
        this.value = value;
        this.location = location;
        this.type = 'number-literal';
    }
}
exports.NumberLiteral = NumberLiteral;
/**
 * BooleanLiteral node.
 */
class BooleanLiteral {
    constructor(value, location) {
        this.value = value;
        this.location = location;
        this.type = 'boolean-literal';
    }
}
exports.BooleanLiteral = BooleanLiteral;
/**
 * EnvVar node.
 */
class EnvVar {
    constructor(key, location) {
        this.key = key;
        this.location = location;
        this.type = 'envvar';
    }
}
exports.EnvVar = EnvVar;
/**
 * QualifiedIdentifier node.
 */
class QualifiedIdentifier {
    constructor(path, location) {
        this.path = path;
        this.location = location;
        this.type = 'qualified-identifier';
    }
}
exports.QualifiedIdentifier = QualifiedIdentifier;
/**
 * Identifier node.
 */
class Identifier {
    constructor(value, location) {
        this.value = value;
        this.location = location;
        this.type = 'identifier';
    }
}
exports.Identifier = Identifier;
//# sourceMappingURL=ast.js.map