const Joi = require('joi')

const SCHEMA = {
  'lexicon': Joi.array().required(),
}

module.exports = SCHEMA