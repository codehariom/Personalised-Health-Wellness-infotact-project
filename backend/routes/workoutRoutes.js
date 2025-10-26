import { Router } from 'express';
import { celebrate } from 'celebrate';
import { 
  createWorkout, 
  getWorkouts, 
  getWorkoutById, 
  updateWorkout,
  completeWorkout, 
  deleteWorkout 
} from '../controllers/workoutController.js';
import { 
  createWorkoutSchema, 
  updateWorkoutSchema, 
  completeWorkoutSchema,
  getWorkoutsSchema 
} from '../validators/workoutSchemas.js';
import { mongoIdSchema } from '../validators/generalSchemas.js';

const router = Router();

// POST /api/workouts
router.post('/', celebrate(createWorkoutSchema), createWorkout);

// GET /api/workouts
router.get('/', celebrate(getWorkoutsSchema), getWorkouts);

// GET /api/workouts/:id
router.get('/:id', celebrate(mongoIdSchema), getWorkoutById);

// PUT /api/workouts/:id
router.put('/:id', celebrate({...mongoIdSchema, ...updateWorkoutSchema}), updateWorkout);

// PUT /api/workouts/:id/complete
router.put('/:id/complete', celebrate({...mongoIdSchema, ...completeWorkoutSchema}), completeWorkout);

// DELETE /api/workouts/:id
router.delete('/:id', celebrate(mongoIdSchema), deleteWorkout);

export default router;