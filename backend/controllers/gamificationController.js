import { User } from '../models/User.js';
import { Badge } from '../models/Gamification.js';

export const getUserStats = async (req, res) => {
  const u = await User.findById(req.user.id);
  res.json({ points:u.gamification.points, level:u.gamification.level, badges:u.gamification.badges });
};

export const updatePoints = async (req, res) => {
  const { points } = req.body;
  const u = await User.findById(req.user.id);
  u.gamification.points += points;
  u.gamification.level = Math.floor(u.gamification.points/100) + 1;
  await u.save();
  res.json({ points:u.gamification.points, level:u.gamification.level });
};

export const getLeaderboard = async (req, res) => {
  const top = await User.find()
    .select('displayName gamification.points')
    .sort({ 'gamification.points': -1 })
    .limit(10);
  res.json({ leaderboard: top });
};

export const createBadge = async (req, res) => {
  try {
    const badge = await Badge.create(req.body);
    res.status(201).json({ badge });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET /api/gamification/badges
export const getUserBadges = async (req, res) => {
  const u = await User.findById(req.user.id);
  res.json({ badges: u.gamification.badges });
};

// POST /api/gamification/streaks
export const updateStreak = async (req, res) => {
  // Simple stub: increment streak count
  const u = await User.findById(req.user.id);
  u.gamification.streaks += 1;
  if (u.gamification.streaks > u.gamification.bestStreak) {
    u.gamification.bestStreak = u.gamification.streaks;
  }
  await u.save();
  res.json({ streaks: u.gamification.streaks });
};

// GET /api/gamification/streaks
export const getStreaks = async (req, res) => {
  const u = await User.findById(req.user.id);
  res.json({ streaks: u.gamification.streaks, best: u.gamification.bestStreak });
};

// GET /api/gamification/achievements
export const getUserAchievements = async (req, res) => {
  // Stub: return empty array
  res.json({ achievements: [] });
};
