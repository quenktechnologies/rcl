/// <reference path='Parser.d.ts' />
import * as os from 'os';
import * as nodes from './Node';
import Parser = require('./Parser');

export { Node as Node } from './Node';

export interface AST {

    [key: string]: nodes.Node

}

export interface Context {

    symbols: SymbolTable;
    output: string[];

}

export interface SymbolTable {

    [key: string]: Variable

}

export class Variable {

    constructor(public id: string) { }

}

export const parse = (str: string, ast: AST = <any>nodes): nodes.File => {

    Parser.parser.yy = { ast };
    return Parser.parser.parse(str);

}

export const code = (n: nodes.Node): string => {

    if (n instanceof nodes.File) {

        let imports = n.imports.map(code).join(os.EOL);
        let routes = n.routes.map(code).join(os.EOL);

        return `${imports} ${os.EOL}${os.EOL}` +
            `export const routes = (app:$$runtime.Application) => (mod:$$runtime.Module) =>` +
            `{ ${os.EOL} _doNext = $$runtime.doNext(app, mod); ${os.EOL} ` +
            `${routes} ${os.EOL} }`;

    } else if (n instanceof nodes.MemberImport) {

        let members = n.members.map(code).join(',');
        let module = code(n.module);

        return `import {${members}} from ${module}`;

    } else if (n instanceof nodes.QualifiedImport) {

        let module = code(n.module);
        let id = code(n.id);

        return `import * as ${id} from ${module}`;

    } else if (n instanceof nodes.Route) {

        let method = n.method.toLowerCase();
        let pattern = code(n.pattern);
        let filters = n.filters.map(code);

        return `eApp.${method}(${pattern}, (req, res, next) => { ${os.EOL}` +
            `  Promise${os.EOL}` +
            `  .resolve(new $$runtime.Continuation($$runtime.Request.fromFramework(req)))${os.EOL}` +
            `  ${filters.join('  ')}` +
            `  .catch(e=>mod.onError(e))${os.EOL}` +
            `  .catch(e=>app.onError(e));${os.EOL}` +
            `})`;

    } else if (n instanceof nodes.Pattern) {

        return `'${n.value}'`;

    } else if (n instanceof nodes.CurriedFilter) {

        let target = code(n.target);
        let args = (n.args.length > 0) ? n.args.map(code).join(',') : '';

        return `.then(_doNext(${target}, ${args ? '{' + args + '}' : null}))`;

    } else if (n instanceof nodes.RenderFilter) {

        let view = code(n.view);

        return `.then(_doNext(() => ` +
            ` Promise` +
            ` .try(() => res.render(${view})) ` +
            ` .then(() => new End())))${os.EOL} `;

    } else if (n instanceof nodes.MemberIdentifier) {

        return `${code(n.target)}.${code(n.id)} `;

    } else if (n instanceof nodes.List) {

        let members = n.members.map(code).join(',');

        return `[${members}]`;

    } else if (n instanceof nodes.Dict) {

        let properties = n.properties.map(code).join(',');

        return `{ ${properties} } `;

    } else if (n instanceof nodes.KVP) {

        let key = code(n.key);
        let value = code(n.value);

        return `${key} : ${value} `;

    } else if (n instanceof nodes.StringLiteral) {

        return `'${n.value}'`;

    } else if (n instanceof nodes.BooleanLiteral) {

        return n.value;

    } else if (n instanceof nodes.NumberLiteral) {

        return n.value;

    } else if (n instanceof nodes.Identifier) {

        return n.value;

    } else {

        throw new TypeError(`Unexpected type ${typeof n
            }, '${n}'!`);

    }

}

export interface Options {

    runtime: string

}

const defaults = { runtime: 'tendril' };

export const compile = (src: string, options?: Options): string => {

    let opts = (<any>Object).assign({}, defaults, options);

    return `import * as $$runtime from '${opts.runtime}'; ${os.EOL} ` +
        `${code(parse(src))} `;

}
