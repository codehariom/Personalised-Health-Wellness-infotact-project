import { Joi, Segments } from 'celebrate';

const nutritionSchema = Joi.object({
  calories: Joi.number().min(0).max(5000),
  protein: Joi.number().min(0).max(300), // grams
  carbs: Joi.number().min(0).max(800), // grams
  fat: Joi.number().min(0).max(200), // grams
  fiber: Joi.number().min(0).max(100), // grams
  sugar: Joi.number().min(0).max(200), // grams
  sodium: Joi.number().min(0).max(10000) // mg
});

const mealItemSchema = Joi.object({
  name: Joi.string().max(100).required(),
  quantity: Joi.number().min(0.1).max(1000).required(),
  unit: Joi.string().max(20).required(),
  nutrition: nutritionSchema,
  category: Joi.string().valid('protein', 'carbs', 'vegetables', 'fruits', 'dairy', 'fats', 'other')
});

const mealSchema = Joi.object({
  type: Joi.string().valid('breakfast', 'lunch', 'dinner', 'snack').required(),
  name: Joi.string().max(100).required(),
  items: Joi.array().items(mealItemSchema).min(1).required(),
  totalNutrition: nutritionSchema,
  prepTime: Joi.number().min(0).max(300), 
  cookTime: Joi.number().min(0).max(300), 
  recipe: Joi.string().max(2000),
  difficulty: Joi.string().valid('easy', 'medium', 'hard').default('easy')
});

export const createMealPlanSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().max(100).required(),
    date: Joi.date().iso().required(),
    meals: Joi.array().items(mealSchema).min(1).required(),
    dailyNutritionGoals: nutritionSchema,
    totalNutrition: nutritionSchema,
    dietType: Joi.string().valid('none', 'vegetarian', 'vegan', 'keto', 'paleo', 'mediterranean').default('none'),
    tags: Joi.array().items(Joi.string().max(30)),
    notes: Joi.string().max(500)
  })
};

export const updateMealPlanSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().required()
  }),
  [Segments.BODY]: Joi.object({
    name: Joi.string().max(100),
    date: Joi.date().iso(),
    meals: Joi.array().items(mealSchema),
    dailyNutritionGoals: nutritionSchema,
    totalNutrition: nutritionSchema,
    dietType: Joi.string().valid('none', 'vegetarian', 'vegan', 'keto', 'paleo', 'mediterranean'),
    tags: Joi.array().items(Joi.string().max(30)),
    notes: Joi.string().max(500)
  }).min(1)
};

export const rateMealPlanSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().required()
  }),
  [Segments.BODY]: Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    notes: Joi.string().max(500)
  })
};

export const getMealPlansSchema = {
  [Segments.QUERY]: Joi.object({
    date: Joi.date().iso(),
    dietType: Joi.string().valid('none', 'vegetarian', 'vegan', 'keto', 'paleo', 'mediterranean'),
    limit: Joi.number().min(1).max(100).default(50)
  })
};