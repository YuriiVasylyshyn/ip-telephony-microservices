import * as Joi from 'joi';

export const configSchema = Joi.object({
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  RABBITMQ_URL: Joi.string().required(),
});
