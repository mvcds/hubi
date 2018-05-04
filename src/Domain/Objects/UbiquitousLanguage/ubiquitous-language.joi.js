const Joi = require('joi')

const SCHEMA = {
  'tokens': Joi.array().items(Joi.Ubiquitous Token()).required(),
}

module.exports = SCHEMA