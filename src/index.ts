/// <reference path='parser.d.ts' />
import * as nodes from './ast';
import parser = require('./parser');

/**
 * parse a source text into an AST.
 */
export const parse = (str: string, ast: nodes.AbstractSyntaxTree = <any>nodes)
  : nodes.File => {

    parser.parser.yy = { ast };
    return parser.parser.parse(str);

}
