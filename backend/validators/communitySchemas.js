import { Joi, Segments } from 'celebrate';

export const createPostSchema = {
  [Segments.BODY]: Joi.object({
    content: Joi.string().min(1).max(1000).required(),
    type: Joi.string().valid('text', 'achievement', 'question').default('text'),
    tags: Joi.array().items(Joi.string().max(30))
  })
};

export const addCommentSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().required()
  }),
  [Segments.BODY]: Joi.object({
    content: Joi.string().min(1).max(500).required()
  })
};

export const getPostsSchema = {
  [Segments.QUERY]: Joi.object({
    type: Joi.string().valid('text', 'achievement', 'question'),
    userId: Joi.string(),
    limit: Joi.number().min(1).max(50).default(20)
  })
};

export const createExpertSchema = {
  [Segments.BODY]: Joi.object({
    specialization: Joi.string().valid('fitness', 'nutrition', 'mental_health').required(),
    bio: Joi.string().max(500),
    credentials: Joi.array().items(Joi.string().max(100))
  })
};

export const bookExpertSchema = {
  [Segments.BODY]: Joi.object({
    expertId: Joi.string().required(),
    scheduledFor: Joi.date().iso().min('now').required(),
    duration: Joi.number().min(15).max(120).default(30), 
    topic: Joi.string().max(200).required(),
    notes: Joi.string().max(500)
  })
};