# Domain File Guide

This is a guide which will help you configure your domain files.

## Intro

Even if you don't DDD, you can still use `hubi`, because it's been built around the concept of describing domains through ubiquitous language, and you can do it by writing a domain file for each domain concept which may become a programming object on your system, with an attribute for each one of its members.

Realize that even when the concept does not translate to a source file, you still may want to document it as part of your ubiquitous language, e.g. [domain files](https://mvcds.github.io/hubi/#domain-file) on `hubi` itself.

By convention, all configurations should be written in lower case.

### Core Definitions

What follows is a list of definitions you should know when configuring a domain file, please refer to `hubi`'s [main page](https://mvcds.github.io/hubi) for the complete definitions.

 - Domain File: an YAML document which holds information about a particular piece of the ubiquitous language.
 - Ubiquitous Token: the piece itself (phrase, text, noun, verb, etc) which is extracted directly from a domain file. Also shortened for "token".
 - Attribute: a token's characteristic.

## Configurations

Each [Translator](https://mvcds.github.io/hubi/#translator)'s job is to interpret the token, its attribute and decorators associated with them based on how the domain file was configured.

Because of that, some types and decorators may be introduced or work with some translator but not the other.

### Common to Tokens and Attribute

```yaml
name: a required string which identifies the token across your ubiquitous language (must be unique) or an attribute relatively to its token

description: a string which teaches or reminds what the token/attribute is about. For tokens, it is required.

deprecated: a string, a boolean or an object marking the token/attribute as deprecated. Totally optional.
  - string: the string becomes the message for the deprecation warning
  - boolean: `true` value means error and a `false` means warning, using a default message
  - object: gives you complete control over which message to show and how to exhibit it (error or warning?)
  # {
  #   message: string,
  #   error: boolean
  # }

comment: a string which informs developers about something
```

### Token

```yaml
attributes: an optional array of attributes associated with that token. If ommited, an empty array is used instead.

abstract: an optional boolean value which controls if the token should be generated.

aliases: a list of strings containing alternative names/references to the token.
```

### Attribute

```yaml
required: an optional boolean value indicating if the attribute should be always present on the token, defaults to false

type: a string indicating how to use the attribute on source files, may be one of the following
  - string: which is the default, if type is ommited
  - boolean: though you can also write "bool"
  - integer: though you can also write "int"
  - date
  - float: though you can also write "number" or "decimal"
  - object: though you can also write "shape".
  - json
  - array
  - function: though you can also write "func", "method" or "procedure"
  - a token's name: you may use the same name defined into the token's domain file which may not exist yet, or the normalized name (lowercase kebab) - refered as "token" type, hereafter

default: an optional value indicating what to fill the token's attribute with, when the value is not defined
```

### Decorators

Each attribute type may have some decorators associated with it, enhancing how they are translated.

```yaml
range: allows to specify a minimum and/or maximum value for the attribute.
  - decorate: [string, integer, date, float, array]
  - api: may be a number indicating its limit or an object which has a numberical limit property
    - min: the lower limit
    - max: the upper limit
  - default: undefined

of: associates the attribute with another type. Hubi doesn't nest arrays yet.
  - decorate: [array]
  - api: a string indicating the type that the attribute will be associated with.
  - default:
    - array: "object"

return: should be one of the attribute types. Hubi doesn't return functions yet.
  - decorate: [function]
  - api: an attribute type or a token
  - default: undefined

arguments: a list of token-like entities which will be injected into the function. Hubi doesn't accept functions nor arrays as arguments yet.
  - decorate: [function]
  - api: a list of token-like entities
  - default: []
```

## Sample

What follows is an example of a domain file, which tries to illustrate some configurations listed above.

```yaml
name: Domain File Sample
description: The domain file of a sample becomes a token associated with "domain-file-sample"
deprecated: Please change my values # yields an object { message: 'Please change my values', error: false }
attributes:
  - label # yields a string-typed attribute, named "label"
  - name: tolerance
    type: number
    required: true
    default: 25.8
  - name: tests
    type: array
    of: object
    description: validades the sample
    min: 1
    max: 5
  ...
```
