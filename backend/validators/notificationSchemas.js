import { Joi, Segments } from 'celebrate';

export const createReminderSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().max(100).required(),
    message: Joi.string().max(300).required(),
    scheduledFor: Joi.date().iso().min('now').required(),
    recurring: Joi.object({
      enabled: Joi.boolean().default(false),
      frequency: Joi.string().valid('daily', 'weekly', 'monthly'),
      days: Joi.array().items(Joi.number().min(0).max(6)), // 0 = Sunday
      endDate: Joi.date().iso()
    })
  })
};

export const getNotificationsSchema = {
  [Segments.QUERY]: Joi.object({
    type: Joi.string().valid('reminder', 'achievement', 'social', 'system'),
    read: Joi.boolean(),
    limit: Joi.number().min(1).max(50).default(20)
  })
};

export const updateNotificationSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().required()
  }),
  [Segments.BODY]: Joi.object({
    read: Joi.boolean(),
    title: Joi.string().max(100),
    message: Joi.string().max(300),
    scheduledFor: Joi.date().iso()
  }).min(1)
};

export const markMultipleAsReadSchema = {
  [Segments.BODY]: Joi.object({
    notificationIds: Joi.array().items(Joi.string()).min(1).max(50).required()
  })
};