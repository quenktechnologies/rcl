/// <reference path='parser.d.ts' />
import parser = require('./parser');
import { Either, left, right } from '@quenk/noni/lib/data/either';
import {
    Nodes,
    Node,
    File,
    Include,
    Comment,
    Set,
    Route,
    Pattern,
    View,
    EnvVar,
  FunctionCall,
    ModuleMember,
    List,
    Dict,
    Pair,
    StringLiteral,
    NumberLiteral,
    BooleanLiteral,
    QualifiedIdentifier,
    Identifier
} from './ast';

/**
 * Result of attempting to parse a source text.
 */
export type Result = Either<Error, Node>;

/**
 * tree is a map of reference nodes that can be used during parsing.
 */
export const tree: Nodes = {
    File, Include, Comment, Set, Route, Pattern, View, ModuleMember,
    EnvVar, FunctionCall, List, Dict, Pair, StringLiteral, NumberLiteral, 
    BooleanLiteral,    QualifiedIdentifier, Identifier
}

/**
 * parse source text into an abstract syntax tree.
 */
export const parse = (str: string, ast: Nodes): Result => {

    parser.parser.yy = { ast };

    try {

        return right(parser.parser.parse(str));

    } catch (e) {

        return left(e);

    }

}
