const Joi = require('joi')

const SCHEMA = {
  'name': Joi.string().required(),
  'type': Joi.string().default('string'),
  'required': Joi.boolean().default(false),
  'description': Joi.string().default(null),
  'comment': Joi.string().default(null)
}

module.exports = SCHEMA
