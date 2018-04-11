# Hubi product roadmap

This roadmap is not a final list of things that will be done but rather a live document that will change as `hubi` evolves or people ask for stuff.

> "Release" here means a product version rather than a git tag marking some version

## Priority (for this release)

Someone is currently working on those

- [ ] Joi Translator: allows users to use Joi
- [ ] Extension of attributes: some attributes may have their own configuration, for instance string can have min and max but booleans cannot
- [ ] Default attribute value: the value that will be used when no value is provided
- [ ] Mark attribute as deprecated: so people can start not using it right now

## Must haves

Help wanted!

- [ ] Check for duplicated attributes: to warn users that they are overwritting something - we need to check a policty of what happens in this case
- [ ] Entities' name resolution: to warn users that they are overwritting something - we need to check a policty of what happens in this case
- [ ] JSON as domain files: so users are free to choose their domain file formats
- [ ] Cache: so some domain files are skipped

## Translators

Help wanted!

- [ ] Sequelize Translator: being able to change the model at least, migrations would be nice too but theiy are more difficult to do
- [ ] GrapqhQL Translator: create GrapqhQL automatically
- [ ] C# Translator: partial class containing its members
- [ ] PropType Translator: so users can add it to React
- [ ] Yoman Translator Generator: scaffolding for Translators, though we should learn better what a Translator does
- [ ] Rosie Translator: allows users to create fixture factories easily

## Site Translator

Help wanted!

- [ ] Improve look and feel of html: at the moment only the html is generated, and it is ugly
- [ ] Add some functionality to the html: it would be nice to have a search, to use name anchors, sorting, prioritizing, etc
- [ ] Allow to inject its own pug, css and/or js: so it is more custumable

## Future releases may have

Please read about [how to contribute with items on the roadmap](CONTRIBUTING.md#roadmap-contributions) before attacking those one:

- [ ] Contexts: so it is possible to run one command to update all the different translations
- [ ] Config file: this way you don't have to input arguments in the command line
- [ ] Contextual Attributes: each context may exclude or include different attributes
- [ ] Custom Attributes: allows to configure attributes as if they were primitives e.g. AlphanumericWithFixedLengthTo30 Attribute would avoid reconfiguring attributes all over the place
- [ ] Combinatory attributes: because some Translators allow to have multiple types together and do some stuff with this info, for instance, requiring some when other fiel is present
- [ ] Nested Array: arrays having arrays that have arrays filled with arrays should be okayish
- [ ] Alias: some tokens have aliases

## Ideas and Suggestions

You can still help by providing those!

- [ ] Function attribute: allows functions to be used as attributes
- [ ] Interface or Extension: inserts on a token all its interfaces and extensions
- [ ] Inheritance: marks the token as inheriting from another one
- [ ] Read Sample: allow to scan a source file in order to output a domain file
- [ ] Include generated translations on files: instead of being a file apart, the source file is included in the relevant ones

