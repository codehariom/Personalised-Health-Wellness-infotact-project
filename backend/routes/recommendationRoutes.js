import { Router } from 'express';
import { celebrate } from 'celebrate';
import { 
  getRecommendations, 
  generateNewRecommendations, 
  updateRecommendationStatus,
  getRecommendationStats,
  deleteRecommendation
} from '../controllers/recommendationController.js';
import { 
  updateRecommendationSchema,
  getRecommendationsSchema 
} from '../validators/recommendationSchemas.js';
import { mongoIdSchema } from '../validators/generalSchemas.js';

const router = Router();

// GET /api/recommendations
router.get('/', celebrate(getRecommendationsSchema), getRecommendations);

// POST /api/recommendations/generate
router.post('/generate', generateNewRecommendations);

// GET /api/recommendations/stats
router.get('/stats', getRecommendationStats);

// PUT /api/recommendations/:id
router.put('/:id', celebrate({...mongoIdSchema, ...updateRecommendationSchema}), updateRecommendationStatus);

// DELETE /api/recommendations/:id
router.delete('/:id', celebrate(mongoIdSchema), deleteRecommendation);

export default router;