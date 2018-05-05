const Joi = require('joi')

const SCHEMA = {
  'lexicon': Joi.array().items(Joi.object()).required(),
}

module.exports = SCHEMA