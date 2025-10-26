import { Joi, Segments } from 'celebrate';

export const signupSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(50).required(),
    displayName: Joi.string().min(2).max(50).required()
  })
};

export const loginSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
};