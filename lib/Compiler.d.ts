/**
 * symbols creates the scope (symbol table) for the part of the program we are processing.
 * @param {State} [parent]
 * @returns {State<State>}
 */
export declare const symbols: () => any;
/**
 * compile
 */
export declare const compile: (flags: any) => (ast: any) => any;
