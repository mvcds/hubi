#!/bin/sh
# this file is necessary because nyc was not running coverage properly
# https://stackoverflow.com/q/45454462/3178998
yarn test:unit
yarn test:integration
