import { Joi, Segments } from 'celebrate';

const exerciseSchema = Joi.object({
  name: Joi.string().max(100).required(),
  type: Joi.string().valid('cardio', 'strength', 'flexibility').required(),
  duration: Joi.number().min(1).max(300), // minutes
  sets: Joi.number().min(1).max(20),
  reps: Joi.number().min(1).max(200),
  weight: Joi.number().min(0).max(500), // kg
  distance: Joi.number().min(0).max(100), // km
  calories: Joi.number().min(0).max(2000),
  instructions: Joi.string().max(1000)
});

export const createWorkoutSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().max(100).required(),
    type: Joi.string().valid('cardio', 'strength', 'flexibility', 'hiit', 'yoga').required(),
    difficulty: Joi.string().valid('beginner', 'intermediate', 'advanced').required(),
    duration: Joi.number().min(5).max(300).required(), // minutes
    exercises: Joi.array().items(exerciseSchema).min(1).required(),
    estimatedCalories: Joi.number().min(0).max(2000),
    equipment: Joi.array().items(Joi.string().max(50)),
    tags: Joi.array().items(Joi.string().max(30))
  })
};

export const updateWorkoutSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().required()
  }),
  [Segments.BODY]: Joi.object({
    name: Joi.string().max(100),
    type: Joi.string().valid('cardio', 'strength', 'flexibility', 'hiit', 'yoga'),
    difficulty: Joi.string().valid('beginner', 'intermediate', 'advanced'),
    duration: Joi.number().min(5).max(300),
    exercises: Joi.array().items(exerciseSchema),
    estimatedCalories: Joi.number().min(0).max(2000),
    equipment: Joi.array().items(Joi.string().max(50)),
    tags: Joi.array().items(Joi.string().max(30))
  }).min(1)
};

export const completeWorkoutSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().required()
  }),
  [Segments.BODY]: Joi.object({
    rating: Joi.number().min(1).max(5),
    completedAt: Joi.date().iso(),
    notes: Joi.string().max(500)
  })
};

export const getWorkoutsSchema = {
  [Segments.QUERY]: Joi.object({
    type: Joi.string().valid('cardio', 'strength', 'flexibility', 'hiit', 'yoga'),
    difficulty: Joi.string().valid('beginner', 'intermediate', 'advanced'),
    completed: Joi.boolean(),
    limit: Joi.number().min(1).max(100).default(50)
  })
};