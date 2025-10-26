import { Router } from 'express';
import { celebrate } from 'celebrate';
import { 
  createMealPlan, 
  getMealPlans, 
  getMealPlanById, 
  updateMealPlan,
  rateMealPlan, 
  deleteMealPlan 
} from '../controllers/mealPlanController.js';
import { 
  createMealPlanSchema, 
  updateMealPlanSchema, 
  rateMealPlanSchema,
  getMealPlansSchema 
} from '../validators/mealPlanSchemas.js';
import { mongoIdSchema } from '../validators/generalSchemas.js';

const router = Router();

// POST /api/meal-plans
router.post('/', celebrate(createMealPlanSchema), createMealPlan);

// GET /api/meal-plans
router.get('/', celebrate(getMealPlansSchema), getMealPlans);

// GET /api/meal-plans/:id
router.get('/:id', celebrate(mongoIdSchema), getMealPlanById);

// PUT /api/meal-plans/:id
router.put('/:id', celebrate({...mongoIdSchema, ...updateMealPlanSchema}), updateMealPlan);

// PUT /api/meal-plans/:id/rate
router.put('/:id/rate', celebrate({...mongoIdSchema, ...rateMealPlanSchema}), rateMealPlan);

// DELETE /api/meal-plans/:id
router.delete('/:id', celebrate(mongoIdSchema), deleteMealPlan);

export default router;