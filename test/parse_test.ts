import * as must from 'must';
import * as fs from 'fs';
import { parse, tree } from '../src';

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

        return parse(test, tree)
            .map(json)
            .map(txt => fs.writeFileSync(`./test/expectations/${file}.json`, txt))
            .orRight((e: Error) => { throw e; });

    }

    if (!test.skip) {

        parse(test, tree)
            .map(json)
        .map(txt => compare(txt, 
          fs.readFileSync(`./test/expectations/${file}.json`, {
                encoding: 'utf8'
            })));

    }

}

tests = {

    'should allow imports': '%import refresh,check,random from "app/middleware"',
    'should allow qualified imports': '%import "app/Users" as users',
    'should allow actions': 'GET / action',
    'should allow filters and actions':
        'PUT /users/:id refresh check({perm="admin" v=12}) update',
    'should allow views': 'GET / "some/view"',
    'should allow filters and views': 'GET /random refresh "main/random" {pool = [1,2,3]}',
    'should allow comments': '-- This is a comment!',
    'should allow envvars': 'GET / action(${VALUE})',
    'should allow includes': 'include "path/to/include"',
    'should all together now': `

include "./other/file/conf" 

%import refresh,check,random from "app/middleware"
%import "app/Users" as users 
%import args from "arguments"

GET     /users refresh users.search

POST    /users refresh users.create

PUT     /users/:id refresh check({perm="admin" v=12}) users.update

DELETE  /users/:id random(args, process.env.value) users.delete
 
GET     /random refresh "main/random" {pool = [1,2,3]}

-- This is a comment!

DELETE  /users/:id refresh check(["admin", "remove"]) users.delete

GET / "main/index" {name = "Nikosi"}`
};

describe('Parser', function() {

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
