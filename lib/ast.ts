
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
        public body: FileBody[],
        public location: Location) { }

}

/**
 * FileBody are nodes that occur in the body of the file.
 */
export type FileBody = Include | Comment | Set | Route;

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
 * Comment node
 */
export class Comment implements Node {

    type = 'comment';

    constructor(public value: string, public location: Location) { }

}

export class Set implements Node {

    type = 'set';

    constructor(
        public id: Identifier,
        public value: Expression,
        public location: Location) { }

}

/**
 * Route node.
 */
export class Route implements Node {

    type = 'route';

    constructor(
        public method: Method,
        public pattern: Pattern,
        public filters: Filter[],
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
 * Filter node.
 */
export type Filter
    = CandidateIdentifier
    | ModuleMember
    | FunctionCall
    ;

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
 * Expression types.
 */
export type Expression
    = FunctionCall
    | ModuleMember
    | List
    | Dict
    | Literal
    | CandidateIdentifier
    ;

/**
 * FunctionCall node.
 */
export class FunctionCall implements Node {

    type = 'function-call';

    constructor(
        public value: CandidateIdentifier,
        public args: Expression[],
        public location: Location) { }

}

/**
 * ModuleMember node.
 */
export class ModuleMember implements Node {

    type = 'module-member';

    constructor(
        public module: string,
        public member: Identifier,
        public location: Location) { }

}

/**
 * List node.
 */
export class List implements Node {

    type = 'list';

    constructor(
        public elements: Expression[],
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
        public key: CandidateIdentifier,
        public value: Expression,
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
        public key: CandidateIdentifier,
        public location: Location) { }

}

/**
 * CandidateIdentifier type.
 */
export type CandidateIdentifier
    = QualifiedIdentifier
    | Identifier
    ;

/**
 * QualifiedIdentifier node.
 */
export class QualifiedIdentifier implements Node {

    type = 'qualified-identifier';

    constructor(
        public path: Identifier[],
        public location: Location) { }

}

/**
 * Identifier node.
 */
export class Identifier implements Node {

    type = 'identifier';

    constructor(
        public value: string,
        public location: Location) { }

}
