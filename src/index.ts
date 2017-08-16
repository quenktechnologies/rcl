/// <reference path='Parser.d.ts' />
import * as os from 'os';
import * as nodes from './Node';
import Parser = require('./Parser');

export { Node as Node } from './Node';

export interface AST {

    [key: string]: nodes.Node

}

export class Context {

    symbols: { [key: string]: string } = {};

    add(id: string): this {

        this.symbols[id] = `_${id.toLowerCase()}`;
        return this;

    }

    has(id: string): boolean {

        return (this.symbols[id]) ? true : false;

    }

    get(id: string): string {

        if (this.symbols[id])
            return this.symbols[id];

        throw new Error(`No matching symbols for '${id}'!`);

    }

    toString(): string {

        return Object
            .keys(this.symbols)
            .map(s => `let ${this.symbols[s]} = new ${s}();`).join(os.EOL);

    }

}


export const parse = (str: string, ast: AST = <any>nodes): nodes.File => {

    Parser.parser.yy = { ast };
    return Parser.parser.parse(str);

}

export const code = (n: nodes.Node, ctx: Context): string => {

    if (n instanceof nodes.File) {

        let imports = n.imports.map(i => code(i, ctx)).join(os.EOL);
        let routes = n.routes.map(r => code(r, ctx)).join(os.EOL);

        return `${imports} ${os.EOL}${os.EOL}` +
            `export const routes = <C>(_app:express.Application,${os.EOL}` +
            `_renderer:tendril.app.Renderer, ${os.EOL}` +
            `_mod:tendril.app.Module<C>) => {${os.EOL}` +
            `  ${ctx} ${os.EOL} ${routes} ${os.EOL} }`;

    } else if (n instanceof nodes.MemberImport) {

        let members = n.members.map(m => code(m, ctx)).join(',');
        let module = code(n.module, ctx);

        return `import {${members}} from ${module}`;

    } else if (n instanceof nodes.QualifiedImport) {

        let module = code(n.module, ctx);
        let id = code(n.id, ctx);

        return `import * as ${id} from ${module}`;

    } else if (n instanceof nodes.Route) {

        let method = n.method.toLowerCase();
        let pattern = code(n.pattern, ctx);
        let action = code(n.action, ctx);
        let filters = n.filters.map(x => code(x, ctx)).join(',');

        return `_app.${method}(${pattern},${filters ? filters + ',' : ''}(_req, _res) => {` +
            `${os.EOL}${os.EOL} ` +
            `  Bluebird${os.EOL} ` +
            `   .try(()=>${action})` +
            `   .catch(e => _mod.onError(e, _req, _res))${os.EOL} ` +
            `})`;

    } else if (n instanceof nodes.Pattern) {

        return `'${n.value}'`;

    } else if (n instanceof nodes.Filter) {

        let target = code(n.target, ctx);
        let args = (n.args.length > 0) ? n.args.map(x => code(x, ctx)).join(',') : '';

        return `${target}${args ? '(' + args + ')' : ''}`;

    } else if (n instanceof nodes.ControllerAction) {

        let target = code(n.target, ctx);
        let member = code(n.member, ctx);

        let args = (n.args.length > 0) ?
            n.args.map(x => code(x, ctx)).concat(['_req, _res']).join(',') : '_req, _res';

        if (ctx.has(target))
            return `${ctx.get(target)}.${member}(${args})`;
        else
            return `${ctx.add(target).get(target)}.${member}(${args})`;

    } else if (n instanceof nodes.ViewAction) {

        let view = code(n.view, ctx);
        let c = (n.context) ? code(n.context, ctx) : '';

        return ` _renderer.render(${view}${c ? ',' + c : ''})`

    } else if (n instanceof nodes.MemberIdentifier) {

        return `${code(n.target, ctx)}.${code(n.id, ctx)} `;

    } else if (n instanceof nodes.List) {

        let members = n.members.map(x => code(x, ctx)).join(',');

        return `[${members}]`;

    } else if (n instanceof nodes.Dict) {

        let properties = n.properties.map(x => code(x, ctx)).join(',');

        return `{ ${properties} } `;

    } else if (n instanceof nodes.KVP) {

        let key = code(n.key, ctx);
        let value = code(n.value, ctx);

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

        throw new TypeError(`Unexpected type ${typeof n}, '${n}'!`);

    }

}

export const compile = (src: string): string => {

    return `${code(parse(src), new Context())} `;

}
