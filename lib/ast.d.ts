/**
 * Nodes map.
 */
export interface Nodes {
    [key: string]: Constructor;
}
/**
 * Constructor function for a generic node.
 */
export interface Constructor {
    new (...p: any[]): Node;
}
/**
 * Location within source text.
 */
export interface Location {
    [key: string]: string | number;
}
/**
 * Node is the common interface all members of the AST implement.
 */
export interface Node {
    /**
     * type of the Node.
     */
    type: string;
    /**
     * location in the source text where the node was parsed from.
     */
    location: Location;
}
/**
 * File node.
 */
export declare class File implements Node {
    includes: Include[];
    imports: Import[];
    routes: Route[] | Comment[];
    location: Location;
    type: string;
    constructor(includes: Include[], imports: Import[], routes: Route[] | Comment[], location: Location);
}
/**
 * Include node.
 */
export declare class Include implements Node {
    path: string;
    location: Location;
    type: string;
    constructor(path: string, location: Location);
}
/**
 * Import types.
 */
export declare type Import = MemberImport | QualifiedImport;
/**
 * MemberImport node.
 */
export declare class MemberImport implements Node {
    members: UnqualifiedIdentifier[];
    module: StringLiteral;
    location: Location;
    type: string;
    constructor(members: UnqualifiedIdentifier[], module: StringLiteral, location: Location);
}
/**
 * QualifiedImport node.
 */
export declare class QualifiedImport implements Node {
    module: StringLiteral;
    id: UnqualifiedIdentifier;
    location: Location;
    type: string;
    constructor(module: StringLiteral, id: UnqualifiedIdentifier, location: Location);
}
/**
 * Comment node
 */
export declare class Comment implements Node {
    value: string;
    location: Location;
    type: string;
    constructor(value: string, location: Location);
}
/**
 * Route node.
 */
export declare class Route implements Node {
    method: Method;
    pattern: Pattern;
    filters: Filter[];
    view: View;
    location: Location;
    type: string;
    constructor(method: Method, pattern: Pattern, filters: Filter[], view: View, location: Location);
}
/**
 * Method (http) supported.
 */
export declare type Method = 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE';
/**
 * Pattern node.
 */
export declare class Pattern implements Node {
    value: string;
    location: Location;
    type: string;
    constructor(value: string, location: Location);
}
/**
 * Filter node.
 */
export declare class Filter implements Node {
    value: Identifier;
    args: Value[];
    invoked: boolean;
    location: Location;
    type: string;
    constructor(value: Identifier, args: Value[], invoked: boolean, location: Location);
}
/**
 * View node.
 */
export declare class View implements Node {
    view: StringLiteral;
    context: Dict | null;
    location: Location;
    type: string;
    constructor(view: StringLiteral, context: Dict | null, location: Location);
}
/**
 * Value types.
 */
export declare type Value = List | Dict | Literal | Identifier;
/**
 * List node.
 */
export declare class List implements Node {
    elements: Value[];
    location: Location;
    type: string;
    constructor(elements: Value[], location: Location);
}
/**
 * Dict node.
 */
export declare class Dict implements Node {
    properties: Pair[];
    location: Location;
    type: string;
    constructor(properties: Pair[], location: Location);
}
/**
 * Pair node.
 */
export declare class Pair implements Node {
    key: Identifier;
    value: Value;
    location: Location;
    type: string;
    constructor(key: Identifier, value: Value, location: Location);
}
/**
 * Literal types.
 */
export declare type Literal = StringLiteral | NumberLiteral | BooleanLiteral;
/**
 * StringLiteral node.
 */
export declare class StringLiteral implements Node {
    value: string;
    location: Location;
    type: string;
    constructor(value: string, location: Location);
}
/**
 * NumberLiteral node.
 */
export declare class NumberLiteral implements Node {
    value: string;
    location: Location;
    type: string;
    constructor(value: string, location: Location);
}
/**
 * BooleanLiteral node.
 */
export declare class BooleanLiteral implements Node {
    value: string;
    location: Location;
    type: string;
    constructor(value: string, location: Location);
}
/**
 * EnvVar node.
 */
export declare class EnvVar implements Node {
    key: Identifier;
    location: Location;
    type: string;
    constructor(key: Identifier, location: Location);
}
/**
 * Identifier type.
 */
export declare type Identifier = QualifiedIdentifier | UnqualifiedIdentifier;
/**
 * QualifiedIdentifier node.
 */
export declare class QualifiedIdentifier implements Node {
    path: UnqualifiedIdentifier[];
    location: Location;
    type: string;
    constructor(path: UnqualifiedIdentifier[], location: Location);
}
/**
 * UnqualifiedIdentifier node.
 */
export declare class UnqualifiedIdentifier implements Node {
    value: string;
    location: Location;
    type: string;
    constructor(value: string, location: Location);
}
