import { Router } from 'express';
import { celebrate } from 'celebrate';
import { 
  getDashboardStats,
  getBiometricTrends,
  getWorkoutAnalytics,
  getNutritionAnalytics,
  getProgressReport,
  exportUserData
} from '../controllers/analyticsController.js';
import { dateRangeSchema } from '../validators/generalSchemas.js';

const router = Router();

// GET /api/analytics/dashboard
router.get('/dashboard', getDashboardStats);

// GET /api/analytics/biometric-trends
router.get('/biometric-trends', celebrate(dateRangeSchema), getBiometricTrends);

// GET /api/analytics/workout-analytics
router.get('/workout-analytics', celebrate(dateRangeSchema), getWorkoutAnalytics);

// GET /api/analytics/nutrition-analytics
router.get('/nutrition-analytics', celebrate(dateRangeSchema), getNutritionAnalytics);

// GET /api/analytics/progress-report
router.get('/progress-report', celebrate(dateRangeSchema), getProgressReport);

// GET /api/analytics/export
router.get('/export', exportUserData);

export default router;