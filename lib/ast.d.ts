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
    body: FileBody[];
    location: Location;
    type: string;
    constructor(body: FileBody[], location: Location);
}
/**
 * FileBody are nodes that occur in the body of the file.
 */
export declare type FileBody = Include | Comment | Set | Route;
/**
 * Include node.
 */
export declare class Include implements Node {
    path: StringLiteral;
    location: Location;
    type: string;
    constructor(path: StringLiteral, location: Location);
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
export declare class Set implements Node {
    id: Identifier;
    value: Expression;
    location: Location;
    type: string;
    constructor(id: Identifier, value: Expression, location: Location);
}
/**
 * Filter node.
 */
export declare type Filter = AnyIdentifier | ModuleMember | FunctionCall;
/**
 * Route node.
 */
export declare class Route implements Node {
    method: Method;
    pattern: Pattern;
    filters: Filter[];
    view: View;
    tags: Tag[];
    location: Location;
    type: string;
    constructor(method: Method, pattern: Pattern, filters: Filter[], view: View, tags: Tag[], location: Location);
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
 * Tag node.
 */
export declare class Tag implements Node {
    name: Identifier;
    value: Expression;
    location: Location;
    type: string;
    constructor(name: Identifier, value: Expression, location: Location);
}
/**
 * Expression types.
 */
export declare type Expression = FunctionCall | ModuleMember | List | Dict | Literal | AnyIdentifier;
/**
 * FunctionCall node.
 */
export declare class FunctionCall implements Node {
    id: AnyIdentifier | ModuleMember;
    args: Expression[];
    location: Location;
    type: string;
    constructor(id: AnyIdentifier | ModuleMember, args: Expression[], location: Location);
}
/**
 * ModuleMember node.
 */
export declare class ModuleMember implements Node {
    module: string;
    member: Identifier;
    location: Location;
    type: string;
    constructor(module: string, member: Identifier, location: Location);
}
/**
 * List node.
 */
export declare class List implements Node {
    elements: Expression[];
    location: Location;
    type: string;
    constructor(elements: Expression[], location: Location);
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
    key: AnyIdentifier;
    value: Expression;
    location: Location;
    type: string;
    constructor(key: AnyIdentifier, value: Expression, location: Location);
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
    key: AnyIdentifier;
    location: Location;
    type: string;
    constructor(key: AnyIdentifier, location: Location);
}
/**
 * AnyIdentifier type.
 */
export declare type AnyIdentifier = QualifiedIdentifier | Identifier;
/**
 * QualifiedIdentifier node.
 */
export declare class QualifiedIdentifier implements Node {
    path: Identifier[];
    location: Location;
    type: string;
    constructor(path: Identifier[], location: Location);
}
/**
 * Identifier node.
 */
export declare class Identifier implements Node {
    value: string;
    location: Location;
    type: string;
    constructor(value: string, location: Location);
}
