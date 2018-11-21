import { File } from './ast';

export interface Parser {

    parse(src: string): File;
    yy: any;

}

export declare function parse(src: string): File;

export declare let parser: Parser;
