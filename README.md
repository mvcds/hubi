# Hubi [![Build Status](https://travis-ci.org/mvcds/hubi.svg?branch=master)](https://travis-ci.org/mvcds/hubi) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

The humanitarian [ubiquitous language](https://martinfowler.com/bliki/UbiquitousLanguage.html) helper, or `hubi` for short, is one way to help you [documenting the domain language as part of your code](http://www.writethedocs.org/guide/docs-as-code/) i.e. you teach `hubi` your language so it generates relevant source files for you.

## Getting started

### Installing

We recommend that `hubi` is installed in the target package with your favorite package manager, mine is `yarn`

```
yarn add hubi --dev
```

You may also use `npm` to install it, the only important part is that it should be installed as a developer tool, so packages depending on yours won't download it.

## Notes

### For those who don't know/use [domain-driven design [DDD]](https://airbrake.io/blog/software-design/domain-driven-design)

Though the concept of ubiquitous language was *introduced* in the DDD book, the language itself is an independent tool which bridges the gap between developers and domain-experts when talking about their domains. It may be used regardless of DDD.

So, even if you don't know/use DDD you can still use `hubi` to reap the benefits of a unified language.

### BEWARE

This project is still on its initial versions and lacks translators (the files responsible to make source files out of domain files), so some of your needs may not be attended right now.

The first translators I am aiming to are those below, but feel free to contribute with new ones:

- [X] Ubi: my useless "language" was used as a proof of concept
- [ ] [Joi](https://github.com/hapijs/joi): as the default translator to replace Ubi
- [ ] Site: a way to automatically create a site that developers, domain-experts, managers, etc can access to consult the ubiquitous language
