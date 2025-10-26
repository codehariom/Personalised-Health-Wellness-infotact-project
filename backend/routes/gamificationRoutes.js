import { Router } from 'express';
import { celebrate } from 'celebrate';
import { 
  getUserStats,
  updatePoints,
  getLeaderboard,
  createBadge,
  getUserBadges,
  updateStreak,
  getStreaks,
  getUserAchievements
} from '../controllers/gamificationController.js';
import { 
  updatePointsSchema,
  createBadgeSchema,
  getLeaderboardSchema,
  updateStreakSchema
} from '../validators/gamificationSchemas.js';
import { mongoIdSchema } from '../validators/generalSchemas.js';

const router = Router();

// ===== USER STATS =====
// GET /api/gamification/stats
router.get('/stats', getUserStats);

// GET /api/gamification/achievements
router.get('/achievements', getUserAchievements);

// ===== POINTS SYSTEM =====
// POST /api/gamification/points
router.post('/points', celebrate(updatePointsSchema), updatePoints);

// GET /api/gamification/leaderboard
router.get('/leaderboard', celebrate(getLeaderboardSchema), getLeaderboard);

// ===== BADGES =====
// POST /api/gamification/badges (Admin only - simplified for demo)
router.post('/badges', celebrate(createBadgeSchema), createBadge);

// GET /api/gamification/badges
router.get('/badges', getUserBadges);

// ===== STREAKS =====
// GET /api/gamification/streaks
router.get('/streaks', getStreaks);

// POST /api/gamification/streaks
router.post('/streaks', celebrate(updateStreakSchema), updateStreak);

export default router;