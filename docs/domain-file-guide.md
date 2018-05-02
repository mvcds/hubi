# Domain File Guide

This is a guide which will help you configure your domain files.

## Intro

Even if you don't DDD, you can still use `hubi`, because it's been built around the concept of describing domains through ubiquitous language, and you can do it by writing a domain file for each domain concept which may become a programming object on your system, with an attribute for each one of its members.

Realize that even when the concept does not translate to a source file, you still may want to document it as part of your ubiquitous language, e.g. [domain files](https://mvcds.github.io/hubi/#domain-file) on `hubi` itself.

### Core Definitions

What follows is a list of definitions you should know when configuring a domain file, please refer to `hubi`'s [main page](https://mvcds.github.io/hubi) for the complete definitions.

 - Domain File: an YAML document which holds information about a particular piece of the ubiquitous language.
 - Ubiquitous Token: the piece itself (phrase, text, noun, verb, etc) which is extracted directly from a domain file. Also shortened for "token".
 - Attribute: a token's characteristic.

## Configurations

### Common to Tokens and Attribute

 - name: a required string which identifies the token across your ubiquitous language (must be unique) or an attribute relatively to its token
 - description: a required string which teaches or reminds what the token/attribute is about
 - deprecated: a string|boolean|object marking the token/attribute as deprecated
   - string: the string becomes the message for the deprecation warning
   - boolean: `true` value means error and a `false` means warning, using a default message
   - object: gives you complete control over which message to show and how to exhibit it (error or warning?)

    ```
    {
      message: string,
      error: boolean
    }
    ```

### Token

 - attributes: an array of attributes associated with that token

### Attributes

 - required: a boolean value indicating if the attribute should be always present on the token
 - type: a required string indicating how to use the attribute on source files, may be one of the following
   - `string` which is the default, if type is ommited
   - `boolean` though you can also write `bool`
   - `integer` though you can also write `int`
   - `date`
   - `float` though you can also write `number` or `decimal`
   - `object` though you can also write `shape`
   - `json`
   - `array`
   - a token's name
 - default: a value indicating what to fill the token's attribute, when it is undefined (or null)

### Decorators

Each attribute type may have some decorators associated with it, enhancing what it can do.

- Range: allows to specify a minimum and/or maximum value for `array`'s number of items, `date`, `float`, `integer` and `string`'s length.
