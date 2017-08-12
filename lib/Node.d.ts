export interface Node {
    type: string;
    location: Location;
}
export interface Location {
    [key: string]: string | number;
}
export declare class File {
    imports: Import[];
    routes: Route[];
    location: Location;
    type: string;
    constructor(imports: Import[], routes: Route[], location: Location);
}
export declare type Import = MemberImport | QualifiedImport;
export declare class MemberImport {
    members: Identifier[];
    module: StringLiteral;
    location: Location;
    type: string;
    constructor(members: Identifier[], module: StringLiteral, location: Location);
}
export declare class QualifiedImport {
    module: StringLiteral;
    id: Identifier;
    location: Location;
    type: string;
    constructor(module: StringLiteral, id: Identifier, location: Location);
}
export declare class Route {
    method: Method;
    pattern: Pattern;
    filters: Filter[];
    location: Location;
    type: string;
    constructor(method: Method, pattern: Pattern, filters: Filter[], location: Location);
}
export declare type Method = 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE';
export declare class Pattern {
    value: string;
    location: Location;
    type: string;
    constructor(value: string, location: Location);
}
export declare type Filter = ActionFilter | RenderFilter;
export declare class ActionFilter {
    target: Identifier | MemberIdentifier;
    args: KVP[];
    location: Location;
    type: string;
    constructor(target: Identifier | MemberIdentifier, args: KVP[], location: Location);
}
export declare class RenderFilter {
    view: StringLiteral;
    location: Location;
    type: string;
    constructor(view: StringLiteral, location: Location);
}
export declare class MemberIdentifier {
    target: Identifier | MemberIdentifier;
    id: Identifier;
    location: Location;
    type: string;
    constructor(target: Identifier | MemberIdentifier, id: Identifier, location: Location);
}
export declare type Value = List | Dict | StringLiteral | NumberLiteral | BooleanLiteral;
export declare class List {
    members: Value[];
    location: Location;
    type: string;
    constructor(members: Value[], location: Location);
}
export declare class Dict {
    properties: KVP[];
    location: Location;
    type: string;
    constructor(properties: KVP[], location: Location);
}
export declare class KVP {
    key: Identifier;
    value: Value;
    location: Location;
    type: string;
    constructor(key: Identifier, value: Value, location: Location);
}
export declare class StringLiteral {
    value: string;
    location: Location;
    type: string;
    constructor(value: string, location: Location);
}
export declare class BooleanLiteral {
    value: string;
    location: Location;
    type: string;
    constructor(value: string, location: Location);
}
export declare class NumberLiteral {
    value: string;
    location: Location;
    type: string;
    constructor(value: string, location: Location);
}
export declare class Identifier {
    value: string;
    location: Location;
    type: string;
    constructor(value: string, location: Location);
}
