import { Joi, Segments } from 'celebrate';

export const createBiometricSchema = {
  [Segments.BODY]: Joi.object({
    type: Joi.string().valid('weight', 'heart_rate', 'steps', 'sleep', 'calories', 'blood_pressure', 'spo2').required(),
    value: Joi.number().min(0).max(10000).required(),
    unit: Joi.string().max(20).required(),
    source: Joi.string().valid('manual', 'api').default('manual'),
    recordedAt: Joi.date().iso().default(() => new Date())
  })
};

export const updateBiometricSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().required()
  }),
  [Segments.BODY]: Joi.object({
    type: Joi.string().valid('weight', 'heart_rate', 'steps', 'sleep', 'calories', 'blood_pressure', 'spo2'),
    value: Joi.number().min(0).max(10000),
    unit: Joi.string().max(20),
    source: Joi.string().valid('manual', 'api'),
    recordedAt: Joi.date().iso()
  }).min(1)
};

export const getBiometricsSchema = {
  [Segments.QUERY]: Joi.object({
    type: Joi.string().valid('weight', 'heart_rate', 'steps', 'sleep', 'calories', 'blood_pressure', 'spo2'),
    from: Joi.date().iso(),
    to: Joi.date().iso(),
    limit: Joi.number().min(1).max(100).default(50)
  })
};