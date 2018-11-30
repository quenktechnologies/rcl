%lex

/* Definitions */
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
LineContinuation \\(\r\n|\r|\n)
OctalEscapeSequence (?:[1-7][0-7]{0,2}|[0-7]{2,3})
HexEscapeSequence [x]{HexDigit}{2}
UnicodeEscapeSequence [u]{HexDigit}{4}
SingleEscapeCharacter [\'\"\\bfnrtv]
NonEscapeCharacter [^\'\"\\bfnrtv0-9xu]
CharacterEscapeSequence {SingleEscapeCharacter}|{NonEscapeCharacter}
EscapeSequence {CharacterEscapeSequence}|{OctalEscapeSequence}|{HexEscapeSequence}|{UnicodeEscapeSequence}
DoubleStringCharacter ([^\"\\\n\r]+)|(\\{EscapeSequence})|{LineContinuation}
StringLiteral (\"{DoubleStringCharacter}*\")
Path (((\.{1,2}\/){1,2})|([/]))([\w-:/.]+)?
Characters [^\n]*

/* Lexer flags */
%options flex
%x COMMENT
%%

/* Lexer rules */

\s+                                                      return;
'--'                  this.begin('COMMENT');             return 'COMMENT';
<COMMENT>{Characters} this.popState();                   return 'CHARACTERS';
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
'include'                                                return 'INCLUDE';
{NumberLiteral}                                          return 'NUMBER_LITERAL';
{StringLiteral}                                          return 'STRING_LITERAL';
{Identifier}                                             return 'IDENTIFIER';
{Path}                                                   return 'PATH';
'${'                                                     return '${';
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
          : includes imports routes EOF
            {$$ = new yy.ast.File($1, $2, $3, @$); return $$;}

          | includes imports EOF
            {$$ = new yy.ast.File($1, $2, [], @$); return $$;}

          | includes routes EOF
            {$$ = new yy.ast.File($1, [], $3, @$); return $$;}

          | includes EOF
            {$$ = new yy.ast.File($1, [], [], @$); return $$;}

          | imports routes EOF
            {$$ = new yy.ast.File([], $1, $2, @$); return $$;}

          | imports EOF
            {$$ = new yy.ast.File([], $1, [], @$); return $$;}

          | routes EOF
            {$$ = new yy.ast.File([], [], $1, @$); return $$;}

          | EOF
            {$$ = new yy.ast.File([], [], @$); return $$;}
          ;

includes
          : include
            {$$ = [$1];}

          | includes include
            {$$ = $1.concat($2);}
          ;

include
          : INCLUDE string_literal
            {$$ = new yy.ast.Include($2, @$);}
          ;

imports
          : import          {$$ = [$1];           }
          | imports import  {$$ = $1.concat($2);  }
          ;

import
          : '%' IMPORT member_list FROM string_literal
            {$$ = new yy.ast.MemberImport($3, $5, @$);}

          | '%' IMPORT string_literal AS unqualified_identifier
            {$$ = new yy.ast.QualifiedImport($3, $5, @$);}
          ;

member_list
          : unqualified_identifier                 {$$ =[$1];           }
          | member_list ',' unqualified_identifier {$$ = $1.concat($3); } 
          ;

routes
          : comment
            {$$ = [$1];}

          | route 
            {$$ = [$1];}

          | routes comment
            {$$ = $1.concat($2);}

          | routes route
            {$$ = $1.concat($2);}
          ;

comment
          : COMMENT CHARACTERS
            {$$ = new yy.ast.Comment($2, @$);}
          ;

route
          : method pattern filters view
            {$$ = new yy.ast.Route($1, $2, $3, $4, @$);} 

          | method pattern filters 
            {$$ = new yy.ast.Route($1, $2, $3, null, @$);} 

          | method pattern view
            {$$ = new yy.ast.Route($1, $2, [], $3, @$);} 
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
            {$$ = [$1];}

          | filters filter
            {$$ = $1.concat($2);}
          ;

filter

          : identifier '(' arguments ')'
            {$$ = new yy.ast.Filter($1, $3, true, @$); }

          | identifier '(' ')' 
            {$$ = new yy.ast.Filter($1, [], true, @$); }

          | identifier 
            {$$ = new yy.ast.Filter($1, [], false, @$); }
          
          ;

view 
          : string_literal dict
            {$$ = new yy.ast.View($1, $2, @$); }

          | string_literal
            {$$ = new yy.ast.View($1, {}, @$); }
          ;

arguments
          : value                {$$ = [$1];         }
          | arguments ',' value  {$$ = $1.concat($3);} 
          ;

value
          : list {$$ = $1;}

          | dict {$$ = $1;}

          | string_literal {$$ = $1;}

          | number_literal {$$ = $1;}

          | boolean_literal {$$ = $1;}

          | envvar {$$ = $1;}

          | identifier {$$ = $1;}
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

          | '{' pairs '}'
            {$$ = new yy.ast.Dict($2, @$); }
          ;

pairs
          : pair         {$$ = [$1];         }
          | pairs pair   {$$ = $1.concat($2);}
          ;

pair
          : identifier '=' value
            {$$ = new yy.ast.Pair($1, $3, @$);}
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

envvar
          : '${' unqualified_identifier '}'
             {$$ = new yy.ast.EnvVar($2, @$);  }
          ;

identifier
          : unqualified_identifier
            {$$ = $1;}

          | qualified_identifier
            {$$ = $1;}
          ;

qualified_identifier
          : path 
            {$$ = new yy.ast.QualifiedIdentifier($1, @$);}
          ;

path
          : unqualified_identifier '.' unqualified_identifier
            {$$ = [$1]; }

          | path '.' unqualified_identifier
            {$$ = $1.concat($3);}
          ;

unqualified_identifier
          : IDENTIFIER
            {$$ = new yy.ast.UnqualifiedIdentifier($1, @$);}
          ;
