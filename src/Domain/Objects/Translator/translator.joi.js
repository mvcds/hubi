const Joi = require('joi')

const SCHEMA = {
  'ubiquitousLanguage': Joi.ubiquitous-language().required(),
  'tokens': Joi.array().items(Joi.Ubiquitous Token()),
}

module.exports = SCHEMA