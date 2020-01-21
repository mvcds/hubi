const Joi = require('joi')

const SCHEMA = {
  'name': Joi.string().required(),
  'description': Joi.string().required(),
  'attributes': Joi.array().items(Joi.object()).default([]),
  'filePath': Joi.string().required(),
  'abstract': Joi.boolean().default(false),
  'comment': Joi.string().default(null),
  'aliases': Joi.array().items(Joi.string()).default([])
}

module.exports = SCHEMA
