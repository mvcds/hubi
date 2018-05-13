# API

At the moment, `hubi` can only be used via command line, and thus you can script upon it using the API presented on this document.

## help

Show the commands bellow

```
$ hubi help
```

## log

Logs the ubiquitous language entities to the console, in order to allow you to read it before saving it (useful for contributors)

```
$ hubi log --pattern src/*.yml --translator site
```

* `--pattern | -p` is a glob pattern to your domain files, defaults to `src/**/*.yml`
* `--translator | -t` which [translator](https://mvcds.github.io/hubi/#translator) will be use to put the domain files into the console, defaults to `log`
* `--verbose | -v` which allows debugging

>  :warning: At the moment we partially support two **real** [translators](https://mvcds.github.io/hubi/#translator), `site` or `joi`. But you can also play with `ubi` and `log` which served as proof of concept to `hubi`.

## save

```
$ hubi save --pattern src/*.yml --translator site --same-folder
```

Saves the ubiquitous language entities into source files

* the same arguments as `log`, plus
* `--output | -o` is the folder to which files will be saved, defaults to `domain`
* `--same-folder | -s` overides the output flag, by geneating the source file on the same folder as the token's domain file.
