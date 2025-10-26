import { Joi, Segments } from 'celebrate';

export const updatePointsSchema = {
  [Segments.BODY]: Joi.object({
    points: Joi.number().min(-1000).max(1000).required(),
    activity: Joi.string().valid('workout', 'data_entry', 'login', 'achievement', 'social').required(),
    description: Joi.string().max(200)
  })
};

export const createBadgeSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().max(50).required(),
    description: Joi.string().max(200),
    icon: Joi.string().max(100),
    criteria: Joi.object({
      type: Joi.string().required(),
      threshold: Joi.number(),
      condition: Joi.string()
    }).required()
  })
};

export const getLeaderboardSchema = {
  [Segments.QUERY]: Joi.object({
    type: Joi.string().valid('points', 'level', 'streaks').default('points'),
    period: Joi.string().valid('week', 'month', 'all').default('all'),
    limit: Joi.number().min(1).max(50).default(10)
  })
};

export const updateStreakSchema = {
  [Segments.BODY]: Joi.object({
    type: Joi.string().valid('workout', 'data_entry', 'login').required(),
    increment: Joi.boolean().default(true)
  })
};