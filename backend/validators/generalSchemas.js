import { Joi, Segments } from 'celebrate';

// Common parameter validation
export const mongoIdSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
      'string.pattern.base': 'Invalid ID format'
    })
  })
};

// Common pagination
export const paginationSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().min(1).default(1),
    limit: Joi.number().min(1).max(100).default(20),
    sort: Joi.string().valid('createdAt', '-createdAt', 'updatedAt', '-updatedAt').default('-createdAt')
  })
};

// Date range validation
export const dateRangeSchema = {
  [Segments.QUERY]: Joi.object({
    startDate: Joi.date().iso(),
    endDate: Joi.date().iso().min(Joi.ref('startDate')),
    timezone: Joi.string().default('UTC')
  })
};

// Search validation
export const searchSchema = {
  [Segments.QUERY]: Joi.object({
    q: Joi.string().min(1).max(100),
    fields: Joi.array().items(Joi.string()),
    exact: Joi.boolean().default(false)
  })
};