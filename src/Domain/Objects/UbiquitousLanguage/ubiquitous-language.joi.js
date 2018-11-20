const Joi = require('joi')

const SCHEMA = {
  'tokens': Joi.array().items(Joi.object()).required()
}

module.exports = SCHEMA
