
/**
 * Nodes map.
 */
export interface Nodes {

    [key: string]: Constructor

}

/**
 * Constructor function for a generic node.
 */
export interface Constructor {

    new(...p: any[]): Node

}

/**
 * Location within source text.
 */
export interface Location {

    [key: string]: string | number

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
export class File implements Node {

    type = 'file';

    constructor(
        public includes: Include[],
        public imports: Import[],
        public routes: Routes[],
        public location: Location) { }

}

/**
 * Include node.
 */
export class Include implements Node {

    type = 'include';

    constructor(
        public path: StringLiteral,
        public location: Location) { }

}

/**
 * Import types.
 */
export type Import
    = MemberImport
    | QualifiedImport
    ;

/**
 * MemberImport node.
 */
export class MemberImport implements Node {

    type = 'member-import';

    constructor(
        public members: UnqualifiedIdentifier[],
        public module: StringLiteral,
        public location: Location) { }

}

/**
 * QualifiedImport node.
 */
export class QualifiedImport implements Node {

    type = 'qualified-import';

    constructor(
        public module: StringLiteral,
        public id: UnqualifiedIdentifier,
        public location: Location) { }

}

/**
 * Routes type.
 */
export type Routes
    = Comment
    | Route
    ;

/**
 * Comment node
 */
export class Comment implements Node {

    type = 'comment';

    constructor(public value: string, public location: Location) { }

}
/**
 * Route node.
 */
export class Route implements Node {

    type = 'route';

    constructor(
        public method: Method,
        public pattern: Pattern,
        public filters: FilterExpression[],
        public view: View,
        public location: Location) { }

}

/**
 * Method (http) supported.
 */
export type Method
    = 'GET'
    | 'PUT'
    | 'POST'
    | 'PATCH'
    | 'DELETE'
    ;

/**
 * Pattern node.
 */
export class Pattern implements Node {

    type = 'pattern';

    constructor(public value: string, public location: Location) { }

}

/**
 * FilterExpression
 */
export type FilterExpression = Filter | Spread;

/**
 * Filter node.
 */
export class Filter implements Node {

    type = 'filter';

    constructor(
        public value: Identifier,
        public args: Value[],
        public invoked: boolean,
        public location: Location) { }

}

/**
 * Spread node.
 */
export class Spread implements Node {

    type = 'spread';

    constructor(
        public filter: Filter,
        public location: Location) { }

}

/**
 * View node.
 */
export class View implements Node {

    type = 'view';

    constructor(
        public view: StringLiteral,
        public context: Dict | null,
        public location: Location) { }

}

/**
 * Value types.
 */
export type Value
    = List
    | Dict
    | Literal
    | Identifier
    ;

/**
 * List node.
 */
export class List implements Node {

    type = 'list';

    constructor(
        public elements: Value[],
        public location: Location) { }

}

/**
 * Dict node.
 */
export class Dict implements Node {

    type = 'dict';

    constructor(
        public properties: Pair[],
        public location: Location) { }

}

/**
 * Pair node.
 */
export class Pair implements Node {

    type = 'pair';

    constructor(
        public key: Identifier,
        public value: Value,
        public location: Location) { }

}

/**
 * Literal types.
 */
export type Literal
    = StringLiteral
    | NumberLiteral
    | BooleanLiteral
    ;

/**
 * StringLiteral node.
 */
export class StringLiteral implements Node {

    type = 'string-literal';

    constructor(
        public value: string,
        public location: Location) { }

}

/**
 * NumberLiteral node.
 */
export class NumberLiteral implements Node {

    type = 'number-literal';

    constructor(
        public value: string,
        public location: Location) { }

}

/**
 * BooleanLiteral node.
 */
export class BooleanLiteral implements Node {

    type = 'boolean-literal';

    constructor(
        public value: string,
        public location: Location) { }

}

/**
 * EnvVar node.
 */
export class EnvVar implements Node {

    type = 'envvar';

    constructor(
        public key: Identifier,
        public location: Location) { }

}

/**
 * Identifier type.
 */
export type Identifier
    = QualifiedIdentifier
    | UnqualifiedIdentifier
    ;

/**
 * QualifiedIdentifier node.
 */
export class QualifiedIdentifier implements Node {

    type = 'qualified-identifier';

    constructor(
        public path: UnqualifiedIdentifier[],
        public location: Location) { }

}

/**
 * UnqualifiedIdentifier node.
 */
export class UnqualifiedIdentifier implements Node {

    type = 'unqualified-identifier';

    constructor(
        public value: string,
        public location: Location) { }

}
