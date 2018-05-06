const Joi = require('joi')

const SCHEMA = {
  'ubiquitousLanguage': Joi.object().required(),
  'tokens': Joi.array().items(Joi.object()),
}

module.exports = SCHEMA