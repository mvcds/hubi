const Joi = require('joi')

const SCHEMA = {
  'name': Joi.string().required(),
  'description': Joi.string().required(),
  'attributes': Joi.array().items(Joi.Attribute()),
  'filePath': Joi.string().required(),
  'abstract': Joi.boolean(),
  'comment': Joi.string(),
}

module.exports = SCHEMA