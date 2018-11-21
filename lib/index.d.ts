/// <reference path="parser.d.ts" />
import * as nodes from './ast';
/**
 * parse a source text into an AST.
 */
export declare const parse: (str: string, ast?: nodes.AbstractSyntaxTree) => nodes.File;
