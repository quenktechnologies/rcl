/**
 * AbstractSyntaxTree
 */
export interface AbstractSyntaxTree {
    [key: string]: Node;
}
/**
 * Location within source text.
 */
export interface Location {
    [key: string]: string | number;
}
/**
 * Node represents a member of the lang's AST.
 */
export declare abstract class Node {
    type: string;
    location: Location;
    constructor(type: string, location: Location);
}
/**
 * File node.
 *
 * Contents of source text.
 */
export declare class File extends Node {
    includes: Include[];
    imports: Import[];
    routes: Route | Comment[];
    location: Location;
    constructor(includes: Include[], imports: Import[], routes: Route | Comment[], location: Location);
}
/**
 * Include node.
 */
export declare class Include extends Node {
    path: string;
    location: Location;
    constructor(path: string, location: Location);
}
/**
 * Import types.
 */
export declare type Import = MemberImport | QualifiedImport;
/**
 * MemberImport node.
 */
export declare class MemberImport extends Node {
    members: Identifier[];
    module: StringLiteral;
    location: Location;
    constructor(members: Identifier[], module: StringLiteral, location: Location);
}
/**
 * QualifiedImport node.
 */
export declare class QualifiedImport extends Node {
    module: StringLiteral;
    id: Identifier;
    location: Location;
    constructor(module: StringLiteral, id: Identifier, location: Location);
}
/**
 * Comment node
 */
export declare class Comment extends Node {
    value: string;
    constructor(value: string, location: Location);
}
/**
 * Route node.
 */
export declare class Route extends Node {
    method: Method;
    pattern: Pattern;
    filters: Filter[];
    view: View;
    location: Location;
    constructor(method: Method, pattern: Pattern, filters: Filter[], view: View, location: Location);
}
/**
 * Method (http) supported.
 */
export declare type Method = 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE';
/**
 * Pattern node.
 */
export declare class Pattern extends Node {
    value: string;
    location: Location;
    constructor(value: string, location: Location);
}
/**
 * Filter node.
 */
export declare class Filter extends Node {
    value: Identifier | QualifiedIdentifier;
    args: Value[];
    invoked: boolean;
    location: Location;
    constructor(value: Identifier | QualifiedIdentifier, args: Value[], invoked: boolean, location: Location);
}
/**
 * View node.
 */
export declare class View extends Node {
    view: StringLiteral;
    context: Dict | null;
    location: Location;
    constructor(view: StringLiteral, context: Dict | null, location: Location);
}
/**
 * Value types.
 */
export declare type Value = List | Dict | StringLiteral | NumberLiteral | BooleanLiteral | QualifiedIdentifier | Identifier;
/**
 * List node.
 */
export declare class List extends Node {
    members: Value[];
    location: Location;
    constructor(members: Value[], location: Location);
}
/**
 * Dict node.
 */
export declare class Dict extends Node {
    properties: Pair[];
    location: Location;
    constructor(properties: Pair[], location: Location);
}
/**
 * Pair node.
 */
export declare class Pair extends Node {
    key: Identifier;
    value: Value;
    location: Location;
    constructor(key: Identifier, value: Value, location: Location);
}
/**
 * StringLiteral node.
 */
export declare class StringLiteral extends Node {
    value: string;
    location: Location;
    constructor(value: string, location: Location);
}
/**
 * BooleanLiteral node.
 */
export declare class BooleanLiteral extends Node {
    value: string;
    location: Location;
    constructor(value: string, location: Location);
}
/**
 * NumberLiteral node.
 */
export declare class NumberLiteral extends Node {
    value: string;
    location: Location;
    constructor(value: string, location: Location);
}
/**
 * EnvVar node.
 */
export declare class EnvVar extends Node {
    key: string;
    constructor(key: string, location: Location);
}
/**
 * QualifiedIdentifier node.
 */
export declare class QualifiedIdentifier extends Node {
    path: Identifier;
    location: Location;
    constructor(path: Identifier, location: Location);
}
/**
 * Identifier node.
 */
export declare class Identifier extends Node {
    value: string;
    location: Location;
    constructor(value: string, location: Location);
}
