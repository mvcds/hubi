const Joi = require('joi')

const SCHEMA = {
  'name': Joi.string().required(),
  'type': Joi.string().default('string'),
  'required': Joi.boolean().default(false),
  'description': Joi.string(),
  'comment': Joi.string()
}

module.exports = SCHEMA
