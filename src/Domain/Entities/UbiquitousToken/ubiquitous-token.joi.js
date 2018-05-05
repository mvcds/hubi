const Joi = require('joi')

const SCHEMA = {
  'name': Joi.string().required(),
  'description': Joi.string().required(),
  'attributes': Joi.array().items(Joi.object()),
  'filePath': Joi.string().required(),
  'abstract': Joi.boolean().default(false),
  'comment': Joi.string(),
}

module.exports = SCHEMA