
export interface Node {

    type: string
    location: Location

}

export interface Location {

    [key: string]: string | number

};

export class File {

    type = 'file';

    constructor(public imports: Import[], public routes: Route[], public location: Location) { }

}

export type Import
    = MemberImport
    | QualifiedImport;

export class MemberImport {

    type = 'member-import';
    constructor(public members: Identifier[], public module: StringLiteral, public location: Location) { }

}

export class QualifiedImport {

    type = 'qualified-import';

    constructor(public module: StringLiteral, public id: Identifier, public location: Location) { }

}

export class Route {

    type = 'route';

    constructor(
        public method: Method,
        public pattern: Pattern,
        public filters: Filter[],
        public action: Action,
        public location: Location) {

    }

}

export type Method
    = 'GET'
    | 'PUT'
    | 'POST'
    | 'PATCH'
    | 'DELETE';

export class Pattern {

    type = 'pattern';
    constructor(public value: string, public location: Location) { }

}

export class Filter {

    type = 'filter';

    constructor(
        public target: Identifier | MemberIdentifier,
        public args: Value[],
        public location: Location) { }

}

export type Action
    = ControllerAction
    | ViewAction
    ;

export class ControllerAction {

    type = 'controller-action';

    constructor(
        public target: Identifier,
        public member: Identifier,
        public args: Value[],
        public location: Location) { }

}

export class ViewAction {

    type = 'view-action';

    constructor(
        public view: StringLiteral,
        public context: Dict | null,
        public location: Location) { }

}

export class MemberIdentifier {

    type = 'member-identifier';

    constructor(public target: Identifier | MemberIdentifier, public id: Identifier, public location: Location) { }


}

export type Value
    = List
    | Dict
    | StringLiteral
    | NumberLiteral
    | BooleanLiteral
    ;


export class List {

    type = 'list';
    constructor(public members: Value[], public location: Location) {

    }

}

export class Dict {

    type = 'dict';
    constructor(public properties: KVP[], public location: Location) { }

}

export class KVP {

    type = 'kvp';

    constructor(public key: Identifier, public value: Value, public location: Location) { }

}

export class StringLiteral {

    type = 'string';

    constructor(public value: string, public location: Location) { }


}

export class BooleanLiteral {

    type = 'boolean-literal';

    constructor(public value: string, public location: Location) { }

}

export class NumberLiteral {

    type = 'number-literal';
    constructor(public value: string, public location: Location) { }

}

export class Identifier {

    type = 'identifier';

    constructor(public value: string, public location: Location) { }

}
