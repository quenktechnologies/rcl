import os from 'os';
import { reduce } from './transforms';
import { State, state } from 'afpl/lib/monad/State';
import { left, right } from 'afpl/lib/monad/Either';

/**
 * symbols creates the scope (symbol table) for the part of the program we are processing.
 * @param {State} [parent]
 * @returns {State<State>}
 */
export const symbols = () =>
    State.put({ parent: State.put(null), local: {} });

const flat = list =>
    list.reduce((prev, curr) =>
        prev.concat(Array.isArray(curr) ? flat(curr) : curr), []);

const process = ast => outputEM => state(outputEM).chain(reduce(ast.statements));

/**
 * compile
 */
export const compile = flags =>
    ast =>
        (flags['-t']) ?
            state(right(JSON.stringify(ast))) :
            State
                .put({ ast, flags, errors: [], symbols: symbols() })
                .map(() => right([])) //set the outputW value, in future this could be a preamble
                .chain(process(ast))
                .chain(outputW =>
                    outputW.cata(() =>
                        State
                            .get()
                            .map(({ errors }) => left(errors.join(os.EOL))),
                        lines =>
                            state(right(lines.join(os.EOL)))))

