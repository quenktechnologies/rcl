/// <reference path="../src/Parser.d.ts" />
import * as nodes from './Node';
export { Node as Node } from './Node';
export interface AST {
    [key: string]: nodes.Node;
}
export declare class Context {
    symbols: {
        [key: string]: string;
    };
    add(id: string): this;
    has(id: string): boolean;
    get(id: string): string;
    toString(): string;
}
export declare const parse: (str: string, ast?: AST) => nodes.File;
export declare const code: (n: nodes.Node, ctx: Context) => string;
export declare const compile: (src: string) => string;
