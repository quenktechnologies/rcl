/*
 Grammer for the Widget Markup Language
*/

/*
 This is the Lexer portion, the syntax here corresponds to
 [flex](http://flex.sourceforge.net/manual)
*/

%lex

/* Definitions */
DecimalDigit [0-9]
DecimalDigits [0-9]+
NonZeroDigit [1-9]
OctalDigit [0-7]
HexDigit [0-9a-fA-F]
ExponentIndicator [eE]
SignedInteger [+-]?[0-9]+
DecimalIntegerLiteral [-]?([0]|({NonZeroDigit}{DecimalDigits}*))
ExponentPart {ExponentIndicator}{SignedInteger}
OctalIntegerLiteral [0]{OctalDigit}+
HexIntegerLiteral [0][xX]{HexDigit}+
DecimalLiteral ([-]?{DecimalIntegerLiteral}\.{DecimalDigits}*{ExponentPart}?)|(\.{DecimalDigits}{ExponentPart}?)|({DecimalIntegerLiteral}{ExponentPart}?)
NumberLiteral {DecimalLiteral}|{HexIntegerLiteral}|{OctalIntegerLiteral}
Identifier [a-zA-Z$_][a-zA-Z$_0-9-]*
DotIdentifier [a-zA-Z$_][a-zA-Z$_0-9.-]*
LineContinuation \\(\r\n|\r|\n)
OctalEscapeSequence (?:[1-7][0-7]{0,2}|[0-7]{2,3})
HexEscapeSequence [x]{HexDigit}{2}
UnicodeEscapeSequence [u]{HexDigit}{4}
SingleEscapeCharacter [\'\"\\bfnrtv]
NonEscapeCharacter [^\'\"\\bfnrtv0-9xu]
CharacterEscapeSequence {SingleEscapeCharacter}|{NonEscapeCharacter}
EscapeSequence {CharacterEscapeSequence}|{OctalEscapeSequence}|{HexEscapeSequence}|{UnicodeEscapeSequence}
DoubleStringCharacter ([^\"\\\n\r]+)|(\\{EscapeSequence})|{LineContinuation}
SingleStringCharacter ([^\'\\\n\r]+)|(\\{EscapeSequence})|{LineContinuation}
TemplateStringCharacter ([^\`\\\n\r]+)|(\\{EscapeSequence})|{LineContinuation}
StringLiteral (\"{DoubleStringCharacter}*\")|(\'{SingleStringCharacter}*\')|(\`{TemplateStringCharacter}*\`)
Text ({DoubleStringCharacter}*)|({SingleStringCharacter}*)

/* Lexer flags */
%options flex
%%

/* Lexer rules */

<INITIAL>\s+                                             return;
'true'                                                   return 'TRUE';
'false'                                                  return 'FALSE';
{NumberLiteral}                                          return 'NUMBER_LITERAL';
{StringLiteral}                                          return 'STRING_LITERAL';
'from'                                                   return 'FROM';
'#'.*                                                    return;
'('                                                      return '(';
')'                                                      return ')';
'['                                                      return '[';
']'                                                      return ']';
';'                                                      return ';'
':'                                                      return ':';
'='                                                      return '='
','                                                      return ',';
'.'                                                      return '.';
'{'                                                      return '{';
'}'                                                      return '}';
'/'                                                      return '/';
{Identifier}                                             return 'IDENTIFIER';

<*><<EOF>>                                               return 'EOF';

/lex
%right <*> '?' ':' '=>'
%right '!'

%ebnf
%start configuration
%%

configuration
          : property+ EOF
            { $$ = new Configuration($1, @$); return $$;}

          | EOF
            { $$ = new Configuration([], @$); return $$;}
          ;

property
          : key '=' value
            {$$ = new Property($1, $3, @$);} 
          ;

key       
          : IDENTIFIER
            {$$ = $1;}

          | key '.' IDENTIFIER
            {$$ = $1 + '.' + $3;}
          ;

value     
          : import | members_import | member_import | list | dict | string_literal | boolean_literal | number_literal
            {$$ = $1;}
          ;

import
          : uri
            {$$ = new DefaultImport($1, @$);    }
          ;

member_import
          : IDENTIFIER FROM uri
            {$$ = new MemberImport($1, $3, @$); }
          ;

members_import
          :  FROM uri '[' member_list ']'
            {$$ = new MembersImport($2, $4, @$);}
          ;

member_list
          : IDENTIFIER
            {$$ = [$1];                       }

          | member_list ',' IDENTIFIER
            {$$ = $1.concat($3);              }
          ;

uri
          : IDENTIFIER
            {$$ = [$1];           }

          | uri '/' IDENTIFIER
            {$$ = $1.concat($3);}
          ;

list      
          : '[' ']'
            {$$ = new List([], @$); }

          | '[' members ']'
            {$$ = new List($2, @$); }
          ;

members
          : value 
            {$$ = [$1];          }

          | members ',' value  
            {$$ = $1.concat($3); }
          ;

dict
          : '{' '}'
            {$$ = new Dict([], @$); }

          | '{' property+ '}'
            {$$ = new Dict($2, @$); }
          ;

string_literal
          : STRING_LITERAL 
          {$$ = new StringLiteral($1.slice(1, -1), @$); }
          ;

boolean_literal
          : TRUE
          {$$ = new BooleanLiteral(true, @$);}

          | FALSE
          {$$ = new BooleanLiteral(false, @$);}
          ;

number_literal
          : NUMBER_LITERAL
          {$$ = new NumberLiteral(parseFloat($1), @$); }
          ;
%%

function Configuration(properties, location) {

  this.type = 'configuration';
  this.properties = properties;

}

function Property(key, value, location) {

  this.type = 'property';
  this.key = key;
  this.value = value;
  this.location = location;

}

function DefaultImport(path, location) {

  this.type = 'default-import';
  this.path = path;
  this.location = location;

}

function MemberImport(member, path, location) {

  this.type = 'member-import';
  this.member = member;
  this.path = path;
  this.location = location;

}

function MembersImport(path, members, location) {

  this.type = 'members-import';
  this.path = path;
  this.members = members;
  this.location = location;

}

function List(members, location) {

  this.type = 'list';
  this.members = members;
  this.location = location;

}

function Dict(properties, location) {

  this.type = 'dict';
  this.properties = properties;
  this.location = location;

}

function StringLiteral(value, location) {

  this.type = 'string';
  this.value = value;
  this.location = location;

}

function BooleanLiteral(value, location) {

  this.type = 'boolean';
  this.value = value;
  this.location = location;

}

function NumberLiteral(value, location) {

  this.type = 'number';
  this.value = value;
  this.location = location;

}


