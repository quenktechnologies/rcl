
/**
 * AbstractSyntaxTree
 */
export interface AbstractSyntaxTree {

    [key: string]: Node

}

/**
 * Location within source text.
 */
export interface Location {

    [key: string]: string | number

}

/**
 * Node represents a member of the lang's AST.
 */
export abstract class Node {

    constructor(public type: string, public location: Location) { }

}

/**
 * File node.
 *
 * Contents of source text.
 */
export class File extends Node {

    constructor(
        public includes: Include[],
        public imports: Import[],
        public routes: Route | Comment[],
        public location: Location) { super('file', location); }

}

/**
 * Include node.
 */
export class Include extends Node {

  constructor(
    public path:string, 
    public location:Location){ super('include', location); }

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
export class MemberImport extends Node {

    constructor(
        public members: Identifier[],
        public module: StringLiteral,
        public location: Location) { super('member-import', location); }

}

/**
 * QualifiedImport node.
 */
export class QualifiedImport extends Node {

    constructor(
        public module: StringLiteral,
        public id: Identifier,
        public location: Location) { super('qualified-import', location); }

}

/**
 * Comment node
 */
export class Comment extends Node {

    constructor(public value: string, location: Location) {

        super('comment', location);

    }

}
/**
 * Route node.
 */
export class Route extends Node {

    constructor(
        public method: Method,
        public pattern: Pattern,
        public filters: Filter[],
        public view: View,
        public location: Location) { super('route', location); }


}

/**
 * Method (http) supported.
 */
export type Method
    = 'GET'
    | 'PUT'
    | 'POST'
    | 'PATCH'
    | 'DELETE';

/**
 * Pattern node.
 */
export class Pattern extends Node {

    constructor(public value: string, public location: Location) {

        super('pattern', location);

    }

}

/**
 * Filter node.
 */
export class Filter extends Node {

    constructor(
        public value: Identifier | QualifiedIdentifier,
        public args: Value[],
        public invoked: boolean,
        public location: Location) { super('filter', location); }

}

/**
 * View node.
 */
export class View extends Node {

    constructor(
        public view: StringLiteral,
        public context: Dict | null,
        public location: Location) { super('view', location); }

}


/**
 * Value types.
 */
export type Value
    = List
    | Dict
    | StringLiteral
    | NumberLiteral
    | BooleanLiteral
    | QualifiedIdentifier
    | Identifier
    ;

/**
 * List node.
 */
export class List extends Node {

    constructor(
        public members: Value[],
        public location: Location) { super('list', location); }

}

/**
 * Dict node.
 */
export class Dict extends Node {

    constructor(
        public properties: Pair[],
        public location: Location) { super('dict', location); }

}

/**
 * Pair node.
 */
export class Pair extends Node {

    constructor(
        public key: Identifier,
        public value: Value,
        public location: Location) { super('pair', location); }

}

/**
 * StringLiteral node.
 */
export class StringLiteral extends Node {

    constructor(
        public value: string,
        public location: Location) { super('string-literal', location); }

}

/**
 * BooleanLiteral node.
 */
export class BooleanLiteral extends Node {

    constructor(
        public value: string,
        public location: Location) { super('boolean-literal', location); }

}

/**
 * NumberLiteral node.
 */
export class NumberLiteral extends Node {

    constructor(
        public value: string,
        public location: Location) { super('number-literal', location); }

}

/**
 * EnvVar node.
 */
export class EnvVar extends Node {

    constructor(
        public key: string,
        location: Location) { super('envar', location); }

}

/**
 * QualifiedIdentifier node.
 */
export class QualifiedIdentifier extends Node {

    constructor(
        public path: Identifier,
        public location: Location) { super('qualified-identifier', location); }

}

/**
 * Identifier node.
 */
export class Identifier extends Node {

    constructor(
        public value: string,
        public location: Location) { super('identifier', location); }

}
