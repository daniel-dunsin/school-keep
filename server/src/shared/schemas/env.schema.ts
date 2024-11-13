import * as Joi from 'joi';

const envSchema = Joi.object({
  DATABASE_URL: Joi.string().required(),
  NODE_ENV: Joi.string().optional(),
  PORT: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  MAILER_USER: Joi.string().required(),
  MAILER_PASS: Joi.string().required(),
  FRONTEND_URL: Joi.string().required(),
});

export default envSchema;