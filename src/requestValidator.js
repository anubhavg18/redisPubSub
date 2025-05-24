const Joi = require('joi');

const requestSchema = Joi.object({
  user: Joi.string().required(),
  class: Joi.string().required(),
  age: Joi.number().integer().min(1).required(),
  email: Joi.string().email().required(),
});

module.exports = { requestSchema };

