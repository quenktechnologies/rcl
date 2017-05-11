
# JCON

JavaScript Configuration Object Notation (JCON) is a JSON inspired
syntax of JavaScript bound configuration files.

## Structure

A single JCON file (or string) is intended to be compiled into a file
(or string) that exports a single JavaScript object literal as its default export.

### Syntax

Like JSON, strings must be quoted with double quotes.
Valid types are strings,number,object,arrays,boolean and null from JSON.

Additionally JCON adds these types:
* imports

### Property names

Field and directive names must be valid javascript key but dot notation 
is supported for creating nested objects:

```jcon 

  jcon.syntax.dot-notation = true 

```

```js

  export default {'jcon':{'syntax':{'dot-notation': true}}}

```

### Arithmetic

Basic arithmetic is also supported where it makes sense, example:

```jcon

  sixteen = 8 + 8

```

this compiles to the following ES6 module:

```js

export default { 'sixteen' = 8 + 8 }


```

#### Object syntax

Objects used '=' instead of ':' for key values:

```jcon

  object = {

    key1 = 1
    key2 = 2
    key3 = 3

  }

```

## License

Apache 2.0 (SEE LICENSE) file. (c) Quenk Technologies Limited.
