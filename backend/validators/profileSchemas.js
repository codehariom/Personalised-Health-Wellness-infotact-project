import { Joi, Segments } from 'celebrate';

const profileSchema = Joi.object({
  firstName: Joi.string().max(50),
  lastName: Joi.string().max(50),
  age: Joi.number().min(1).max(120),
  gender: Joi.string().valid('male', 'female', 'other'),
  heightCm: Joi.number().min(50).max(300),
  weightKg: Joi.number().min(20).max(500),
  activityLevel: Joi.string().valid('sedentary', 'light', 'moderate', 'active', 'very_active')
});

const goalSchema = Joi.object({
  type: Joi.string().valid('weight', 'steps', 'sleep', 'calories').required(),
  target: Joi.number().required(),
  unit: Joi.string().max(20),
  deadline: Joi.date().iso()
});

export const profileUpdateSchema = {
  [Segments.BODY]: Joi.object({
    displayName: Joi.string().min(2).max(50),
    profile: profileSchema,
    goals: Joi.array().items(goalSchema)
  }).min(1)
};