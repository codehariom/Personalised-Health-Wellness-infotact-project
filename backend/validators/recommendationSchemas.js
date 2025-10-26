import { Joi, Segments } from 'celebrate';

export const updateRecommendationSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().required()
  }),
  [Segments.BODY]: Joi.object({
    status: Joi.string().valid('pending', 'accepted', 'dismissed', 'completed').required(),
    feedback: Joi.object({
      helpful: Joi.boolean(),
      rating: Joi.number().min(1).max(5),
      comment: Joi.string().max(500)
    })
  })
};

export const getRecommendationsSchema = {
  [Segments.QUERY]: Joi.object({
    type: Joi.string().valid('workout', 'meal', 'wellness', 'goal'),
    status: Joi.string().valid('pending', 'accepted', 'dismissed', 'completed'),
    limit: Joi.number().min(1).max(50).default(10)
  })
};