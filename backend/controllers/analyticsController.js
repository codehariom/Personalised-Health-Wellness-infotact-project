import { User } from "../models/User.js";
import { BiometricEntry } from "../models/BiometricEntry.js";
import { Workout } from "../models/Workout.js";
import { MealPlan } from "../models/MealPlan.js";
import { Recommendation } from "../models/Recommendation.js";

export const getDashboardStats = async (req, res) => {
  const id = req.user.id;
  const [b, w, c, m, p] = await Promise.all([
    BiometricEntry.countDocuments({ userId: id }),
    Workout.countDocuments({ userId: id }),
    Workout.countDocuments({ userId: id, completedAt: { $exists: true } }),
    MealPlan.countDocuments({ userId: id }),
    Recommendation.countDocuments({ userId: id, status: "pending" }),
  ]);
  res.json({
    stats: {
      totalBiometrics: b,
      totalWorkouts: w,
      completedWorkouts: c,
      totalMealPlans: m,
      pendingRecommendations: p,
    },
  });
};

export const getBiometricTrends = async (req, res) => {
  const id = req.user.id;
  const { startDate, endDate } = req.query;
  const start = startDate
    ? new Date(startDate)
    : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const end = endDate ? new Date(endDate) : new Date();
  const trends = await BiometricEntry.find({
    userId: id,
    recordedAt: { $gte: start, $lte: end },
  }).sort({ recordedAt: 1 });
  res.json({ trends });
};

export const getWorkoutAnalytics = async (req, res) => {
  const id = req.user.id;
  const ws = await Workout.find({ userId: id });
  const total = ws.length,
    completed = ws.filter((x) => x.completedAt).length;
  const totalDuration = ws.reduce((sum, x) => sum + x.duration, 0);
  res.json({ analytics: { total, completed, totalDuration } });
};

export const getNutritionAnalytics = async (req, res) => {
  const id = req.user.id;
  const plans = await MealPlan.find({ userId: id });
  const nutrition = plans.reduce(
    (sum, p) => ({
      calories: sum.calories + (p.totalNutrition?.calories || 0),
      protein: sum.protein + (p.totalNutrition?.protein || 0),
    }),
    { calories: 0, protein: 0 }
  );
  res.json({ nutrition });
};

export const getProgressReport = async (req, res) => {
  const id = req.user.id;
  const user = await User.findById(id);
  const progress = user.goals.map((g) => ({
    type: g.type,
    target: g.target,
    current: user.profile[g.type === "weight" ? "weightKg" : "steps"] || 0,
    progress: Math.min(
      100,
      Math.round(
        ((user.profile[g.type === "weight" ? "weightKg" : "steps"] || 0) /
          g.target) *
          100
      )
    ),
  }));
  res.json({ progress });
};

export const exportUserData = async (req, res) => {
  const id = req.user.id;
  const [u, b, w, m, r] = await Promise.all([
    User.findById(id).select("-passwordHash"),
    BiometricEntry.find({ userId: id }),
    Workout.find({ userId: id }),
    MealPlan.find({ userId: id }),
    Recommendation.find({ userId: id }),
  ]);
  res.json({
    user: u,
    biometrics: b,
    workouts: w,
    mealPlans: m,
    recommendations: r,
  });
};
