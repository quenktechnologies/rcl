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
        fs.writeFileSync(`./test/expectations/${file}.ts`, compile(test.input));
        return;
    }

    if (!test.skip) {

        compare(json(parse(test.input)), fs.readFileSync(`./test/expectations/${file}.json`, {
            encoding: 'utf8'
        }));

        compare(compile(test.input), fs.readFileSync(`./test/expectations/${file}.ts`, {
            encoding: 'utf8'
        }));

    }

}

tests = {

    'should work': {

        input: `
%import refresh,check,random from "app/middleware"
%import "app/Users" as Users 
%import Random from "app/Random"
%import args from "arguments"

GET     /users = refresh | Users.search

POST    /users = refresh | Users.create

PUT     /users/:id = refresh | check({perm='admin' v=12}) | Users.update

DELETE  /users/:id = random(args, process.env.value) | Users.delete
 
GET     /random = Random.get(1,2,3)

# comment

DELETE  /users/:id = refresh | check(['admin', 'remove']) | Users.delete

GET / = 'main/index' {name = 'Nikosi'}
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
