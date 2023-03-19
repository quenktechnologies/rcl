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
NodeModulePath [@\w][@\w-/]+
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
'OPTIONS'                                                return 'OPTIONS';
'TRACE'                                                  return 'TRACE';
'CONNECT'                                                return 'CONNECT';
'include'                                                return 'INCLUDE';
'set'                                                    return 'SET';
{NumberLiteral}                                          return 'NUMBER_LITERAL';
{StringLiteral}                                          return 'STRING_LITERAL';
{Identifier}                                             return 'IDENTIFIER';
{Path}                                                   return 'PATH';
{NodeModulePath}                                         return 'NODE_MODULE_PATH';
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
'+'                                                      return '+';
'-'                                                      return '-';
'{'                                                      return '{';
'}'                                                      return '}';
'/'                                                      return '/';
'#'                                                      return '#';
'@'                                                      return '@';
<*><<EOF>>                                               return 'EOF';

/lex

%ebnf
%start file
%%

file
          : file_body EOF
            {$$ = new yy.ast.File($1, @$); return $$;}

          | EOF
            {$$ = new yy.ast.File([], @$); return $$;}
          ;

file_body
          : include
            {$$ = [$1];}

          | comment
            {$$ = [$1];}

          | set
            {$$ = [$1];}

          | route
            {$$ = [$1];}

          | file_body include
            {$$ = $1.concat($2);}

          | file_body comment
            {$$ = $1.concat($2);}

          | file_body set
            {$$ = $1.concat($2);}

          | file_body route
            {$$ = $1.concat($2);}
          ;

include
          : '%' INCLUDE string_literal
            {$$ = new yy.ast.Include($3, @$);}
          ;

set
          : '%' SET identifier '=' expression
            {$$ = new yy.ast.Set($3, $5, @$);}
          ;

comment
          : COMMENT CHARACTERS
            {$$ = new yy.ast.Comment($2, @$);}
          ;

route
          : method pattern filters view tags?
            {$$ = new yy.ast.Route($1, $2, $3, $4, $5||[], @$);} 

          | method pattern filters tags?
            {$$ = new yy.ast.Route($1, $2, $3, null, $4||[], @$);} 

          | method pattern view tags?
            {$$ = new yy.ast.Route($1, $2, [], $3, $4||[], @$);} 
          ;

method
          : GET | PATCH | POST | PUT | DELETE | HEAD | OPTIONS | TRACE | CONNECT 
            {$$ = $1;}
          ;

pattern
          : PATH
            {$$ = new yy.ast.Pattern($1, @$);}
          ;

filters
          : any_identifier
            {$$ = [$1];}

          | module_member
            {$$ = [$1];}
          
          | function_call
            {$$ = [$1];}

          | filters any_identifier
            {$$ = $1.concat($2);}

          | filters module_member
            {$$ = $1.concat($2);}

          | filters function_call
            {$$ = $1.concat($2);}
          ;

view 
          : string_literal dict
            {$$ = new yy.ast.View($1, $2, @$); }

          | string_literal
            {$$ = new yy.ast.View($1, new yy.ast.Dict([], @$), @$); }
          ;

tags
          : tag
           {$$ = [$1]; }

          | tags tag
           {$$ = $1.concat($2); }
          ;

tag 
          : '+' identifier 
           {$$ = new yy.ast.Tag($2, new yy.ast.BooleanLiteral(true, @$), @$); }

          | '+' identifier '=' expression
           {$$ = new yy.ast.Tag($2, $4, @$);}

          | '-' identifier
           {$$ = new yy.ast.Tag($2, new yy.ast.BooleanLiteral(true, @$), @$); }
          ;

expression
          : function_call {$$ = $1;}

          | module_member {$$ = $1;}

          | list {$$ = $1;}

          | dict {$$ = $1;}

          | string_literal {$$ = $1;}

          | number_literal {$$ = $1;}

          | boolean_literal {$$ = $1;}

          | envvar {$$ = $1;}

          | any_identifier {$$ = $1;}
          ;

function_call

          : any_identifier '(' ')' 
            {$$ = new yy.ast.FunctionCall($1, [], @$); }

          | any_identifier '(' arguments ')'
            {$$ = new yy.ast.FunctionCall($1, $3, @$); }

          | module_member '(' ')' 
            {$$ = new yy.ast.FunctionCall($1, [], @$); }

          | module_member '(' arguments ')'
            {$$ = new yy.ast.FunctionCall($1, $3, @$); }
          ;

arguments
          : expression                {$$ = [$1];         }
          | arguments ',' expression  {$$ = $1.concat($3);} 
          ;

module_member
          : module_path '#' identifier
            {$$ = new yy.ast.ModuleMember($1, $3, @$);}
          ;

module_path
          : IDENTIFIER
            {$$ = $1;}

          | PATH
            {$$ = $1;}

          | NODE_MODULE_PATH
            {$$ = $1;}
          ;

list      
          : '[' ']'
            {$$ = new yy.ast.List([], @$); }

          | '[' expression_list ']'
            {$$ = new yy.ast.List($2, @$); }
          ;

expression_list
          : expression                      {$$ = [$1];         }
          | expression_list ',' expression  {$$ = $1.concat($3);}
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
          : any_identifier '=' expression
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
          : '${' identifier '}'
             {$$ = new yy.ast.EnvVar($2, @$);  }
          ;

any_identifier
          : identifier
            {$$ = $1;}

          | qualified_identifier
            {$$ = $1;}
          ;

qualified_identifier
          : property_path 
            {$$ = new yy.ast.QualifiedIdentifier($1, @$);}
          ;

property_path
          : identifier '.' identifier
            {$$ = [$1, $3]; }

          | property_path '.' identifier
            {$$ = $1.concat($3);}
          ;

identifier
          : IDENTIFIER
            {$$ = new yy.ast.Identifier($1, @$);}
          ;
