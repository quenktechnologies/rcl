import * as must from 'must';
import * as fs from 'fs';
import { parse, compile } from '../src';

var input = null;
var tests = null;

function json(tree: any): string {
    return JSON.stringify(tree);
}

function compare(tree: any, that: any): void {

    must(tree).eql(that);

}

function makeTest(test, index) {

    var file = index.replace(/\s/g, '-');

    if (process.env.GENERATE) {
        fs.writeFileSync(`./test/expectations/${file}.json`, json(parse(test.input)));
        fs.writeFileSync(`./test/expectations/${file}.ts`, compile(test.input).cata(e => { throw e; }, x => x));
        return;
    }

    if (!test.skip) {

        compare(json(parse(test.input)), fs.readFileSync(`./test/expectations/${file}.json`, {
            encoding: 'utf8'
        }));

        compare(compile(test.input).cata(e => { throw e; }, x => x), fs.readFileSync(`./test/expectations/${file}.ts`, {
            encoding: 'utf8'
        }));

    }

}

tests = {

    'should work': {

        input: `
%import refresh,check from "app/middleware"
%import search,create,update from "app/users"
%import "app/Users" as Users

GET     /users = refresh | search

POST    /users = refresh | create

PUT     /users/:id = refresh | check(perm='admin', v=12) | update

# comment

DELETE  /users/:id = refresh | check(prem=['admin', 'remove']) | Users.delete

GET / = 'main/index'
        `

    }

};

describe('Parser', function() {

    beforeEach(function() {

        input = null;

    });

    describe('parse()', function() {

        Object.keys(tests).forEach(k => {

            it(k, function() {

                if (Array.isArray(tests[k])) {

                    tests[k].forEach(makeTest);

                } else {

                    makeTest(tests[k], k);

                }

            });
        });

    });

});
