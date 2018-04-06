# Hubi [![Build Status](https://travis-ci.org/mvcds/hubi.svg?branch=master)](https://travis-ci.org/mvcds/hubi) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> Teach `hubi` your [ubiquitous language](https://martinfowler.com/bliki/UbiquitousLanguage.html) and it will write relevant source files for you

The humanitarian ubiquitous language helper, or `hubi` for short, reads [domain files](#domain-files) and generates whatever you teach it, using your domain language so you don't have to manually change your Joi Schemas, JS objects, Sequelize Models, GraphQL types, C# classes, etc.

## Getting started

### Installing

We recommend that `hubi` is installed in locally with your favorite package manager, mine is `yarn`

```
yarn add hubi --dev
```

You may also use `npm` to install it, the only important part is that it should be installed as a developer tool, so packages depending on yours won't download it.

### CLI

At the moment, `hubi` can only be used via command line. And there is only one command that you should run as a consumer of this package:

```
node_modules/.bin/hubi save --pattern src/**/*.yml --output domain --translator log
```

> If you save that as an npm script on your `package.json`, you'd avoid typing it all over again.

* `--pattern | -p` is a glob pattern to the [domain files](#domain-files)
* `--output | -o` is the folder to which files will be saved - in the future files should be redirected to specific folders but right now they are concentrated on the `output` directory 😞
* `--translator | -t` which [translator](#missing-translators), AKA the file responsible to translate domain files into source files, should be used, at this stage (proof of concept) the only "useful" value is `ubi` because it is similar to what the JoiTranslator will output

## Notes

### For those who don't know/use [domain-driven design [DDD]](https://airbrake.io/blog/software-design/domain-driven-design)

Though the concept of ubiquitous language was *introduced* in the DDD book, the language itself is an independent tool which bridges the gap between developers and domain-experts when talking about their domains. It may be used regardless of DDD.

So, even if you don't know/use DDD you can still use `hubi` to reap the benefits of a unified language.

### Missing Translators

This project is still in its initial versions and lacks translators, so some of your needs may not be attended right now.

The first translators I am aiming to are those below, but feel free to contribute with new ones:

- [X] Ubi: my useless "language" was used as a proof of concept [POC]
- [X] Log: also part of the POC
- [ ] [Joi](https://github.com/hapijs/joi): as the default translator to replace Ubi
- [ ] Site: a way to automatically create a site that developers, domain-experts, managers, etc can access to consult the ubiquitous language

### Should I pronounce the "h"?

No. The package name was supposed to be "ubi" (as in ubiquitous) but the name was already taken on npm, so I've used the only mute letter we have in Portuguese.

By pronouncing the "h" most Brazilians will never understand if you're referring to the Ruby programming language or this project. That sound ~~in that position~~ is not natural for us, so most of us simply can't tell "rot" and "hot", or "ruby" and "hubi", apart, for instance.
