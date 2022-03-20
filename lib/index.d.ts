/// <reference path="parser.d.ts" />
import { Either } from '@quenk/noni/lib/data/either';
import { Nodes, Node } from './ast';
/**
 * Result of attempting to parse a source text.
 */
export declare type Result = Either<Error, Node>;
/**
 * tree is a map of reference nodes that can be used during parsing.
 */
export declare const tree: Nodes;
/**
 * parse source text into an abstract syntax tree.
 */
export declare const parse: (str: string, ast: Nodes) => Result;
