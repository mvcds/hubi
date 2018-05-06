const Joi = require('joi')

const SCHEMA = {
  'lexicon': Joi.object().required(),
}

module.exports = SCHEMA