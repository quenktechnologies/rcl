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
Path (((\.{1,2}\/){1,2})|([/]))([\w-:/.]+)?

/* Lexer flags */
%options flex
%%

/* Lexer rules */

\s+                                                      return;
'#'.*                                                    return;
'true'                                                   return 'TRUE';
'false'                                                  return 'FALSE';
'GET'                                                    return 'GET';
'PATCH'                                                  return 'PATCH';
'POST'                                                   return 'POST';
'PUT'                                                    return 'PUT';
'DELETE'                                                 return 'DELETE';
'HEAD'                                                   return 'HEAD';
'import'                                                 return 'IMPORT';
'as'                                                     return 'AS';
'from'                                                   return 'FROM';
{NumberLiteral}                                          return 'NUMBER_LITERAL';
{StringLiteral}                                          return 'STRING_LITERAL';
{Identifier}                                             return 'IDENTIFIER';
{Path}                                                   return 'PATH';
'('                                                      return '(';
')'                                                      return ')';
'['                                                      return '[';
']'                                                      return ']';
'%'                                                      return '%';
'|'                                                      return '|';
';'                                                      return ';';
':'                                                      return ':';
'='                                                      return '=';
','                                                      return ',';
'.'                                                      return '.';
'{'                                                      return '{';
'}'                                                      return '}';
'/'                                                      return '/';

<*><<EOF>>                                               return 'EOF';

/lex

%ebnf
%start file
%%

file
          : imports routes EOF
            {$$ = new yy.ast.File($1, $2, @$); return $$;}

          | routes EOF
            {$$ = new yy.ast.File([], $1, @$); return $$;}

          | EOF
            {$$ = new yy.ast.File([], [], @$); return $$}
          ;

imports
          : import          {$$ = [$1];           }
          | imports import  {$$ = $1.concat($2);  }
          ;

import
          : '%' IMPORT member_list FROM string_literal
            {$$ = new yy.ast.MemberImport($3, $5, @$);        }

          | '%' IMPORT string_literal AS identifier
            {$$ = new yy.ast.QualifiedImport($3, $5, @$); }
          ;

member_list

          : identifier                 {$$ =[$1];           }
          | member_list ',' identifier {$$ = $1.concat($3); } 
          ;

routes
          : route              {$$ = [$1];         }
          | routes route       {$$ = $1.concat($2);}
          ;

route
          : method pattern '=' filters '|' action 
            {$$ = new yy.ast.Route($1, $2, $4, $6, @$);    } 

          | method pattern '=' action 
            {$$ = new yy.ast.Route($1, $2, [], $4, @$);    } 

          ;

method
          : GET | PATCH | POST | PUT | DELETE | HEAD
            {$$ = $1;}
          ;

pattern
          : PATH
            {$$ = new yy.ast.Pattern($1, @$);}
          ;

filters
          : filter
            {$$ = [$1];  }

          | filters '|' filter
            {$$ = $1.concat($3); }
          ;

filter
          : identifier 
            {$$ = new yy.ast.Filter($1, [], @$); }
          
          | identifier '(' arguments ')'
            {$$ = new yy.ast.Filter($1, $3, @$); }
          ;

action 
          : identifier '.' identifier
            {$$ = new yy.ast.ControllerAction($1, $3, [], @$); }

          | identifier '.' identifier '(' arguments? ')'
            {$$ = new yy.ast.ControllerAction($1, $3, $5||[], @$); }

          | string_literal dict
            {$$ = new yy.ast.ViewAction($1, $2, @$); }

          | string_literal
            {$$ = new yy.ast.ViewAction($1, null, @$); }

          ;

member_identifier
          : identifier '.' identifier
            {$$ = new yy.ast.MemberIdentifier($1, $3, @$);}

          | member_identifier '.' identifier
            {$$ = new yy.ast.MemberIdentifier($1, $3, @$);}
          ;

arguments
          : value               {$$ = [$1];         }
          | arguments ',' value  {$$ = $1.concat($3);} 
          ;

value
          : (list|dict|string_literal|number_literal|boolean_literal)
          ;

list      
          : '[' ']'
            {$$ = new yy.ast.List([], @$); }

          | '[' value_list ']'
            {$$ = new yy.ast.List($2, @$); }
          ;

value_list
          : value                 {$$ = [$1];         }
          | value_list ',' value  {$$ = $1.concat($3);}
          ;

dict
          : '{' '}'
            {$$ = new yy.ast.Dict([], @$); }

          | '{' kvp+ '}'
            {$$ = new yy.ast.Dict($2, @$); }
          ;

kvps
          : kvp         {$$ = [$1];         }
          | kvps kvp    {$$ = $1.concat($2);}
          ;

kvp
          : identifier '=' value
            {$$ = new yy.ast.KVP($1, $3, @$);}
          ;

string_literal
          : STRING_LITERAL 
          {$$ = new yy.ast.StringLiteral($1.slice(1, -1), @$); }
          ;

boolean_literal
          : TRUE
            {$$ = new yy.ast.BooleanLiteral(true, @$);}

          | FALSE
            {$$ = new yy.ast.BooleanLiteral(false, @$);}
          ;

number_literal
          : NUMBER_LITERAL
            {$$ = new yy.ast.NumberLiteral(parseFloat($1), @$); }
          ;

identifier
          : IDENTIFIER
            {$$ = new yy.ast.Identifier($1, @$);}
          ;
%%
